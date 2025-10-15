<?php

require_once INTERFACES_PATH . 'EmailServiceInterface.php';

class EmailService implements EmailServiceInterface {
	private $config;
	
	public function __construct() {
		$this->config = require CONFIG_PATH . 'email.php';
	}
	
	public function sendWelcomeEmail(string $email, string $nickname, string $activationToken): bool {
		$subject = $this->config['templates']['welcome']['subject'];
		$body = $this->getWelcomeEmailTemplate($nickname, $activationToken);
		
		return $this->sendEmail($email, $subject, $body);
	}
	
	private function sendEmail(string $to, string $subject, string $body): bool {
		$smtp = $this->config['smtp'];
		
		if ($smtp['encryption'] === 'ssl') {
			$context = stream_context_create([
				'ssl' => [
					'verify_peer' => false,
					'verify_peer_name' => false,
					'allow_self_signed' => true,
				]
			]);
			$socket = stream_socket_client("ssl://{$smtp['host']}:{$smtp['port']}", $errno, $errstr, 30, STREAM_CLIENT_CONNECT, $context);
		} else {
			$socket = fsockopen($smtp['host'], $smtp['port'], $errno, $errstr, 30);
		}
		
		if (!$socket) {
			return false;
		}
		
		if (php_sapi_name() === 'cli-server') {
			stream_set_timeout($socket, 60);
		}
		
		$this->smtpRead($socket);
		
		$hostname = $_SERVER['HTTP_HOST'] ?? 'localhost';
		if (strpos($hostname, ':') !== false) {
			$hostname = explode(':', $hostname)[0];
		}

		if ($hostname === 'localhost' || empty($hostname)) {
			$hostname = 'devlink.local';
		}
		
		fwrite($socket, "EHLO " . $hostname . "\r\n");
		$this->smtpRead($socket);
		
		if ($smtp['encryption'] === 'tls') {
			fwrite($socket, "STARTTLS\r\n");
			$response = $this->smtpRead($socket);
			
			if (strpos($response, '220') === false) {
				fclose($socket);
				return false;
			}
			
			if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT)) {
				fclose($socket);
				return false;
			}
			
			fwrite($socket, "EHLO " . $hostname . "\r\n");
			$this->smtpRead($socket);
		}
		
		fwrite($socket, "AUTH LOGIN\r\n");
		$this->smtpRead($socket);
		
		fwrite($socket, base64_encode($smtp['username']) . "\r\n");
		$this->smtpRead($socket);
		
		fwrite($socket, base64_encode($smtp['password']) . "\r\n");
		$this->smtpRead($socket);

		if (!$this->smtpCommand($socket, "MAIL FROM: <" . $this->config['from_email'] . ">\r\n")) {
			fclose($socket);
			return false;
		}
		
		if (!$this->smtpCommand($socket, "RCPT TO: <" . $to . ">\r\n")) {
			fclose($socket);
			return false;
		}
		
		if (!$this->smtpCommand($socket, "DATA\r\n")) {
			fclose($socket);
			return false;
		}
		
		$headers = [
			'From: ' . $this->config['from_name'] . ' <' . $this->config['from_email'] . '>',
			'Reply-To: ' . $this->config['reply_to'],
			'To: ' . $to,
			'Subject: ' . $subject,
			'MIME-Version: 1.0',
			'Content-type: text/html; charset=UTF-8',
			'X-Mailer: PHP/' . phpversion(),
		];
		
		$emailData = implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.\r\n";
		
		if (is_resource($socket) && !feof($socket)) {
			fwrite($socket, $emailData);
			$response = $this->smtpRead($socket);
		} else {
			fclose($socket);
			return false;
		}
		
		if (is_resource($socket) && !feof($socket)) {
			fwrite($socket, "QUIT\r\n");
		}
		fclose($socket);
		
		return strpos($response, '250') !== false;
	}
	
	private function smtpCommand($socket, string $command): bool {
		if (!is_resource($socket) || feof($socket)) {
			return false;
		}
		
		$result = fwrite($socket, $command);
		if ($result === false) {
			return false;
		}
		
		$response = $this->smtpRead($socket);
		return !empty(trim($response));
	}
	
	private function smtpRead($socket): string {
		$response = '';
		
		if (php_sapi_name() === 'cli-server') {
			stream_set_timeout($socket, 30);
		}
		
		if (!is_resource($socket) || feof($socket)) {
			return '';
		}
		
		$timeout = time() + 30;
		while (($line = fgets($socket, 515)) !== false && time() < $timeout) {
			$response .= $line;
			if (substr($line, 3, 1) === ' ') {
				break;
			}
		}
		
		return $response;
	}
	
	private function getWelcomeEmailTemplate(string $nickname, string $activationToken): string {
		require_once EMAIL_TEMPLATES_PATH . 'welcome.php';
		return getWelcomeEmailTemplate($nickname, $activationToken);
	}
}

<?php

function getWelcomeEmailTemplate(string $nickname, string $activationToken): string {
	$config = require CONFIG_PATH . 'email.php';
	$activationLink = $config['frontend_urls']['base_url'] . $config['frontend_urls']['activate_account'] . "?token={$activationToken}";
	
	return "
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset='UTF-8'>
		<title>Welcome to DevLink</title>
		<style>
			body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
			.container { max-width: 600px; margin: 0 auto; padding: 20px; }
			.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
			.content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
			.button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
			.footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
		</style>
	</head>
	<body>
		<div class='container'>
			<div class='header'>
				<h1>🚀 Welcome to DevLink!</h1>
			</div>
			<div class='content'>
				<h2>Hello {$nickname}!</h2>
				<p>Thank you for joining DevLink! We're excited to have you as part of our developer community.</p>
				
				<p>To complete your registration and activate your account, please click the button below:</p>
				<a href='{$activationLink}' class='button'>Activate Account</a>
				
				<p>If the button doesn't work, copy and paste this link into your browser:</p>
				<p><a href='{$activationLink}'>{$activationLink}</a></p>
				
				<p>Once activated, you'll be able to:</p>
				<ul>
					<li>Connect with other developers</li>
					<li>Share your projects and ideas</li>
					<li>Find collaboration opportunities</li>
					<li>Access exclusive developer resources</li>
				</ul>
				
				<p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
				
				<p>Happy coding!</p>
				<p><strong>The DevLink Team</strong></p>
			</div>
			<div class='footer'>
				<p>This email was sent to you because you registered an account on DevLink.</p>
				<p>If you didn't create this account, please ignore this email.</p>
			</div>
		</div>
	</body>
	</html>";
}

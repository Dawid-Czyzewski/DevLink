<?php

function getPasswordResetEmailTemplate(string $resetLink): string {
	return "
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset='UTF-8'>
		<title>Password Reset - DevLink</title>
		<style>
			body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
			.container { max-width: 600px; margin: 0 auto; padding: 20px; }
			.header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #111827; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
			.content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
			.button { display: inline-block; background: #fbbf24; color: #111827; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
			.footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
			.warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px; }
		</style>
	</head>
	<body>
		<div class='container'>
			<div class='header'>
				<h1>🔐 Password Reset Request</h1>
			</div>
			<div class='content'>
				<h2>Hello!</h2>
				<p>We received a request to reset your password for your DevLink account.</p>
				
				<p>To reset your password, please click the button below:</p>
				<div style='text-align: center;'>
					<a href='{$resetLink}' class='button'>Reset Password</a>
				</div>
				
				<p>If the button doesn't work, copy and paste this link into your browser:</p>
				<p style='word-break: break-all; background: #fff; padding: 10px; border-radius: 5px; border: 1px solid #ddd;'>
					<a href='{$resetLink}'>{$resetLink}</a>
				</p>
				
				<div class='warning'>
					<p><strong>⚠️ Important:</strong></p>
					<ul>
						<li>This link is valid for <strong>1 hour</strong> only</li>
						<li>If you didn't request a password reset, please ignore this email</li>
						<li>Your password will not change until you click the link above</li>
					</ul>
				</div>
				
				<p>For security reasons, we recommend:</p>
				<ul>
					<li>Choosing a strong, unique password</li>
					<li>Not sharing your password with anyone</li>
					<li>Changing your password regularly</li>
				</ul>
				
				<p>If you have any questions or concerns, please contact our support team.</p>
				
				<p>Best regards,<br><strong>The DevLink Team</strong></p>
			</div>
			<div class='footer'>
				<p>This email was sent to you because a password reset was requested for your DevLink account.</p>
				<p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
			</div>
		</div>
	</body>
	</html>";
}


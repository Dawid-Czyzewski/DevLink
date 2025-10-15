<?php

interface EmailServiceInterface {
	public function sendWelcomeEmail(string $email, string $nickname, string $activationToken): bool;
}

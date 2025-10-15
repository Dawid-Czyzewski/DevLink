<?php

class UserLoginDTO {
    private $email;
    private $password;
    private $rememberMe;

    public function __construct(array $data) {
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        $this->rememberMe = $data['rememberMe'] ?? false;
    }

    public function getEmail(): ?string {
        return $this->email;
    }

    public function getPassword(): ?string {
        return $this->password;
    }

    public function getRememberMe(): bool {
        return $this->rememberMe;
    }

    public function validate(): array {
        $errors = [];

        if (empty($this->email)) {
            $errors['email'] = 'login.errors.emailRequired';
        } elseif (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'login.errors.invalidEmail';
        }

        if (empty($this->password)) {
            $errors['password'] = 'login.errors.passwordRequired';
        }

        return $errors;
    }

    public function toArray(): array {
        return [
            'email' => $this->email,
            'rememberMe' => $this->rememberMe
        ];
    }
}

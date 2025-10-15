<?php

class UserRegistrationDTO {
    public $nickname;
    public $email;
    public $password;
    public $confirmPassword;
    public $acceptTerms;

    public function __construct($data) {
        $this->nickname = $data['nickname'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        $this->confirmPassword = $data['confirmPassword'] ?? null;
        $this->acceptTerms = $data['acceptTerms'] ?? false;
    }

    public function toArray() {
        return [
            'nickname' => $this->nickname,
            'email' => $this->email,
            'password' => $this->password,
            'confirmPassword' => $this->confirmPassword,
            'acceptTerms' => $this->acceptTerms,
        ];
    }
}

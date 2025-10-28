<?php

class User {
    private $id;
    private $nickname;
    private $email;
    private $password;
    private $created_at;
    private $activation_token;
    private $is_active;
    private $password_reset_token;
    private $password_reset_expires;

    public function __construct($id = null, $nickname = null, $email = null, $password = null, $created_at = null, $activation_token = null, $is_active = false, $password_reset_token = null, $password_reset_expires = null) {
        $this->id = $id;
        $this->nickname = $nickname;
        $this->email = $email;
        $this->password = $password;
        $this->created_at = $created_at;
        $this->activation_token = $activation_token;
        $this->is_active = $is_active;
        $this->password_reset_token = $password_reset_token;
        $this->password_reset_expires = $password_reset_expires;
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function getNickname() {
        return $this->nickname;
    }
    
    public function getEmail() {
        return $this->email;
    }
    
    public function getPassword() {
        return $this->password;
    }
    
    public function getCreatedAt() {
        return $this->created_at;
    }
    
    public function getActivationToken() {
        return $this->activation_token;
    }
    
    public function getIsActive() {
        return $this->is_active;
    }
    
    public function setId($id) {
        $this->id = $id;
        return $this;
    }
    
    public function setNickname($nickname) {
        $this->nickname = $nickname;
        return $this;
    }
    
    public function setEmail($email) {
        $this->email = $email;
        return $this;
    }
    
    public function setPassword($password) {
        $this->password = $password;
        return $this;
    }
    
    public function setCreatedAt($created_at) {
        $this->created_at = $created_at;
        return $this;
    }
    
    public function setActivationToken($activation_token) {
        $this->activation_token = $activation_token;
        return $this;
    }
    
    public function setIsActive($is_active) {
        $this->is_active = $is_active;
        return $this;
    }

    public function getPasswordResetToken() {
        return $this->password_reset_token;
    }

    public function setPasswordResetToken($token) {
        $this->password_reset_token = $token;
        return $this;
    }

    public function getPasswordResetExpires() {
        return $this->password_reset_expires;
    }

    public function setPasswordResetExpires($expires) {
        $this->password_reset_expires = $expires;
        return $this;
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'nickname' => $this->nickname,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'createdAt' => $this->created_at,
        ];
    }
}

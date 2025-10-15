<?php

class UserActivationDTO {
    private $token;
    
    public function __construct(array $data) {
        $this->token = $data['token'] ?? null;
    }
    
    public function getToken(): ?string {
        return $this->token;
    }
    
    public function validate(): array {
        $errors = [];
        
        if (empty($this->token)) {
            $errors['token'] = 'activate.errors.tokenRequired';
        } elseif (!is_string($this->token)) {
            $errors['token'] = 'activate.errors.invalidTokenFormat';
        }
        
        return $errors;
    }
    
    public function toArray(): array {
        return [
            'token' => $this->token
        ];
    }
}

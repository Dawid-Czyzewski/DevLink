<?php

class UserResponseDTO {
    public $id;
    public $nickname;
    public $email;
    public $createdAt;

    public function __construct($data) {
        $this->id = $data['id'] ?? null;
        $this->nickname = $data['nickname'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->createdAt = $data['created_at'] ?? null;
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'nickname' => $this->nickname,
            'email' => $this->email,
            'createdAt' => $this->createdAt,
        ];
    }
}

<?php

class MessageDTO {
    public $id;
    public $chatId;
    public $senderId;
    public $content;
    public $createdAt;

    public function __construct($data = []) {
        $this->id = $data['id'] ?? null;
        $this->chatId = $data['chat_id'] ?? $data['chatId'] ?? null;
        $this->senderId = $data['sender_id'] ?? $data['senderId'] ?? null;
        $this->content = $data['content'] ?? '';
        $this->createdAt = $data['created_at'] ?? $data['createdAt'] ?? null;
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'chat_id' => $this->chatId,
            'sender_id' => $this->senderId,
            'content' => $this->content,
            'created_at' => $this->createdAt
        ];
    }

    public function toJson() {
        return json_encode($this->toArray());
    }

    public function validate() {
        $errors = [];

        if (empty($this->chatId)) {
            $errors['chat_id'] = 'Chat ID is required';
        }

        if (empty($this->senderId)) {
            $errors['sender_id'] = 'Sender ID is required';
        }

        if (empty($this->content)) {
            $errors['content'] = 'Message content is required';
        } elseif (strlen($this->content) > 1000) {
            $errors['content'] = 'Message cannot exceed 1000 characters';
        }

        return $errors;
    }
}

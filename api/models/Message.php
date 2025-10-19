<?php

class Message {
    private $id;
    private $chatId;
    private $senderId;
    private $senderNickname;
    private $content;
    private $createdAt;

    public function __construct($data = []) {
        if (!empty($data)) {
            $this->id = $data['id'] ?? null;
            $this->chatId = $data['chat_id'] ?? null;
            $this->senderId = $data['sender_id'] ?? null;
            $this->senderNickname = $data['sender_nickname'] ?? null;
            $this->content = $data['content'] ?? '';
            $this->createdAt = $data['created_at'] ?? null;
        }
    }

    public function getId() {
        return $this->id;
    }

    public function getChatId() {
        return $this->chatId;
    }

    public function getSenderId() {
        return $this->senderId;
    }

    public function getSenderNickname() {
        return $this->senderNickname;
    }

    public function getContent() {
        return $this->content;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setChatId($chatId) {
        $this->chatId = $chatId;
        return $this;
    }

    public function setSenderId($senderId) {
        $this->senderId = $senderId;
        return $this;
    }

    public function setSenderNickname($senderNickname) {
        $this->senderNickname = $senderNickname;
        return $this;
    }

    public function setContent($content) {
        $this->content = $content;
        return $this;
    }

    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'chat_id' => $this->chatId,
            'sender_id' => $this->senderId,
            'sender_nickname' => $this->senderNickname,
            'content' => $this->content,
            'created_at' => $this->createdAt
        ];
    }

    public function toJson() {
        return json_encode($this->toArray());
    }
}

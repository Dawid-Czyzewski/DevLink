<?php

class Announcement {
    private $id;
    private $userId;
    private $userName;
    private $title;
    private $description;
    private $categories;
    private $tags;
    private $chatCount;
    private $viewsCount;
    private $createdAt;
    private $updatedAt;

    public function __construct($data = []) {
        if (!empty($data)) {
            $this->id = $data['id'] ?? null;
            $this->userId = $data['user_id'] ?? null;
            $this->userName = $data['user_name'] ?? null;
            $this->title = $data['title'] ?? '';
            $this->description = $data['description'] ?? '';
            $this->categories = $data['categories'] ?? [];
            $this->tags = $data['tags'] ?? [];
            $this->chatCount = $data['chat_count'] ?? 0;
            $this->viewsCount = $data['views_count'] ?? null;
            $this->createdAt = $data['created_at'] ?? null;
            $this->updatedAt = $data['updated_at'] ?? null;
        }
    }

    public function getId() {
        return $this->id;
    }

    public function getUserId() {
        return $this->userId;
    }

    public function getUserName() {
        return $this->userName;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getCategories() {
        return $this->categories;
    }

    public function getTags() {
        return $this->tags;
    }

    public function getChatCount() {
        return $this->chatCount;
    }

    public function getViewsCount() {
        return $this->viewsCount;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function getUpdatedAt() {
        return $this->updatedAt;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setUserId($userId) {
        $this->userId = $userId;
        return $this;
    }

    public function setUserName($userName) {
        $this->userName = $userName;
        return $this;
    }

    public function setTitle($title) {
        $this->title = $title;
        return $this;
    }

    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    public function setCategories($categories) {
        $this->categories = $categories;
        return $this;
    }

    public function setTags($tags) {
        $this->tags = $tags;
        return $this;
    }

    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function setUpdatedAt($updatedAt) {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'user_id' => $this->userId,
            'user_name' => $this->userName,
            'title' => $this->title,
            'description' => $this->description,
            'categories' => $this->categories,
            'tags' => $this->tags,
            'chat_count' => $this->chatCount,
            'views_count' => $this->viewsCount,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt
        ];
    }

    public function toJson() {
        return json_encode($this->toArray());
    }
}

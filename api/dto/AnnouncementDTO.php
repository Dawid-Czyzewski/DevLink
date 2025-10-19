<?php

class AnnouncementDTO {
    public $id;
    public $userId;
    public $title;
    public $description;
    public $categories;
    public $tags;
    public $createdAt;
    public $updatedAt;

    public function __construct($data = []) {
        $this->id = $data['id'] ?? null;
        $this->userId = $data['user_id'] ?? $data['userId'] ?? null;
        $this->title = $data['title'] ?? '';
        $this->description = $data['description'] ?? '';
        $this->categories = $data['categories'] ?? [];
        $this->tags = $data['tags'] ?? [];
        $this->createdAt = $data['created_at'] ?? $data['createdAt'] ?? null;
        $this->updatedAt = $data['updated_at'] ?? $data['updatedAt'] ?? null;
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'user_id' => $this->userId,
            'title' => $this->title,
            'description' => $this->description,
            'categories' => $this->categories,
            'tags' => $this->tags,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt
        ];
    }

    public function toJson() {
        return json_encode($this->toArray());
    }

    public function validate() {
        $errors = [];

        if (empty($this->title)) {
            $errors['title'] = 'Title is required';
        }

        if (empty($this->description)) {
            $errors['description'] = 'Description is required';
        } elseif (strlen($this->description) > 2000) {
            $errors['description'] = 'Description cannot exceed 2000 characters';
        }

        if (empty($this->categories) || !is_array($this->categories)) {
            $errors['categories'] = 'At least one category is required';
        }

        if (!empty($this->tags) && !is_array($this->tags)) {
            $errors['tags'] = 'Tags must be an array';      
        }

        return $errors;
    }
}

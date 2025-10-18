<?php

class UserResponseDTO {
    public $id;
    public $nickname;
    public $email;
    public $createdAt;
    public $description;
    public $tags;
    public $category;
    public $hasCommercialExperience;
    public $experienceLevel;
    public $github;
    public $website;
    public $linkedin;

    public function __construct($data) {
        $this->id = $data['id'] ?? null;
        $this->nickname = $data['nickname'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->createdAt = $data['created_at'] ?? null;
        $this->description = $data['description'] ?? null;
        $this->tags = $data['tags'] ?? [];
        $this->category = $data['category'] ?? null;
        $this->hasCommercialExperience = $data['hasCommercialExperience'] ?? false;
        $this->experienceLevel = $data['experienceLevel'] ?? null;
        $this->github = $data['github'] ?? null;
        $this->website = $data['website'] ?? null;
        $this->linkedin = $data['linkedin'] ?? null;
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'nickname' => $this->nickname,
            'email' => $this->email,
            'createdAt' => $this->createdAt,
            'description' => $this->description,
            'tags' => $this->tags,
            'category' => $this->category,
            'hasCommercialExperience' => $this->hasCommercialExperience,
            'experienceLevel' => $this->experienceLevel,
            'github' => $this->github,
            'website' => $this->website,
            'linkedin' => $this->linkedin,
        ];
    }

    public function toPublicArray() {
        return [
            'id' => $this->id,
            'nickname' => $this->nickname,
            'createdAt' => $this->createdAt,
            'description' => $this->description,
            'tags' => $this->tags,
            'category' => $this->category,
            'hasCommercialExperience' => $this->hasCommercialExperience,
            'experienceLevel' => $this->experienceLevel,
            'github' => $this->github,
            'website' => $this->website,
            'linkedin' => $this->linkedin,
        ];
    }
}

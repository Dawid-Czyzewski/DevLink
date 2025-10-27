<?php

class UserDetails {
    private $id;
    private $user_id;
    private $description;
    private $tags;
    private $category;
    private $has_commercial_experience;
    private $experience_level;
    private $github_url;
    private $website_url;
    private $linkedin_url;

    public function __construct($id = null, $user_id = null, $description = null, $tags = null, $category = null, $has_commercial_experience = false, $experience_level = null, $github_url = null, $website_url = null, $linkedin_url = null) {
        $this->id = $id;
        $this->user_id = $user_id;
        $this->description = $description;
        $this->tags = $tags;
        $this->category = $category;
        $this->has_commercial_experience = $has_commercial_experience;
        $this->experience_level = $experience_level;
        $this->github_url = $github_url;
        $this->website_url = $website_url;
        $this->linkedin_url = $linkedin_url;
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function getUserId() {
        return $this->user_id;
    }
    
    public function getDescription() {
        return $this->description;
    }
    
    public function getTags() {
        return $this->tags;
    }
    
    public function getCategory() {
        return $this->category;
    }
    
    public function getHasCommercialExperience() {
        return $this->has_commercial_experience;
    }
    
    public function getExperienceLevel() {
        return $this->experience_level;
    }
    
    public function getGithubUrl() {
        return $this->github_url;
    }
    
    public function getWebsiteUrl() {
        return $this->website_url;
    }
    
    public function getLinkedinUrl() {
        return $this->linkedin_url;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }
    
    public function setUserId($user_id) {
        $this->user_id = $user_id;
        return $this;
    }
    
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }
    
    public function setTags($tags) {
        $this->tags = $tags;
        return $this;
    }
    
    public function setCategory($category) {
        $this->category = $category;
        return $this;
    }
    
    public function setHasCommercialExperience($has_commercial_experience) {
        $this->has_commercial_experience = $has_commercial_experience;
        return $this;
    }
    
    public function setExperienceLevel($experience_level) {
        $this->experience_level = $experience_level;
        return $this;
    }
    
    public function setGithubUrl($github_url) {
        $this->github_url = $github_url;
        return $this;
    }
    
    public function setWebsiteUrl($website_url) {
        $this->website_url = $website_url;
        return $this;
    }
    
    public function setLinkedinUrl($linkedin_url) {
        $this->linkedin_url = $linkedin_url;
        return $this;
    }

    public function toArray() {
        $tags = $this->tags;
        if (is_string($tags)) {
            $decodedTags = json_decode($tags, true);
            $tags = is_array($decodedTags) ? $decodedTags : [];
        } elseif (!is_array($tags)) {
            $tags = [];
        }
        
        return [
            'description' => $this->description,
            'tags' => $tags,
            'category' => $this->category,
            'hasCommercialExperience' => $this->has_commercial_experience,
            'experienceLevel' => $this->experience_level,
            'github' => $this->github_url,
            'website' => $this->website_url,
            'linkedin' => $this->linkedin_url
        ];
    }
}

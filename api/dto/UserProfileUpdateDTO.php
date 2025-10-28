<?php

require_once ENUMS_PATH . 'Category.php';
require_once ENUMS_PATH . 'ExperienceLevel.php';

class UserProfileUpdateDTO {
    private $description;
    private $tags;
    private $category;
    private $hasCommercialExperience;
    private $experienceLevel;
    private $github;
    private $website;
    private $linkedin;

    public function __construct($data) {
        $this->description = $data['description'] ?? null;
        $this->tags = $data['tags'] ?? [];
        $this->category = (!empty($data['category']) && trim($data['category']) !== '') ? $data['category'] : null;
        $this->hasCommercialExperience = $data['hasCommercialExperience'] ?? false;
        $this->experienceLevel = $data['experienceLevel'] ?? null;
        $this->github = $data['github'] ?? null;
        $this->website = $data['website'] ?? null;
        $this->linkedin = $data['linkedin'] ?? null;
    }

    public function validate() {
        $errors = [];

        if ($this->description !== null && strlen($this->description) > 1000) {
            $errors['description'] = 'editProfile.errors.descriptionTooLong';
        }

        if (!is_array($this->tags)) {
            $errors['tags'] = 'editProfile.errors.tagsMustBeArray';
        } else {
            if (count($this->tags) > 20) {
                $errors['tags'] = 'editProfile.errors.tooManyTags';
            }
            foreach ($this->tags as $tag) {
                if (!is_string($tag) || strlen($tag) > 50) {
                    $errors['tags'] = 'editProfile.errors.tagTooLong';
                    break;
                }
            }
        }

        if ($this->category !== null && !Category::isValid($this->category)) {
            $errors['category'] = 'editProfile.errors.invalidCategory';
        }

        if ($this->experienceLevel !== null && !empty($this->experienceLevel) && !ExperienceLevel::isValid($this->experienceLevel)) {
            $errors['experienceLevel'] = 'editProfile.errors.invalidExperienceLevel';
        }

        if ($this->github !== null && !empty($this->github)) {
            if (!filter_var($this->github, FILTER_VALIDATE_URL)) {
                $errors['github'] = 'editProfile.errors.invalidUrl';
            }
        }

        if ($this->website !== null && !empty($this->website)) {
            if (!filter_var($this->website, FILTER_VALIDATE_URL)) {
                $errors['website'] = 'editProfile.errors.invalidUrl';
            }
        }

        if ($this->linkedin !== null && !empty($this->linkedin)) {
            if (!filter_var($this->linkedin, FILTER_VALIDATE_URL)) {
                $errors['linkedin'] = 'editProfile.errors.invalidUrl';
            }
        }

        return $errors;
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
        return $this->hasCommercialExperience;
    }

    public function getExperienceLevel() {
        return $this->experienceLevel;
    }

    public function getGithub() {
        return $this->github;
    }

    public function getWebsite() {
        return $this->website;
    }

    public function getLinkedin() {
        return $this->linkedin;
    }

    public function toArray() {
        return [
            'description' => $this->description,
            'tags' => $this->tags,
            'category' => $this->category,
            'hasCommercialExperience' => $this->hasCommercialExperience,
            'experienceLevel' => $this->experienceLevel,
            'github' => $this->github,
            'website' => $this->website,
            'linkedin' => $this->linkedin
        ];
    }
}

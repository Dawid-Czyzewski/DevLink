<?php

require_once MODELS_PATH . 'UserDetails.php';

class UserDetailsRepository {
    private $conn;
    private $table_name = "user_details";
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function save(UserDetails $userDetails): UserDetails {
        if ($userDetails->getId()) {
            return $this->update($userDetails);
        } else {
            return $this->create($userDetails);
        }
    }
    
    private function create(UserDetails $userDetails): UserDetails {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET user_id=:user_id, description=:description, tags=:tags,
                      category=:category, has_commercial_experience=:has_commercial_experience,
                      experience_level=:experience_level, github_url=:github_url, 
                      website_url=:website_url, linkedin_url=:linkedin_url";
        
        $stmt = $this->conn->prepare($query);
        
        $user_id = $userDetails->getUserId();
        $description = $userDetails->getDescription();
        $tags = $userDetails->getTags() ? json_encode($userDetails->getTags()) : null;
        $category = $userDetails->getCategory();
        $has_commercial_experience = $userDetails->getHasCommercialExperience() ? 1 : 0;
        $experience_level = $userDetails->getExperienceLevel();
        $github_url = $userDetails->getGithubUrl();
        $website_url = $userDetails->getWebsiteUrl();
        $linkedin_url = $userDetails->getLinkedinUrl();
        
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":tags", $tags);
        $stmt->bindParam(":category", $category);
        $stmt->bindParam(":has_commercial_experience", $has_commercial_experience);
        $stmt->bindParam(":experience_level", $experience_level);
        $stmt->bindParam(":github_url", $github_url);
        $stmt->bindParam(":website_url", $website_url);
        $stmt->bindParam(":linkedin_url", $linkedin_url);
        
        if ($stmt->execute()) {
            $userDetails->setId($this->conn->lastInsertId());
        } else {
            throw new Exception("Failed to create user details: " . implode(", ", $stmt->errorInfo()));
        }
        
        return $userDetails;
    }
    
    private function update(UserDetails $userDetails): UserDetails {
        $query = "UPDATE " . $this->table_name . " 
                  SET description=:description, tags=:tags, category=:category, 
                      has_commercial_experience=:has_commercial_experience,
                      experience_level=:experience_level, github_url=:github_url, 
                      website_url=:website_url, linkedin_url=:linkedin_url
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);
        
        $description = $userDetails->getDescription();
        $tags = $userDetails->getTags() ? json_encode($userDetails->getTags()) : null;
        $category = $userDetails->getCategory();
        $has_commercial_experience = $userDetails->getHasCommercialExperience() ? 1 : 0;
        $experience_level = $userDetails->getExperienceLevel();
        $github_url = $userDetails->getGithubUrl();
        $website_url = $userDetails->getWebsiteUrl();
        $linkedin_url = $userDetails->getLinkedinUrl();
        $id = $userDetails->getId();
        
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":tags", $tags);
        $stmt->bindParam(":category", $category);
        $stmt->bindParam(":has_commercial_experience", $has_commercial_experience);
        $stmt->bindParam(":experience_level", $experience_level);
        $stmt->bindParam(":github_url", $github_url);
        $stmt->bindParam(":website_url", $website_url);
        $stmt->bindParam(":linkedin_url", $linkedin_url);
        $stmt->bindParam(":id", $id);
        
        if (!$stmt->execute()) {
            throw new Exception("Failed to update user details: " . implode(", ", $stmt->errorInfo()));
        }
        
        return $userDetails;
    }
    
    public function findByUserId(int $userId): ?UserDetails {
        $query = "SELECT id, user_id, description, tags, category, has_commercial_experience, 
                         experience_level, github_url, website_url, linkedin_url
                  FROM " . $this->table_name . " 
                  WHERE user_id = :user_id 
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $userId);
        $stmt->execute();
        
        $data = $stmt->fetch();
        return $data ? $this->mapToUserDetails($data) : null;
    }
    
    public function deleteByUserId(int $userId): bool {
        $query = "DELETE FROM " . $this->table_name . " WHERE user_id = :user_id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $userId);
        
        return $stmt->execute();
    }
    
    private function mapToUserDetails(array $data): UserDetails {
        $tags = null;
        if (!empty($data['tags'])) {
            $decodedTags = json_decode($data['tags'], true);
            $tags = $decodedTags ?: [];
        }
        
        return new UserDetails(
            $data['id'],
            $data['user_id'],
            $data['description'],
            $tags,
            $data['category'],
            (bool) $data['has_commercial_experience'],
            $data['experience_level'],
            $data['github_url'],
            $data['website_url'],
            $data['linkedin_url']
        );
    }
}

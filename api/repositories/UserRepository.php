<?php

require_once MODELS_PATH . 'User.php';
require_once REPOSITORIES_PATH . 'UserRepositoryInterface.php';

class UserRepository implements UserRepositoryInterface {
    private $conn;
    private $table_name = "users";
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function getConnection() {
        return $this->conn;
    }
    
    public function save(User $user): User {
        if ($user->getId()) {
            return $this->update($user);
        } else {
            return $this->create($user);
        }
    }
    
    private function create(User $user): User {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET nickname=:nickname, email=:email, password=:password,
                      activation_token=:activation_token, is_active=:is_active,
                      created_at=NOW()";
        
        $stmt = $this->conn->prepare($query);
        
        $nickname = $user->getNickname();
        $email = $user->getEmail();
        $password = $user->getPassword();
        $activation_token = $user->getActivationToken();
        $is_active = $user->getIsActive() ? 1 : 0;
        
        $stmt->bindParam(":nickname", $nickname);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $password);
        $stmt->bindParam(":activation_token", $activation_token);
        $stmt->bindParam(":is_active", $is_active);
        
        if ($stmt->execute()) {
            $user->setId($this->conn->lastInsertId());
            $user->setCreatedAt(date('Y-m-d H:i:s'));
        }
        
        return $user;
    }
    
    private function update(User $user): User {
        $query = "UPDATE " . $this->table_name . " 
                  SET nickname=:nickname, email=:email
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);
        
        $nickname = $user->getNickname();
        $email = $user->getEmail();
        $id = $user->getId();
        
        $stmt->bindParam(":nickname", $nickname);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":id", $id);
        
        if ($stmt->execute()) {
            $user->setUpdatedAt(date('Y-m-d H:i:s'));
        }
        
        return $user;
    }
    
    public function findById(int $id): ?User {
        $query = "SELECT id, nickname, email, password, activation_token, is_active, created_at
                  FROM " . $this->table_name . " 
                  WHERE id = :id 
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        
        $data = $stmt->fetch();
        return $data ? $this->mapToUser($data) : null;
    }
    
    public function findByEmail(string $email): ?User {
        $query = "SELECT id, nickname, email, password, activation_token, is_active, created_at
                  FROM " . $this->table_name . " 
                  WHERE email = :email 
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        
        $data = $stmt->fetch();
        return $data ? $this->mapToUser($data) : null;
    }
    
    public function findByNickname(string $nickname): ?User {
        $query = "SELECT id, nickname, email, password, activation_token, is_active, created_at
                  FROM " . $this->table_name . " 
                  WHERE nickname = :nickname 
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nickname", $nickname);
        $stmt->execute();
        
        $data = $stmt->fetch();
        return $data ? $this->mapToUser($data) : null;
    }
    
    public function emailExists(string $email, ?int $excludeId = null): bool {
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = :email";
        
        if ($excludeId) {
            $query .= " AND id != :exclude_id";
        }
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $email);
        
        if ($excludeId) {
            $stmt->bindParam(":exclude_id", $excludeId);
        }
        
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }
    
    public function nicknameExists(string $nickname, ?int $excludeId = null): bool {
        $query = "SELECT id FROM " . $this->table_name . " WHERE nickname = :nickname";
        
        if ($excludeId) {
            $query .= " AND id != :exclude_id";
        }
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nickname", $nickname);
        
        if ($excludeId) {
            $stmt->bindParam(":exclude_id", $excludeId);
        }
        
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }
    
    public function delete(int $id): bool {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        
        return $stmt->execute();
    }
    
    public function findAll(int $limit = 50, int $offset = 0): array {
        $query = "SELECT id, nickname, email, created_at
                  FROM " . $this->table_name . " 
                  ORDER BY created_at DESC 
                  LIMIT :limit OFFSET :offset";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
        $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        $results = $stmt->fetchAll();
        return array_map([$this, 'mapToUser'], $results);
    }
    
    public function count(): int {
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name;
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        $result = $stmt->fetch();
        return $result['total'];
    }

    public function findByActivationToken(string $token): ?User {
        $query = "SELECT id, nickname, email, password, activation_token, is_active, created_at
                  FROM " . $this->table_name . " 
                  WHERE activation_token = :token 
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":token", $token);
        $stmt->execute();
        
        $data = $stmt->fetch();
        return $data ? $this->mapToUser($data) : null;
    }
    
    public function activateUser(int $id): bool {
        $query = "UPDATE " . $this->table_name . " 
                  SET is_active = 1, activation_token = NULL 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        
        return $stmt->execute();
    }
    
    private function mapToUser(array $data): User {
        return new User(
            $data['id'],
            $data['nickname'],
            $data['email'],
            $data['password'] ?? null,
            $data['created_at'],
            $data['activation_token'] ?? null,
            (bool) $data['is_active']
        );
    }
}

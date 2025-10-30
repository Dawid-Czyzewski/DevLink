<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Announcement.php';
require_once __DIR__ . '/../exceptions/DatabaseException.php';

class AnnouncementRepository {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function create($data) {
        try {
            $query = "INSERT INTO announcements (user_id, title, description, categories, tags, created_at, updated_at)
                      VALUES (:user_id, :title, :description, :categories, :tags, NOW(), NOW())";

            $stmt = $this->db->prepare($query);

            $categories = json_encode($data['categories']);
            $tags = json_encode($data['tags']);

            $stmt->bindParam(':user_id', $data['user_id'], PDO::PARAM_INT);
            $stmt->bindParam(':title', $data['title'], PDO::PARAM_STR);
            $stmt->bindParam(':description', $data['description'], PDO::PARAM_STR);
            $stmt->bindParam(':categories', $categories, PDO::PARAM_STR);
            $stmt->bindParam(':tags', $tags, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $announcementId = $this->db->lastInsertId();
                return $this->findById($announcementId);
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to create announcement: " . $e->getMessage());
        }
    }

    public function findById($id) {
        try {
            $query = "SELECT a.*, u.nickname as user_name 
                      FROM announcements a 
                      LEFT JOIN users u ON a.user_id = u.id 
                      WHERE a.id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['categories'] = json_decode($row['categories'], true);
                $row['tags'] = json_decode($row['tags'], true);
                return new Announcement($row);
            }
            return null;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to find announcement: " . $e->getMessage());
        }
    }

    public function incrementViews($id) {
        try {
            $query = "UPDATE announcements SET views_count = COALESCE(views_count, 0) + 1 WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            return $stmt->execute();
        } catch (Exception $e) {
            throw new DatabaseException("Failed to increment views: " . $e->getMessage());
        }
    }

    public function findByUserId($userId) {
        try {
            $query = "SELECT a.*, COUNT(c.id) as chat_count 
                      FROM announcements a 
                      LEFT JOIN chats c ON a.id = c.announcement_id 
                      WHERE a.user_id = :user_id 
                      GROUP BY a.id 
                      ORDER BY a.created_at DESC";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->execute();

            $announcements = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['categories'] = json_decode($row['categories'], true);
                $row['tags'] = json_decode($row['tags'], true);
                $announcements[] = new Announcement($row);
            }
            return $announcements;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to find announcements by user: " . $e->getMessage());
        }
    }

    public function findAll($limit = 50, $offset = 0) {
        try {
            $query = "SELECT * FROM announcements ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();

            $announcements = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['categories'] = json_decode($row['categories'], true);
                $row['tags'] = json_decode($row['tags'], true);
                $announcements[] = new Announcement($row);
            }
            return $announcements;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to find announcements: " . $e->getMessage());
        }
    }

    public function update($id, $data) {
        try {
            $query = "UPDATE announcements 
                      SET title = :title, description = :description, categories = :categories, tags = :tags, updated_at = NOW()
                      WHERE id = :id AND user_id = :user_id";

            $stmt = $this->db->prepare($query);

            $categories = json_encode($data['categories']);
            $tags = json_encode($data['tags']);

            $stmt->bindParam(':title', $data['title'], PDO::PARAM_STR);
            $stmt->bindParam(':description', $data['description'], PDO::PARAM_STR);
            $stmt->bindParam(':categories', $categories, PDO::PARAM_STR);
            $stmt->bindParam(':tags', $tags, PDO::PARAM_STR);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':user_id', $data['user_id'], PDO::PARAM_INT);

            if ($stmt->execute() && $stmt->rowCount() > 0) {
                return $this->findById($id);
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to update announcement: " . $e->getMessage());
        }
    }

    public function delete($id, $userId) {
        try {
            $query = "DELETE FROM announcements WHERE id = :id AND user_id = :user_id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);

            if ($stmt->execute() && $stmt->rowCount() > 0) {
                return true;
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to delete announcement: " . $e->getMessage());
        }
    }

    public function search($filters = []) {
        try {
            $sql = "SELECT * FROM announcements WHERE 1=1";
            $params = [];

            if (!empty($filters['categories'])) {
                $sql .= " AND JSON_CONTAINS(categories, :categories)";
                $params[':categories'] = json_encode($filters['categories']);
            }

            if (!empty($filters['tags'])) {
                $sql .= " AND JSON_CONTAINS(tags, :tags)";
                $params[':tags'] = json_encode($filters['tags']);
            }

            if (!empty($filters['search'])) {
                $sql .= " AND (title LIKE :search OR description LIKE :search)";
                $params[':search'] = '%' . $filters['search'] . '%';
            }

            $sql .= " ORDER BY created_at DESC";

            if (!empty($filters['limit'])) {
                $sql .= " LIMIT :limit";
                $params[':limit'] = (int)$filters['limit'];
            }

            if (!empty($filters['offset'])) {
                $sql .= " OFFSET :offset";
                $params[':offset'] = (int)$filters['offset'];
            }

            $stmt = $this->db->prepare($sql);
            foreach ($params as $key => &$val) {
                $stmt->bindParam($key, $val, is_int($val) ? PDO::PARAM_INT : PDO::PARAM_STR);
            }
            $stmt->execute();

            $announcements = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['categories'] = json_decode($row['categories'], true);
                $row['tags'] = json_decode($row['tags'], true);
                $announcements[] = new Announcement($row);
            }
            return $announcements;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to search announcements: " . $e->getMessage());
        }
    }
}

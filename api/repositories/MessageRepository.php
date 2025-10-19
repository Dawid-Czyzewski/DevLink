<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Message.php';
require_once __DIR__ . '/../exceptions/DatabaseException.php';

class MessageRepository {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function create($data) {
        try {
            $query = "INSERT INTO messages (chat_id, sender_id, content, created_at)
                      VALUES (:chat_id, :sender_id, :content, NOW())";

            $stmt = $this->db->prepare($query);

            $stmt->bindParam(':chat_id', $data['chat_id'], PDO::PARAM_INT);
            $stmt->bindParam(':sender_id', $data['sender_id'], PDO::PARAM_INT);
            $stmt->bindParam(':content', $data['content'], PDO::PARAM_STR);

            if ($stmt->execute()) {
                $messageId = $this->db->lastInsertId();
                return $this->findById($messageId);
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to create message: " . $e->getMessage());
        }
    }

    public function findById($id) {
        try {
            $query = "SELECT * FROM messages WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return new Message($row);
            }
            return null;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to find message: " . $e->getMessage());
        }
    }

    public function findByChatId($chatId, $limit = 50, $offset = 0) {
        try {
            $query = "SELECT * FROM messages WHERE chat_id = :chat_id ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':chat_id', $chatId, PDO::PARAM_INT);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();

            $messages = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $messages[] = new Message($row);
            }
            return $messages;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to find messages by chat ID: " . $e->getMessage());
        }
    }

    public function findBySenderId($senderId) {
        try {
            $query = "SELECT * FROM messages WHERE sender_id = :sender_id ORDER BY created_at DESC";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':sender_id', $senderId, PDO::PARAM_INT);
            $stmt->execute();

            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return new Message($row);
            }
            return null;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to find messages by sender ID: " . $e->getMessage());
        }
    }

    public function update($id, $content) {
        try {
            $query = "UPDATE messages SET content = :content, updated_at = NOW() WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':content', $content, PDO::PARAM_STR);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute() && $stmt->rowCount() > 0) {
                return $this->findById($id);
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to update message: " . $e->getMessage());
        }
    }

    public function delete($id) {
        try {
            $query = "DELETE FROM messages WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute() && $stmt->rowCount() > 0) {
                return true;
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to delete message: " . $e->getMessage());
        }
    }

    public function deleteByChatId($chatId) {
        try {
            $query = "DELETE FROM messages WHERE chat_id = :chat_id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':chat_id', $chatId, PDO::PARAM_INT);

            if ($stmt->execute() && $stmt->rowCount() > 0) {
                return true;
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to delete messages by chat ID: " . $e->getMessage());
        }
    }

    public function getMessageCount($chatId) {
        try {
            $query = "SELECT COUNT(*) as count FROM messages WHERE chat_id = :chat_id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':chat_id', $chatId, PDO::PARAM_INT);
            $stmt->execute();

            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return $row['count'];
            }
            return 0;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to get message count: " . $e->getMessage());
        }
    }
}

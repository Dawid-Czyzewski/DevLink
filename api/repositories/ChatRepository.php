<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Chat.php';
require_once __DIR__ . '/../exceptions/DatabaseException.php';

class ChatRepository {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function create($data) {
        try {
            $query = "INSERT INTO chats (announcement_id, participants, created_at, updated_at)
                      VALUES (:announcement_id, :participants, NOW(), NOW())";

            $stmt = $this->db->prepare($query);

            $participants = json_encode($data['participants']);

            $stmt->bindParam(':announcement_id', $data['announcement_id'], PDO::PARAM_INT);
            $stmt->bindParam(':participants', $participants, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $chatId = $this->db->lastInsertId();
                return $this->findById($chatId);
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to create chat: " . $e->getMessage());
        }
    }

    public function findById($id) {
        try {
            $query = "SELECT * FROM chats WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['participants'] = json_decode($row['participants'], true);
                return new Chat($row);
            }
            return null;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to find chat: " . $e->getMessage());
        }
    }

    public function findByAnnouncementId($announcementId) {
        try {
            $query = "SELECT * FROM chats WHERE announcement_id = :announcement_id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':announcement_id', $announcementId, PDO::PARAM_INT);
            $stmt->execute();

            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['participants'] = json_decode($row['participants'], true);
                return new Chat($row);
            }
            return null;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to find chat by announcement: " . $e->getMessage());
        }
    }

    public function findByUserId($userId) {
        try {
            // Use JSON_CONTAINS to check if userId is in the participants array
            $query = "SELECT * FROM chats WHERE JSON_CONTAINS(participants, :userIdJson, '$') ORDER BY updated_at DESC";
            $stmt = $this->db->prepare($query);
            $userIdJson = json_encode((int)$userId); // Ensure userId is treated as an integer in JSON
            $stmt->bindParam(':userIdJson', $userIdJson, PDO::PARAM_STR);
            $stmt->execute();
            
            $chats = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['participants'] = json_decode($row['participants'], true);
                $chats[] = new Chat($row);
            }
            return $chats;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to find chats by user: " . $e->getMessage());
        }
    }

    public function updateParticipants($id, $participants) {
        try {
            $query = "UPDATE chats SET participants = :participants, updated_at = NOW() WHERE id = :id";
            $stmt = $this->db->prepare($query);
            
            $participantsJson = json_encode($participants);
            
            $stmt->bindParam(':participants', $participantsJson, PDO::PARAM_STR);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute() && $stmt->rowCount() > 0) {
                return $this->findById($id);
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to update chat participants: " . $e->getMessage());
        }
    }

    public function addParticipant($id, $userId) {
        try {
            $chat = $this->findById($id);
            if (!$chat) {
                return false;
            }

            $participants = $chat->getParticipants();
            if (!in_array($userId, $participants)) {
                $participants[] = $userId;
                return $this->updateParticipants($id, $participants);
            }
            return $chat;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to add participant: " . $e->getMessage());
        }
    }

    public function removeParticipant($id, $userId) {
        try {
            $chat = $this->findById($id);
            if (!$chat) {
                return false;
            }

            $participants = $chat->getParticipants();
            $participants = array_filter($participants, function($id) use ($userId) {
                return $id != $userId;
            });

            return $this->updateParticipants($id, array_values($participants));
        } catch (Exception $e) {
            throw new DatabaseException("Failed to remove participant: " . $e->getMessage());
        }
    }

    public function delete($id) {
        try {
            $query = "DELETE FROM chats WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute() && $stmt->rowCount() > 0) {
                return true;
            }
            return false;
        } catch (Exception $e) {
            throw new DatabaseException("Failed to delete chat: " . $e->getMessage());
        }
    }
}

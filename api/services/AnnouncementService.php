<?php

require_once __DIR__ . '/../repositories/AnnouncementRepository.php';
require_once __DIR__ . '/../repositories/ChatRepository.php';
require_once __DIR__ . '/../dto/AnnouncementDTO.php';

class AnnouncementService {
    private $announcementRepository;
    private $chatRepository;

    public function __construct() {
        $this->announcementRepository = new AnnouncementRepository();
        $this->chatRepository = new ChatRepository();
    }

    public function createAnnouncement($data, $userId) {
        try {
            $dto = new AnnouncementDTO($data);
            $errors = $dto->validate();

            if (!empty($errors)) {
                return [
                    'success' => false,
                    'errors' => $errors
                ];
            }

            $announcementData = $dto->toArray();
            $announcementData['user_id'] = $userId;
            $announcement = $this->announcementRepository->create($announcementData);

            if (!$announcement) {
                return [
                    'success' => false,
                    'message' => 'Failed to create announcement'
                ];
            }

            $chatData = [
                'announcement_id' => $announcement->getId(),
                'participants' => [$userId]
            ];

            $chat = $this->chatRepository->create($chatData);

            if (!$chat) {
                $this->announcementRepository->delete($announcement->getId(), $userId);
                return [
                    'success' => false,
                    'message' => 'Failed to create chat for announcement'
                ];
            }

            return [
                'success' => true,
                'announcement' => $announcement,
                'chat' => $chat
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function getAnnouncements($limit = 50, $offset = 0) {
        try {
            $announcements = $this->announcementRepository->findAll($limit, $offset);
            return [
                'success' => true,
                'announcements' => $announcements
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function getAnnouncementById($id) {
        try {
            $announcement = $this->announcementRepository->findById($id);
            
            if (!$announcement) {
                return [
                    'success' => false,
                    'message' => 'Announcement not found'
                ];
            }

            return [
                'success' => true,
                'announcement' => $announcement
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function getUserAnnouncements($userId) {
        try {
            $announcements = $this->announcementRepository->findByUserId($userId);
            return [
                'success' => true,
                'announcements' => $announcements
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function updateAnnouncement($id, $data, $userId) {
        try {
            $dto = new AnnouncementDTO($data);
            $errors = $dto->validate();

            if (!empty($errors)) {
                return [
                    'success' => false,
                    'errors' => $errors
                ];
            }

            $announcementData = $dto->toArray();
            $announcementData['user_id'] = $userId;

            $announcement = $this->announcementRepository->update($id, $announcementData);

            if (!$announcement) {
                return [
                    'success' => false,
                    'message' => 'Announcement not found or unauthorized'
                ];
            }

            return [
                'success' => true,
                'announcement' => $announcement
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function deleteAnnouncement($id, $userId) {
        try {
            $success = $this->announcementRepository->delete($id, $userId);

            if (!$success) {
                return [
                    'success' => false,
                    'message' => 'Announcement not found or unauthorized'
                ];
            }

            return [
                'success' => true,
                'message' => 'Announcement deleted successfully'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function searchAnnouncements($filters) {
        try {
            $announcements = $this->announcementRepository->search($filters);
            return [
                'success' => true,
                'announcements' => $announcements
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }
}

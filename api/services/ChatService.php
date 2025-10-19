<?php

require_once __DIR__ . '/../repositories/ChatRepository.php';
require_once __DIR__ . '/../repositories/MessageRepository.php';
require_once __DIR__ . '/../dto/MessageDTO.php';

class ChatService {
    private $chatRepository;
    private $messageRepository;

    public function __construct() {
        $this->chatRepository = new ChatRepository();
        $this->messageRepository = new MessageRepository();
    }

    public function getUserChats($userId) {
        try {
            $chats = $this->chatRepository->findByUserId($userId);

            $chatsWithLastMessage = [];
            foreach ($chats as $chat) {
                $chatArray = $chat->toArray();
                $lastMessage = $this->messageRepository->getLastMessageByChatId($chat->getId());
                $chatArray['last_message'] = $lastMessage ? $lastMessage->toArray() : null;
                $chatsWithLastMessage[] = $chatArray;
            }

            return [
                'success' => true,
                'chats' => $chatsWithLastMessage
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function getChatByAnnouncementId($announcementId, $userId) {
        try {
            $chat = $this->chatRepository->findByAnnouncementId($announcementId);

            if (!$chat) {
                return [
                    'success' => false,
                    'message' => 'Chat not found'
                ];
            }

            if (!$chat->isParticipant($userId)) {
                return [
                    'success' => false,
                    'message' => 'Unauthorized'
                ];
            }

            return [
                'success' => true,
                'chat' => $chat
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function joinChat($announcementId, $userId) {
        try {
            $chat = $this->chatRepository->findByAnnouncementId($announcementId);

            if (!$chat) {
                return [
                    'success' => false,
                    'message' => 'Chat not found'
                ];
            }

            if ($chat->isParticipant($userId)) {
                return [
                    'success' => true,
                    'chat' => $chat,
                    'message' => 'User already in chat'
                ];
            }

            $updatedChat = $this->chatRepository->addParticipant($chat->getId(), $userId);

            if (!$updatedChat) {
                return [
                    'success' => false,
                    'message' => 'Failed to join chat'
                ];
            }

            return [
                'success' => true,
                'chat' => $updatedChat
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function leaveChat($chatId, $userId) {
        try {
            $chat = $this->chatRepository->findById($chatId);

            if (!$chat) {
                return [
                    'success' => false,
                    'message' => 'Chat not found'
                ];
            }

            if (!$chat->isParticipant($userId)) {
                return [
                    'success' => false,
                    'message' => 'User not in chat'
                ];
            }

            $updatedChat = $this->chatRepository->removeParticipant($chatId, $userId);

            if (!$updatedChat) {
                return [
                    'success' => false,
                    'message' => 'Failed to leave chat'
                ];
            }

            return [
                'success' => true,
                'chat' => $updatedChat
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function getChatMessages($chatId, $userId, $limit = 50, $offset = 0) {
        try {
            $chat = $this->chatRepository->findById($chatId);

            if (!$chat) {
                return [
                    'success' => false,
                    'message' => 'Chat not found'
                ];
            }

            if (!$chat->isParticipant($userId)) {
                return [
                    'success' => false,
                    'message' => 'Unauthorized'
                ];
            }

            $messages = $this->messageRepository->findByChatId($chatId, $limit, $offset);

            return [
                'success' => true,
                'messages' => $messages,
                'chat_id' => $chatId
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }

    public function sendMessage($chatId, $data, $userId) {
        try {
            $dto = new MessageDTO($data);
            $errors = $dto->validate();

            if (!empty($errors)) {
                return [
                    'success' => false,
                    'errors' => $errors
                ];
            }

            $chat = $this->chatRepository->findById($chatId);

            if (!$chat) {
                return [
                    'success' => false,
                    'message' => 'Chat not found'
                ];
            }

            if (!$chat->isParticipant($userId)) {
                return [
                    'success' => false,
                    'message' => 'Unauthorized'
                ];
            }

            $messageData = $dto->toArray();
            $messageData['chat_id'] = $chatId;
            $messageData['sender_id'] = $userId;

            $message = $this->messageRepository->create($messageData);

            if (!$message) {
                return [
                    'success' => false,
                    'message' => 'Failed to send message'
                ];
            }

            return [
                'success' => true,
                'message' => $message
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ];
        }
    }
}

<?php

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../repositories/ChatRepository.php';
require_once __DIR__ . '/../repositories/MessageRepository.php';
require_once __DIR__ . '/../repositories/AnnouncementRepository.php';
require_once __DIR__ . '/../dto/ChatDTO.php';
require_once __DIR__ . '/../dto/MessageDTO.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Request.php';

class ChatController extends BaseController {
    private $chatRepository;
    private $messageRepository;

    public function __construct() {
        parent::__construct();
        $this->chatRepository = new ChatRepository();
        $this->messageRepository = new MessageRepository();
    }

    public function getByUserId() {
        try {
            $this->requireAuth();
            
            $userId = $this->getCurrentUserId();
            $chats = $this->chatRepository->findByUserId($userId);

            $chatsWithLastMessage = [];
            foreach ($chats as $chat) {
                $chatArray = $chat->toArray();
                $lastMessage = $this->messageRepository->getLastMessageByChatId($chat->getId());
                $chatArray['last_message'] = $lastMessage ? $lastMessage->toArray() : null;
                $chatsWithLastMessage[] = $chatArray;
            }

            return Response::success([
                'chats' => $chatsWithLastMessage,
                'count' => count($chatsWithLastMessage)
            ], 'User chats retrieved successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function getByAnnouncementId() {
        try {
            $this->requireAuth();
            
            $request = new Request();
            $announcementId = $request->get('announcementId');
            
            if (!$announcementId) {
                return Response::error('Announcement ID parameter is required', 400);
            }
            
            $chat = $this->chatRepository->findByAnnouncementId((int) $announcementId);

            if (!$chat) {
                return Response::error('Chat not found', 404);
            }

            if (!$chat->isParticipant($this->getCurrentUserId())) {
                return Response::error('Unauthorized', 403);
            }

            return Response::success([
                'chat' => $chat->toArray()
            ], 'Chat retrieved successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function joinChat() {
        try {
            $this->requireAuth();
            
            $request = new Request();
            $announcementId = $request->getBody('announcementId');
            
            if (!$announcementId) {
                return Response::error('Announcement ID parameter is required', 400);
            }
            
            $userId = $this->getCurrentUserId();
            
            $announcementRepository = new AnnouncementRepository();
            $announcement = $announcementRepository->findById((int) $announcementId);
            
            if (!$announcement) {
                return Response::error('Announcement not found', 404);
            }
            
            if ($announcement->getUserId() == $userId) {
                return Response::error('Cannot join chat for your own announcement', 400);
            }
            
            $existingChat = $this->chatRepository->findByUserIdAndAnnouncementId($userId, (int) $announcementId);
            
            if ($existingChat) {
                return Response::success([
                    'chat' => $existingChat->toArray()
                ], 'User already has a chat for this announcement');
            }
            
            $announcementAuthorId = $announcement->getUserId();
            
            $chatData = [
                'announcement_id' => (int) $announcementId,
                'participants' => [(int) $userId, (int) $announcementAuthorId]
            ];
            
            $chat = $this->chatRepository->create($chatData);
            
            if (!$chat) {
                return Response::error('Failed to create chat', 500);
            }
            
            return Response::success([
                'chat' => $chat->toArray()
            ], 'Chat created and joined successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function leaveChat() {
        try {
            $this->requireAuth();
            
            $request = new Request();
            $chatId = $request->get('chatId');
            
            if (!$chatId) {
                return Response::error('Chat ID parameter is required', 400);
            }
            
            $userId = $this->getCurrentUserId();
            $chat = $this->chatRepository->findById($chatId);

            if (!$chat) {
                return Response::error('Chat not found', 404);
            }

            if (!$chat->isParticipant($userId)) {
                return Response::error('User not in chat', 400);
            }

            $updatedChat = $this->chatRepository->removeParticipant($chatId, $userId);

            if (!$updatedChat) {
                return Response::error('Failed to leave chat', 500);
            }

            return Response::success([
                'chat' => $updatedChat->toArray()
            ], 'Successfully left chat');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function getMessages() {
        try {
            $this->requireAuth();
            
            $request = new Request();
            $chatId = $request->get('chatId');
            
            if (!$chatId) {
                return Response::error('Chat ID parameter is required', 400);
            }
            
            $chat = $this->chatRepository->findById($chatId);

            if (!$chat) {
                return Response::error('Chat not found', 404);
            }

            if (!$chat->isParticipant($this->getCurrentUserId())) {
                return Response::error('Unauthorized', 403);
            }

            $limit = $request->get('limit', 50);
            $offset = $request->get('offset', 0);

            $messages = $this->messageRepository->findByChatId($chatId, $limit, $offset);
            $messagesArray = array_map(function($message) {
                return $message->toArray();
            }, $messages);

            return Response::success([
                'messages' => $messagesArray,
                'chat_id' => $chatId,
                'count' => count($messagesArray)
            ], 'Messages retrieved successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function sendMessage() {
        try {
            $this->requireAuth();
            
            $request = new Request();
            $data = $request->getBody();
            $chatId = $request->getBody('chatId');
            
            if (!$chatId) {
                return Response::error('Chat ID parameter is required', 400);
            }

            $data['sender_id'] = $this->getCurrentUserId();
            
            $dto = new MessageDTO($data);
            $errors = $dto->validate();

            if (!empty($errors)) {
                return Response::error('Validation failed', 400, $errors);
            }

            $chat = $this->chatRepository->findById($chatId);

            if (!$chat) {
                return Response::error('Chat not found', 404);
            }

            if (!$chat->isParticipant($this->getCurrentUserId())) {
                return Response::error('Unauthorized', 403);
            }

            $messageData = $dto->toArray();
            $messageData['chat_id'] = $chatId;

            $message = $this->messageRepository->create($messageData);

            if (!$message) {
                return Response::error('Failed to send message', 500);
            }

            return Response::success([
                'message' => $message->toArray()
            ], 'Message sent successfully', 201);

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }
}

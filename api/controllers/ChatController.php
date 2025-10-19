<?php

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../repositories/ChatRepository.php';
require_once __DIR__ . '/../repositories/MessageRepository.php';
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

            return Response::success('User chats retrieved successfully', [
                'chats' => $chatsWithLastMessage,
                'count' => count($chatsWithLastMessage)
            ]);

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
            
            $chat = $this->chatRepository->findByAnnouncementId($announcementId);

            if (!$chat) {
                return Response::error('Chat not found', 404);
            }

            if (!$chat->isParticipant($this->getCurrentUserId())) {
                return Response::error('Unauthorized', 403);
            }

            return Response::success('Chat retrieved successfully', [
                'chat' => $chat->toArray()
            ]);

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function joinChat() {
        try {
            $this->requireAuth();
            
            $request = new Request();
            $announcementId = $request->get('announcementId');
            
            if (!$announcementId) {
                return Response::error('Announcement ID parameter is required', 400);
            }
            
            $userId = $this->getCurrentUserId();
            $chat = $this->chatRepository->findByAnnouncementId($announcementId);

            if (!$chat) {
                return Response::error('Chat not found', 404);
            }

            if ($chat->isParticipant($userId)) {
                return Response::success('User already in chat', [
                    'chat' => $chat->toArray()
                ]);
            }

            $updatedChat = $this->chatRepository->addParticipant($chat->getId(), $userId);

            if (!$updatedChat) {
                return Response::error('Failed to join chat', 500);
            }

            return Response::success('Successfully joined chat', [
                'chat' => $updatedChat->toArray()
            ]);

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

            return Response::success('Successfully left chat', [
                'chat' => $updatedChat->toArray()
            ]);

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

            $limit = $request->getQuery('limit', 50);
            $offset = $request->getQuery('offset', 0);

            $messages = $this->messageRepository->findByChatId($chatId, $limit, $offset);
            $messagesArray = array_map(function($message) {
                return $message->toArray();
            }, $messages);

            return Response::success('Messages retrieved successfully', [
                'messages' => $messagesArray,
                'chat_id' => $chatId,
                'count' => count($messagesArray)
            ]);

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function sendMessage() {
        try {
            $this->requireAuth();
            
            $request = new Request();
            $data = $request->getBody();
            $chatId = $request->get('chatId');
            
            if (!$chatId) {
                return Response::error('Chat ID parameter is required', 400);
            }

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
            $messageData['sender_id'] = $this->getCurrentUserId();

            $message = $this->messageRepository->create($messageData);

            if (!$message) {
                return Response::error('Failed to send message', 500);
            }

            return Response::success('Message sent successfully', [
                'message' => $message->toArray()
            ], 201);

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }
}

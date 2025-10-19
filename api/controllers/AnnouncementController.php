<?php

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../repositories/AnnouncementRepository.php';
require_once __DIR__ . '/../dto/AnnouncementDTO.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Request.php';
require_once __DIR__ . '/../exceptions/DatabaseException.php';
require_once __DIR__ . '/../exceptions/ValidationException.php';

class AnnouncementController extends BaseController {
    private $announcementRepository;

    public function __construct() {
        parent::__construct();
        $this->announcementRepository = new AnnouncementRepository();
    }

    public function create() {
        try {
            $this->requireAuth();
            
            if (!Request::isPost()) {
                return Response::error('Invalid request method', 405);
            }

            $data = Request::getJsonInput();

            $dto = new AnnouncementDTO($data);
            $errors = $dto->validate();

            if (!empty($errors)) {
                return Response::error('Validation failed', 400, $errors);
            }

            $announcementData = $dto->toArray();
            $announcementData['user_id'] = $this->getCurrentUserId();

            $announcement = $this->announcementRepository->create($announcementData);

            if (!$announcement) {
                return Response::error('Failed to create announcement', 500);
            }

            return Response::success([
                'announcement' => $announcement->toArray()
            ], 'Announcement created successfully', 201);

        } catch (ValidationException $e) {
            return Response::error($e->getMessage(), 400, $e->getErrors());
        } catch (DatabaseException $e) {
            return Response::error('Database error: ' . $e->getMessage(), 500);
        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function getAll() {
        try {
            $limit = Request::get('limit', 50);
            $offset = Request::get('offset', 0);

            $announcements = $this->announcementRepository->findAll($limit, $offset);
            $announcementsArray = array_map(function($announcement) {
                return $announcement->toArray();
            }, $announcements);

            return Response::success([
                'announcements' => $announcementsArray,
                'count' => count($announcementsArray)
            ], 'Announcements retrieved successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function getById() {
        try {
            $id = Request::get('id');
            
            if (!$id) {
                return Response::error('ID parameter is required', 400);
            }
            
            $announcement = $this->announcementRepository->findById($id);

            if (!$announcement) {
                return Response::error('Announcement not found', 404);
            }

            return Response::success([
                'announcement' => $announcement->toArray()
            ], 'Announcement retrieved successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function getByUserId() {
        try {
            $this->requireAuth();
            
            $userId = $this->getCurrentUserId();
            
            if (!$userId) {
                return Response::error('User ID not found in session', 400);
            }

            $announcements = $this->announcementRepository->findByUserId($userId);
            $announcementsArray = array_map(function($announcement) {
                return $announcement->toArray();
            }, $announcements);

            return Response::success([
                'announcements' => $announcementsArray,
                'count' => count($announcementsArray)
            ], 'User announcements retrieved successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function update() {
        try {
            $this->requireAuth();
            
            if (!Request::isPut()) {
                return Response::error('Invalid request method', 405);
            }
            
            $id = Request::get('id');
            $data = Request::getJsonInput();

            if (!$id) {
                return Response::error('ID parameter is required', 400);
            }

            $dto = new AnnouncementDTO($data);
            $errors = $dto->validate();

            if (!empty($errors)) {
                return Response::error('Validation failed', 400, $errors);
            }

            $announcementData = $dto->toArray();
            $announcementData['user_id'] = $this->getCurrentUserId();

            $announcement = $this->announcementRepository->update($id, $announcementData);

            if (!$announcement) {
                return Response::error('Announcement not found or unauthorized', 404);
            }

            return Response::success([
                'announcement' => $announcement->toArray()
            ], 'Announcement updated successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function delete() {
        try {
            $this->requireAuth();
            
            if (!Request::isDelete()) {
                return Response::error('Invalid request method', 405);
            }
            
            $id = Request::get('id');
            
            if (!$id) {
                return Response::error('ID parameter is required', 400);
            }
            
            $userId = $this->getCurrentUserId();
            $success = $this->announcementRepository->delete($id, $userId);

            if (!$success) {
                return Response::error('Announcement not found or unauthorized', 404);
            }

            return Response::success(null, 'Announcement deleted successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }

    public function search() {
        try {
            $filters = [
                'categories' => Request::get('categories'),
                'tags' => Request::get('tags'),
                'search' => Request::get('search'),
                'limit' => Request::get('limit', 50),
                'offset' => Request::get('offset', 0)
            ];

            // Remove empty filters
            $filters = array_filter($filters, function($value) {
                return !empty($value);
            });

            $announcements = $this->announcementRepository->search($filters);
            $announcementsArray = array_map(function($announcement) {
                return $announcement->toArray();
            }, $announcements);

            return Response::success([
                'announcements' => $announcementsArray,
                'count' => count($announcementsArray),
                'filters' => $filters
            ], 'Search results retrieved successfully');

        } catch (Exception $e) {
            return Response::error('Internal server error: ' . $e->getMessage(), 500);
        }
    }
}

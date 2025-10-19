<?php

require_once __DIR__ . '/../config/database.php';
require_once UTILS_PATH . 'Response.php';
require_once UTILS_PATH . 'Request.php';

abstract class BaseController {
    
    protected $db;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }
    
    protected function requireAuth() {
        if (!isset($_SESSION['user_id'])) {
            Response::error('Authentication required', 401);
            exit;
        }
    }
    
    protected function getCurrentUserId() {
        return $_SESSION['user_id'] ?? null;
    }
}

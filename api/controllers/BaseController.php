<?php

require_once UTILS_PATH . 'Response.php';
require_once UTILS_PATH . 'Request.php';

abstract class BaseController {
    
    protected $db;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }
}

<?php

require_once CONTROLLERS_PATH . 'BaseController.php';
require_once SERVICES_PATH . 'EmailService.php';

class Contact extends BaseController {
    private $emailService;
    
    public function __construct() {
        parent::__construct();
        $this->emailService = new EmailService();
    }
    
    public function send() {
        try {
            $name = Request::getBody('name');
            $email = Request::getBody('email');
            $subject = Request::getBody('subject');
            $message = Request::getBody('message');
            
            if (empty($name) || empty($email) || empty($subject) || empty($message)) {
                Response::error('All fields are required', 400);
                return;
            }
            
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                Response::error('Invalid email format', 400);
                return;
            }

            $contactData = [
                'name' => $name,
                'email' => $email,
                'subject' => $subject,
                'message' => $message,
                'timestamp' => date('Y-m-d H:i:s')
            ];

            $emailSent = $this->emailService->sendContactEmail($contactData);
            
            if ($emailSent) {
                Response::success('Message sent successfully');
            } else {
                Response::serverError('Failed to send message');
            }
            
        } catch (Exception $e) {
            $this->logError('send', $e->getMessage(), [
                'name' => Request::post('name'),
                'email' => Request::post('email'),
                'subject' => Request::post('subject')
            ]);
            Response::serverError('Internal server error: ' . $e->getMessage());
        }
    }
    
    private function logError($method, $error, $context = []) {
        error_log("ContactController::{$method} - Error: {$error} - Context: " . json_encode($context));
    }
}

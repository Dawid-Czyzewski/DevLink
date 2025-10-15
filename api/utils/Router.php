<?php

require_once UTILS_PATH . 'Request.php';
require_once UTILS_PATH . 'Response.php';

class Router {
    private $controller;
    private $action;
    private $params;
    
    public function __construct() {
        $this->parseRequest();
    }
    
    private function parseRequest() {
        $this->controller = Request::get('controller', 'index');
        $this->action = Request::get('action', 'index');
        $this->params = array_merge(Request::get(), Request::post());
        
        unset($this->params['controller']);
        unset($this->params['action']);
    }
    
    public function route() {
        try {
            $controllerClass = $this->toCamelCase($this->controller);
            $controllerFile = CONTROLLERS_PATH . $controllerClass . '.php';
            
            if (!file_exists($controllerFile)) {
                Response::notFound('Controller not found: ' . $controllerClass);
            }
            
            require_once $controllerFile;
            
            if (!class_exists($controllerClass)) {
                Response::notFound('Controller class not found: ' . $controllerClass);
            }
            
            $controller = new $controllerClass();
            
            $actionMethod = $this->action;
            
            if (!method_exists($controller, $actionMethod)) {
                Response::notFound('Action not found: ' . $actionMethod);
            }
            
            call_user_func([$controller, $actionMethod]);
            
        } catch (Exception $e) {
            Response::serverError('Internal server error: ' . $e->getMessage());
        }
    }
    
    private function toCamelCase($string) {
        return ucfirst($string);
    }
    
    public function getController() {
        return $this->controller;
    }
    
    public function getAction() {
        return $this->action;
    }
    
    public function getParams() {
        return $this->params;
    }
}

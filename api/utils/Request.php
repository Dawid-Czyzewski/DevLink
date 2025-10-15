<?php

class Request {
    
    public static function get($key = null, $default = null) {
        if ($key === null) {
            return $_GET;
        }
        return isset($_GET[$key]) ? $_GET[$key] : $default;
    }
    
    public static function post($key = null, $default = null) {
        if ($key === null) {
            return $_POST;
        }
        return isset($_POST[$key]) ? $_POST[$key] : $default;
    }
    
    public static function getJsonInput() {
        $input = file_get_contents('php://input');
        return json_decode($input, true);
    }
    
    public static function getMethod() {
        return $_SERVER['REQUEST_METHOD'];
    }
    
    public static function isPost() {
        return self::getMethod() === 'POST';
    }
    
    public static function isGet() {
        return self::getMethod() === 'GET';
    }
    
    public static function isPut() {
        return self::getMethod() === 'PUT';
    }
    
    public static function isDelete() {
        return self::getMethod() === 'DELETE';
    }
    
    public static function getHeaders() {
        return getallheaders();
    }
    
    public static function getHeader($name) {
        $headers = self::getHeaders();
        return isset($headers[$name]) ? $headers[$name] : null;
    }
}

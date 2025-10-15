<?php

class ValidationException extends Exception {
    private $errors;

    public function __construct($errors, $messsage = 'Validation failed') {
        parent::__construct($messsage);
        $this->errors = $errors;
    }

    public function getErrors() {
        return $this->errors;
    }
}

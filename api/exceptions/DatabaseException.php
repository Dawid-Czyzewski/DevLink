<?php

class DatabaseException extends Exception {
    public function __construct($message = 'Database error') {
        parent::__construct($message);
    }
}

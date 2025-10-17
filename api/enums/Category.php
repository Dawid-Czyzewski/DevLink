<?php

class Category {
    const FRONTEND = 'frontend';
    const BACKEND = 'backend';
    const FULLSTACK = 'fullstack';
    const UXUI = 'uxui';
    const PM = 'pm';
    
    private static $validCategories = [
        self::FRONTEND,
        self::BACKEND,
        self::FULLSTACK,
        self::UXUI,
        self::PM
    ];
    
    private static $labels = [
        self::FRONTEND => 'Frontend',
        self::BACKEND => 'Backend',
        self::FULLSTACK => 'Fullstack',
        self::UXUI => 'UX/UI',
        self::PM => 'Product Manager'
    ];
    
    public static function isValid($category) {
        return in_array($category, self::$validCategories);
    }
    
    public static function getValidCategories() {
        return self::$validCategories;
    }
    
    public static function getLabel($category) {
        return self::$labels[$category] ?? null;
    }
    
    public static function getAllLabels() {
        return self::$labels;
    }
}

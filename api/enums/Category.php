<?php

class Category {
    const FRONTEND = 'frontend';
    const BACKEND = 'backend';
    const FULLSTACK = 'fullstack';
    const UXUI = 'uxui';
    const PM = 'pm';
    const MOBILE = 'mobile';
    const GAMEDEV = 'gamedev';
    
    private static $validCategories = [
        self::FRONTEND,
        self::BACKEND,
        self::FULLSTACK,
        self::UXUI,
        self::PM,
        self::MOBILE,
        self::GAMEDEV
    ];
    
    private static $labels = [
        self::FRONTEND => 'Frontend',
        self::BACKEND => 'Backend',
        self::FULLSTACK => 'Fullstack',
        self::UXUI => 'UX/UI',
        self::PM => 'Project Manager',
        self::MOBILE => 'Mobile',
        self::GAMEDEV => 'Game Dev'
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

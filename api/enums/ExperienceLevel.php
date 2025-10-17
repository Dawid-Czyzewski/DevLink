<?php

class ExperienceLevel {
    const JUNIOR = 'junior';
    const MID = 'mid';
    const SENIOR = 'senior';
    
    private static $validLevels = [
        self::JUNIOR,
        self::MID,
        self::SENIOR
    ];
    
    private static $labels = [
        self::JUNIOR => 'Junior',
        self::MID => 'Mid',
        self::SENIOR => 'Senior'
    ];
    
    public static function isValid($level) {
        return in_array($level, self::$validLevels);
    }
    
    public static function getValidLevels() {
        return self::$validLevels;
    }
    
    public static function getLabel($level) {
        return self::$labels[$level] ?? null;
    }
    
    public static function getAllLabels() {
        return self::$labels;
    }
}

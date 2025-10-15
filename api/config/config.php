<?php

if (php_sapi_name() !== 'cli') {
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization');

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		http_response_code(200);
		exit();
	}

	header('Content-Type: application/json');
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/database.php';

define('BASE_PATH', __DIR__ . '/../');
define('CONTROLLERS_PATH', BASE_PATH . 'controllers/');
define('MODELS_PATH', BASE_PATH . 'models/');
define('UTILS_PATH', BASE_PATH . 'utils/');
define('SERVICES_PATH', BASE_PATH . 'services/');
define('REPOSITORIES_PATH', BASE_PATH . 'repositories/');
define('DTO_PATH', BASE_PATH . 'dto/');
define('VALIDATORS_PATH', BASE_PATH . 'validators/');
define('EXCEPTIONS_PATH', BASE_PATH . 'exceptions/');
define('INTERFACES_PATH', BASE_PATH . 'interfaces/');
define('CONFIG_PATH', BASE_PATH . 'config/');
define('EMAIL_TEMPLATES_PATH', BASE_PATH . 'emailTemplates/');

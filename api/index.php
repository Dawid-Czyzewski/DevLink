<?php

require_once __DIR__ . '/config/config.php';
require_once UTILS_PATH . 'Router.php';

$router = new Router();
$router->route();

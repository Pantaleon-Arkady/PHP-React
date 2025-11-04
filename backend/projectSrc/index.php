<?php

require __DIR__ . '/vendor/autoload.php';

$uri = strtok($_SERVER["REQUEST_URI"], '?');

switch ($uri) {
    case '/trials':
        include_once __DIR__ . '/src/trials.php';
        break;
    default:
        http_response_code(404);
        echo "404 Not Found";
        break;
}
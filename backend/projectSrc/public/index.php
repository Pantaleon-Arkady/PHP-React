<?php

require __DIR__ . '/../vendor/autoload.php';

$uri = rtrim(strtok($_SERVER["REQUEST_URI"], '?'), '/');

use Root\Controllers\General;

$general = new General();

switch ($uri) {
    case '/trials':
        $general->usersDisplay();
        break;

    case '':
    case '/':
        echo "Home Page<br>";
        break;

    default:
        http_response_code(404);
        echo "404 Not Found — URI: $uri";
        break;
}

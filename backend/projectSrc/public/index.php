<?php

require __DIR__ . '/../vendor/autoload.php';

$uri = rtrim(strtok($_SERVER["REQUEST_URI"], '?'), '/');
echo "Current URI: $uri<br>";

switch ($uri) {
    case '/trials':
        echo "Including trials.php<br>";
        include_once __DIR__ . '/../src/trials.php';
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

<?php

require __DIR__ . '/../vendor/autoload.php';

$uri = rtrim(strtok($_SERVER["REQUEST_URI"], '?'), '/');

use Root\Controllers\General;
use Root\Controllers\APIData;

$general = new General();
$api = new APIData();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $api->handlePreflight();
}

switch ($uri) {
    case '/trials':
        $general->usersDisplay();
        break;

    case '/pr-users':
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $api->createUser();
        } else {
            echo json_encode(["success" => false, "error" => "Method not allowed"]);
        }
        break;
    case '/pr-users/login':
        $api->logInUser();
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

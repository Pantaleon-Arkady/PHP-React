<?php

require __DIR__ . '/../vendor/autoload.php';

$uri = rtrim(strtok($_SERVER["REQUEST_URI"], '?'), '/');

use Root\Controllers\General;
use Root\Controllers\APIData;

$general = new General();
$api = new APIData();

$error = json_encode(["success" => false, "error" => "Method not allowed"]);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $api->handlePreflight();
}

switch ($uri) {
    case '/trials':
        $general->usersDisplay();
        break;

    // Users

    case '/pr-users':
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $api->createUser();
        } else {
            echo $error;
        }
        break;
    case '/pr-users/login':
        $api->logInUser();
        break;

    // Posts

    case '/posts':
        if ($_SERVER['REQUEST_METHOD'] == "GET") {
            $api->allData();
        } elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
            $api->createPost();
        } elseif ($_SERVER["REQUEST_METHOD"] == "DELETE") {
            $api->deletePost();
        } elseif ($_SERVER["REQUEST_METHOD"] == "PUT") {
            $api->updatePost();
        } else {
            echo $error;
        }
        break;

    // Post interaction

    case '/posts-like':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $api->likePost();
        } else {
            echo $error;
        }
        break;

    case '/posts-dislike':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $api->dislikePost();
        } else {
            echo $error;
        }
        break;

        // Defaults

    case '':
    case '/':
        echo "Home Page<br>";
        break;

    default:
        http_response_code(404);
        echo "404 Not Found — URI: $uri";
        break;
}

<?php

namespace Root\Controllers;

use Exception;
use Root\Database\Database;

class APIData
{
    private function addHeaders(string $mode = "full")
    {
        if ($mode === "full") {
            header("Access-Control-Allow-Origin: http://localhost:5173");
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type");
            header("Content-Type: application/json");
        }

        if ($mode === "jsonOnly") {
            header("Content-Type: application/json");
        }
    }

    public function handlePreflight()
    {
        $this->addHeaders("full");
        http_response_code(200);
        exit;
    }

    private function getTableFromUri(): string
    {
        $uri = $_SERVER['REQUEST_URI'];

        if (strpos($uri, 'pr-users') !== false) {
            return 'app_user';
        } elseif (strpos($uri, 'reminders') !== false) {
            return 'api_reminders';
        } else {
            throw new Exception("Unknown resource type");
        }
    }

    public function createUser()
    {
        $this->addHeaders("full");

        try {
            $table = $this->getTableFromUri();
            $data = json_decode(file_get_contents('php://input'), true);

            if (empty($data)) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "error" => "Please complete the details"
                ]);
                return;
            }

            Database::crudQuery(
                "INSERT INTO {$table} 
                (email, username, password) 
                VALUES (:email, :username, :password)",
                [
                    'email' => $data['email'],
                    'username' => $data['username'],
                    'password' => md5($data['password'])
                ]
            );

            echo json_encode([
                'post' => $data,
                'method' => $_SERVER['REQUEST_METHOD']
            ]);
        } catch (\Exception $e){
            echo json_encode([
                'error' => $e->getMessage()
            ]);
        }
    }

}
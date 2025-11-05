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

        if (strpos($uri, 'users') !== false) {
            return 'app_users';
        } elseif (strpos($uri, 'reminders') !== false) {
            return 'api_reminders';
        } else {
            throw new Exception("Unknown resource type");
        }
    }

    // public function createData()
    // {
    //     $this->addHeaders("full");

    //     try {
    //         $table = $this->getTableFromUri();
    //         $input = json_decode(file_get_contents("php://input"), true);

    //         if (empty($input['task'])) {
    //             http_response_code(400);
    //             echo json_encode([
    //                 "success" => false,
    //                 "error" => "Task field is required"
    //             ]);
    //             return;
    //         }

    //         Database::crudQuery(
    //             "INSERT INTO {$table} (task) VALUES (:task)",
    //             ['task' => $input['task']]
    //         );

    //         $newId = Database::lastInsertId("{$table}_id_seq");
    //         error_log("lastInsertId returned: " . $newId);

    //         $newTask = Database::fetchAssoc(
    //             "SELECT * FROM {$table} WHERE id = :id",
    //             ['id' => $newId]
    //         );
    //         error_log("Fetched new task: " . json_encode($newTask));

    //         echo json_encode([
    //             "success" => true,
    //             "data" => $newTask
    //         ]);
    //     } catch (\Exception $e) {
    //         http_response_code(500);
    //         echo json_encode([
    //             "success" => false,
    //             "error" => $e->getMessage()
    //         ]);
    //     }
    // }

    public function createUser()
    {
        $this->addHeaders("full");

        $data = file_get_contents('php://input');

        echo json_encode([
            'post' => json_decode($data, true),
            'method' => $_SERVER['REQUEST_METHOD']
        ]);
    }

}
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

    // public function eventError($e)
    // {
    //     http_response_code(500);
    //     echo json_encode([
    //         'success' => false,
    //         'error' => $e->getMessage()
    //     ]);
    // }

    private function getTableFromUri(): string
    {
        $uri = $_SERVER['REQUEST_URI'];

        if (strpos($uri, 'pr-users') !== false) {
            return 'app_user';
        } elseif (strpos($uri, 'posts') !== false) {
            return 'app_user_posts';
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
        } catch (\Exception $e) {
            echo json_encode([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function logInUser()
    {
        $this->addHeaders("full");

        try {
            $table = $this->getTableFromUri();
            $data = json_decode(file_get_contents('php://input'), true);

            $user = Database::fetchAssoc(
                "SELECT * FROM {$table} WHERE (email = :namemail OR username = :namemail) AND password = :password",
                [
                    'namemail' => $data['namemail'],
                    'password' => md5($data['password'])
                ]
            );

            if ($user && count($user) > 0) {
                echo json_encode([
                    'login' => true,
                    'user' => $user[0] ?? $user, // if it's an array of rows
                ]);
            } else {
                echo json_encode([
                    'login' => false,
                    'error' => 'Invalid username or password'
                ]);
            }
        } catch (\Exception $e) {
            echo json_encode([
                'error' => $e->getMessage(),
                'login' => false
            ]);
        }
    }

    public function allData()
    {
        $this->addHeaders("full");

        try {
            $table = $this->getTableFromUri();

            $rows = Database::fetchAll("SELECT * FROM {$table} ORDER BY id DESC");

            echo json_encode([
                'success' => true,
                'data' => $rows
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    public function retrieveAllPost()
    {
        $this->addHeaders("full");
        try {
            $allPosts = Database::fetchAll(
                'SELECT 
                p.id,
                p.title,
                p.content,
                p.like_count,
                p.dislike_count,
                p.created_at,
                u.id AS author_id,
                u.username AS author_name
            FROM app_user_posts p
            LEFT JOIN app_user u ON p.author = u.id
            ORDER BY p.id DESC'
            );

            foreach ($allPosts as &$eachPost) {
                $eachPost['comments'] = Database::fetchAll(
                    'SELECT
                    c.id,
                    c.comment,
                    c.created_at,
                    u.id AS author_id,
                    u.username AS author_name
                FROM app_user_comments c
                LEFT JOIN app_user u ON c.author = u.id
                WHERE c.post_id = :post_id
                ORDER BY c.id DESC',
                    [':post_id' => $eachPost['id']]
                );
            }
            unset($eachPost);

            echo json_encode([
                'success' => true,
                'data'    => $allPosts
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => $e->getMessage()
            ]);
        }
    }

    public function createPost()
    {

        $this->addHeaders("full");

        try {
            $input = json_decode(file_get_contents("php://input"), true);

            if (empty($input['title']) && empty($input['content'])) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "error" => "Please fill up all the input field"
                ]);
                return;
            }

            Database::crudQuery(
                "INSERT INTO app_user_posts (author, title, content, created_at) VALUES (:author, :title, :content, :created_at)",
                [
                    'author' => 1,
                    'title' => $input['title'],
                    'content' => $input['content'],
                    'created_at' => date('Y-m-d H:i:s')
                ]
            );

            $newId = Database::lastInsertId("app_user_posts_id_seq");
            error_log("lastInsertId returned: " . $newId);

            $newPost = Database::fetchAssoc(
                "SELECT * FROM app_user_posts WHERE id = :id",
                ['id' => $newId]
            );
            error_log("Fetched new post: " . json_encode($newPost));

            echo json_encode([
                "success" => true,
                "data" => $newPost
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    public function updatePost()
    {
        $this->addHeaders("full");

        try {
            $input = json_decode(file_get_contents("php://input"), true);

            if (empty($input['id']) || empty($input['title']) || empty($input['content'])) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "error" => "Missing required fields: id, title, content"
                ]);
                return;
            }

            $existing = Database::fetchAssoc(
                "SELECT * FROM app_user_posts WHERE id = :id",
                ['id' => $input['id']]
            );

            if (!$existing) {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "error" => "Post not found"
                ]);
                return;
            }

            Database::crudQuery(
                "UPDATE app_user_posts 
             SET title = :title, content = :content 
             WHERE id = :id",
                [
                    'id' => $input['id'],
                    'title' => $input['title'],
                    'content' => $input['content']
                ]
            );

            $updated = Database::fetchAssoc(
                "SELECT * FROM app_user_posts WHERE id = :id",
                ['id' => $input['id']]
            );

            echo json_encode([
                "success" => true,
                "data" => $updated
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }


    public function deletePost()
    {
        $this->addHeaders("full");

        try {
            if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
                http_response_code(405);
                echo json_encode(["success" => false, "error" => "Method not allowed"]);
            }

            parse_str($_SERVER["QUERY_STRING"] ?? '', $query);
            $postId = (int) $query['id'] ?? 0;

            if ($postId <= 0) {
                http_response_code(400);
                echo json_encode(["success" => false, "error" => "ID is required"]);
                exit;
            }

            $sql = Database::crudQuery(
                "DELETE FROM app_user_posts WHERE id = :id",
                ['id' => $postId]
            );

            if ($sql->rowCount() > 0) {
                echo json_encode([
                    "success" => true,
                    "message" => ucfirst("app_user_posts") . " entry deleted"
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "error" => "Entry not found"
                ]);
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    public function likePost()
    {
        $this->addHeaders("full");

        $input = json_decode(file_get_contents("php://input"), true);

        if (empty($input['post']) || empty($input['author'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing post or author']);
            return;
        }

        $postId = (int)$input['post'];
        $authorId = (int)$input['author'];

        try {
            $existing = Database::fetchAssoc(
                "SELECT id FROM app_user_likes WHERE post = :post AND author = :author",
                ['post' => $postId, 'author' => $authorId]
            );

            if ($existing) {
                Database::crudQuery(
                    "DELETE FROM app_user_likes WHERE post = :post AND author = :author",
                    ['post' => $postId, 'author' => $authorId]
                );

                Database::crudQuery(
                    "UPDATE app_user_posts SET like_count = like_count - 1 WHERE id = :id AND like_count > 0",
                    ['id' => $postId]
                );

                echo json_encode([
                    'success' => true,
                    'action' => 'unliked',
                    'post_id' => $postId
                ]);
            } else {
                Database::crudQuery(
                    "INSERT INTO app_user_likes (post, author) VALUES (:post, :author)",
                    ['post' => $postId, 'author' => $authorId]
                );

                Database::crudQuery(
                    "UPDATE app_user_posts SET like_count = like_count + 1 WHERE id = :id",
                    ['id' => $postId]
                );

                echo json_encode([
                    'success' => true,
                    'action' => 'liked',
                    'post_id' => $postId
                ]);
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function dislikePost()
    {
        $this->addHeaders("full");

        $input = json_decode(file_get_contents("php://input"), true);

        if (empty($input['post']) || empty($input['author'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing post or author']);
            return;
        }

        $postId = (int)$input['post'];
        $authorId = (int)$input['author'];

        try {
            $existing = Database::fetchAssoc(
                "SELECT id FROM app_user_dislikes WHERE post = :post AND author = :author",
                ['post' => $postId, 'author' => $authorId]
            );

            if ($existing) {
                Database::crudQuery(
                    "DELETE FROM app_user_dislikes WHERE post = :post AND author = :author",
                    ['post' => $postId, 'author' => $authorId]
                );

                Database::crudQuery(
                    "UPDATE app_user_posts SET dislike_count = dislike_count - 1 WHERE id = :id AND dislike_count > 0",
                    ['id' => $postId]
                );

                echo json_encode([
                    'success' => true,
                    'action' => 'unliked',
                    'post_id' => $postId
                ]);
            } else {
                Database::crudQuery(
                    "INSERT INTO app_user_dislikes (post, author) VALUES (:post, :author)",
                    ['post' => $postId, 'author' => $authorId]
                );

                Database::crudQuery(
                    "UPDATE app_user_posts SET dislike_count = dislike_count + 1 WHERE id = :id",
                    ['id' => $postId]
                );

                echo json_encode([
                    'success' => true,
                    'action' => 'disliked',
                    'post_id' => $postId
                ]);
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}

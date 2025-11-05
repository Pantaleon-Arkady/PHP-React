<?php

namespace Root\Controllers;

use Root\Database\Database;

class General
{

    private $connection;

    public function __construct()
    {
        $this->connection = Database::getConnection();
    }

    public static function fastPrint($array)
    {
        echo '<pre>';
        print_r($array);
        echo '</pre>';
    }

    public function usersDisplay()
    {

        $q = Database::fetchAll(
            'SELECT * FROM app_user' 
        );

        $this->fastPrint($q);

        include_once __DIR__ . '/../trials.php';
    }
}

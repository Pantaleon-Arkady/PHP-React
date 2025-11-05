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

    public function usersDisplay()
    {

        

        include_once __DIR__ . '/../trials.php';
    }
}

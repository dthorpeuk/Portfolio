<?php

require_once 'vendor/autoload.php';//realpath(__DIR__ . "/vendor/autoload.php");
use Dotenv\Dotenv;
$dotenv =  Dotenv::createImmutable(__DIR__);//Dotenv::createImmutable(__DIR__);
$dotenv->load(); 

?>
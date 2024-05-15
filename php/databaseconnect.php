<?php

$real = realpath('../envloader.php');
//echo "<script>console.log('". 1 . $real . 1 ."');</script>";
if($real == ""){
    include 'envloader.php';
}
else{
    include '../envloader.php';
}
$host = $_ENV['MySQL_DB_HOST'];
$dbname = $_ENV['MySQL_DB_NAME'];
$username = $_ENV['MySQL_DB_USER_NAME'];
$password = $_ENV['MySQL_DB_PASSWORD'];

$conn = NULL;
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<script>console.log('Connected successfully')</script>";
  } catch(PDOException $e) {
    echo "<script>console.log('Connection failed: " . $e->getMessage() . "')</script>";
    
  }

  // $query = "SELECT * FROM news_item ORDER BY date DESC";
  // $res = $conn->query($query);

?>
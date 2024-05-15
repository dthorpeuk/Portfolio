<?php 
      //  include 'databaseconnect.php';
      //  require 'databaseconnect.php';
 //       include '../pdoconfig.php';
//require_once '../pdoconfig.php';

//try {
  //  $conn = new PDO("mysql:host=$host;dbname=$dbname", $username);
    // set the PDO error mode to exception
  //  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //  echo "Connected successfully";
 // } catch(PDOException $e) {
  //  echo "Connection failed: " . $e->getMessage();
 // }
    $name = $company = $email = $telephone = $message = "";
    $isValid = false;
    $opt_in = 0;
    if($_SERVER["REQUEST_METHOD"] == "POST"){
       $isValid = validate();
    }


    function formatInput($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    function validate(){
        $fname = formatInput($_POST["fname"]);
        $lname = formatInput($_POST["lname"]);
        $email = formatInput($_POST["email"]);
        $subject = formatInput($_POST["subject"]);
        $message = formatInput($_POST["message"]);
      

        $error_message = "";
        $error_message .= stringValidation($fname,"First Name");
        $error_message .= stringValidation($lname,"Last Name");
        //$error_message .= stringValidation($company,"Company");
        $error_message .= emailValidation($email);
         
        echo $error_message;
        if($error_message===""){
          //  $query = "INSERT INTO message_item (first_name,last_name,email,subject,message) VALUES ('" . $fname . "','" . $lname . "','" . $email . "','" . $subject . "','" . $message . "')";
          //  $res = $lconn->exec($query);
            echo "Your message has been sent!";
            return true;
        }
        return false;

    }

    function stringValidation($v,$n){
        $reg = "#^[a-zA-Z\s]*$#"; //"#^[a-zA-Z\\s]+#";//"#^([A-Z][a-z]+)(?:\s[A-Z][a-z]+)*$#";
        if(preg_match($reg,$v)){
            return "";
        }
        else{
            return $n . " needs to only include letters" . "<br>";
        }
    }
    function emailValidation($v){
        $reg = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^";
        if(preg_match($reg,$v)){
            return "";
        }
        else{
            return "Email is invalid" . "<br>";
        }
    }
?>
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

//require __DIR__ . '/vendor/autoload.php';
require_once '../vendor/autoload.php';
require 'formValidation.php';
// passing true in constructor enables exceptions in PHPMailer
$mail = new PHPMailer(true);
if($isValid){


try {
    // Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;//SMTP::DEBUG_SERVER; // for detailed debug output
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->Username = 'dthorpeuk100@googlemail.com'; // actual gmail account
    $mail->Password = 'hfhl ghet fblm lzhr'; // App password
    //Relevent inputs
    $fname = formatInput($_POST["fname"]);
    $lname = formatInput($_POST["lname"]);
    $email = formatInput($_POST["email"]);
    $subject = formatInput($_POST["subject"]);
    $message = formatInput($_POST["message"]);

    // Sender and recipient settings
    $mail->setFrom($email , 'Homepage');
    $mail->addAddress('dthorpeuk100@hotmail.com', 'Daniel Thorpe');
    $mail->addReplyTo($email , $fname . " " . $lname ); // to set the reply to

    // Setting the email content
    $mail->IsHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->AltBody = $message;

    $mail->send();
    //echo "Email message sent.";
} catch (Exception $e) {
   // echo "Error in sending email. Mailer Error: {$mail->ErrorInfo}";
}
}
?>
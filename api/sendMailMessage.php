<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

function sendEmail($email, $message, $title){
    

    $mail = new PHPMailer(true); //se true vengono sollevate eventuali eccezioni utili per il debugging

    try {
        //Impostazioni server
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                 //Debug mode
        $mail->isSMTP();                                       //Invio tramite SMTP
        $mail->Host       = 'smtp.gmail.com';                  //Server SMTP
        $mail->SMTPAuth   = true;                              //Abilita autenticazione SMTP
        $mail->Username   = 'visualexperienceunimarconi@gmail.com';           //SMTP username
        $mail->Password   = 'qikd lrof rplm cedv';                      //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;    //Abilita TLS implicito
        $mail->Port       = 587;                               //Porta SMTP

        //Recipients
        $mail->setFrom('visualexperienceunimarconi@gmail.com', 'Visual Experience Unimarconi');
        $mail->addAddress($email, 'Dest');  //Indirizzo destinatario
        $mail->addReplyTo('visualexperienceunimarconi@gmail.com', 'User');          //Indirizzo di risposta
        //$mail->addCC('cc@gmail.com');                         //Campo CC  (Copia Carbone)    
        $mail->addBCC('visualexperienceunimarconi@gmail.com');                       //Campo BCC (Copia Carbone Nascosta)

        //Content
        $mail->isHTML(true);                                  //Abilita invio in HTML
        $mail->Subject = $title;                           //Oggetto 
        $mail->Body    = $message; //Corpo email
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients'; //Testo alternativo

        $mail->send();
        echo 'Il messaggio è stato inviato con successo';
    } catch (Exception $e) {
        echo "Il messaggio non è stato inviato. Errore: {$mail->ErrorInfo}";
    } 
}

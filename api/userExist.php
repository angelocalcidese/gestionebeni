<?php 
require_once "../cors.php";
require_once "../config.php";
require_once "../utility.php";

function emailExist($email){
    $sql = "SELECT * FROM `users` WHERE `id` = ".$email;
    $result = $conn->query($sql);
    $response = array();
    $exist = false;

    if ($result->num_rows > 0) {
        $exist = true;
    }  

    echo $exist;
    $conn->close();
}

?>
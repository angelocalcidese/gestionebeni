<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";


    $data = getRequestDataBody();
    $sql = "UPDATE `category_bene` SET `voce` = '". $data["voice"]."' WHERE `category_bene`.`id` =" . $data["id"];

    $result = $conn->query($sql);


    echo $result;
?>
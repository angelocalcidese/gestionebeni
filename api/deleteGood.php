<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";


    $data = getRequestDataBody();
    $sql = "DELETE FROM `gestori_bene` WHERE `bene`= " . $data["id"];

    $result = $conn->query($sql);

    $sql1 = "DELETE FROM `beni` WHERE `beni`.`id` = " . $data["id"] ;

    $result1 = $conn->query($sql1);

    echo $result;
?>
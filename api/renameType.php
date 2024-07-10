<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";


    $data = getRequestDataBody();
    $sql = "UPDATE `tipologiabene` SET `voce` = '". $data["voice"]. "' WHERE `tipologiabene`.`id` =" . $data["id"];

    $result = $conn->query($sql);


    echo $result;
?>
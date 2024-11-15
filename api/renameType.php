<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";


    $data = getRequestDataBody();
$voice = str_replace("'", "\'", $data["voice"]);
    $sql = "UPDATE `tipologiabene` SET `voce` = '". $voice . "' WHERE `tipologiabene`.`id` =" . $data["id"];

    $result = $conn->query($sql);


    echo $result;
?>
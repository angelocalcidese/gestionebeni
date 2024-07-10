<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";


    $data = getRequestDataBody();
    $sql = "UPDATE `beni` SET `stato` = '" . $data["stato"] . "', `category` = '" . $data["category"] . "', `tipologia` = '" . $data["tipologia"] . "', `marca` = '" . $data["marca"] . "', `modello` = '" . $data["modello"] . "', 
    `seriale` = '" . $data["sn"] . "', `assegnatoa` = '" . $data["assegnatoa"] . "', `datainserimento` = '" . $data["datainserimento"] . "', `dataassegnazione` = '" . $data["dataassegnazione"] . "', 
    `valoreacquisto` = '" . $data["valoreacquisto"] . "', `note` = '" . $data["note"] . "', `cespite` = '" . $data["cespite"] . "', `dataproduzione` = '" . $data["dataproduzione"] . "' WHERE `beni`.`id` = " . $data["id"] ;

    $result = $conn->query($sql);

    echo $result;
?>
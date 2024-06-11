<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();


if(isset($data["idex"])){
    $sql1 = "UPDATE `gestori_bene` SET `a` = '" . $data["da"] . "' WHERE `gestori_bene`.`id` = ". $data["idex"];

    $result1 = $conn->query($sql1);
}

$sql = "INSERT INTO `gestori_bene` (`id`, `bene`, `da`, `a`, `dipendente`) 
VALUES (NULL, '" . $data["bene"] . "', '" . $data["da"] . "', NULL, '" . $data["dipendente"] . "')";

$result = $conn->query($sql);

$sql2 = "UPDATE `beni` SET `dataassegnazione` = '".$data["da"]. "', `assegnatoa` = '". $data["dipendente"]."' WHERE `beni`.`id` = ". $data["bene"];

$result2 = $conn->query($sql2);
echo $result + $result2;

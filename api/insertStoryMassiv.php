<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql3 = "SELECT * FROM `gestori_bene` WHERE `bene` = " . $data["bene"];
$result3 = $conn->query($sql3);

if ($result3->num_rows > 0) {
    while ($row = $result3->fetch_assoc()) {
        $idgest = $row["id"];
    }
}

if(isset($idgest)){
    $sql1 = "UPDATE `gestori_bene` SET `a` = '" . $data["da"] . "' WHERE `gestori_bene`.`id` = ". $idgest;

    $result1 = $conn->query($sql1);
}

$sql = "INSERT INTO `gestori_bene` (`id`, `bene`, `da`, `a`, `dipendente`) 
VALUES (NULL, '" . $data["bene"] . "', '" . $data["da"] . "', NULL, '" . $data["dipendente"] . "')";

$result = $conn->query($sql);

$sql2 = "UPDATE `beni` SET `dataassegnazione` = '".$data["da"]. "', `assegnatoa` = '". $data["dipendente"]."' WHERE `beni`.`id` = ". $data["bene"];

$result2 = $conn->query($sql2);
echo $result2;

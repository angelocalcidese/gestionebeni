<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql = "SELECT * FROM `gestori_bene` WHERE `bene` = ".$data["bene"];
$result = $conn->query($sql);

$guida = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $row["id"];
        $object->da = $row["da"];
        $object->a = $row["a"];
        $object->dipendente = $row["dipendente"];
        array_push($guida, $object);
    }
}

echo json_encode($guida);

$conn->close();
?>
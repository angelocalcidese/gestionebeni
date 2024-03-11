<?php 
require_once "../cors.php";
require_once "../config.php";

$sql = "SELECT * FROM `beni`";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->id = $row["id"]; 
        $object->tipologia = $row["tipologia"]; 
        $object->marca = $row["marca"]; 
        $object->modello = $row["modello"]; 
        $object->seriale = $row["seriale"]; 
        $object->assegnatoa = $row["assegnatoa"]; 
        $object->datainserimento = $row["datainserimento"]; 
        $object->dataassegnazione = $row["dataassegnazione"]; 
        array_push($data, $object);
    }
  } else {
    echo "0 results";
  }

  //print_r($data);
 echo json_encode($data);

$conn->close();
?>
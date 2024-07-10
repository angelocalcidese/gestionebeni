<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";

$data = getRequestDataBody();

$sql = "SELECT * FROM `beni` WHERE `company` = " . $user_params->company;


if (isset($data["stato"])) {
  $sql .= " AND `stato` = '" . $data["stato"]."'";
}
if (isset($data["assegnatoa"])) {
  $sql .= " AND `assegnatoa` = '" . $data["assegnatoa"]."'";
}
if (isset($data["category"])) {
  $sql .= " AND `category` = '" . $data["category"] . "'";
}
if (isset($data["tipologia"])) {
  $sql .= " AND `tipologia` = '" . $data["tipologia"] . "'";
}

$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->id = $row["id"];
        $object->stato = $row["stato"]; 
        $object->category = $row["category"]; 
        $object->tipologia = $row["tipologia"]; 
        $object->marca = $row["marca"]; 
        $object->modello = $row["modello"]; 
        $object->seriale = $row["seriale"]; 
        $object->assegnatoa = $row["assegnatoa"]; 
        $object->datainserimento = $row["datainserimento"]; 
        $object->dataassegnazione = $row["dataassegnazione"];
        $object->valoreacquisto = $row["valoreacquisto"];
        $object->note = $row["note"];
        $object->accettato = $row["accettato"];
        $object->cespite = $row["cespite"];
        $object->dataproduzione = $row["dataproduzione"]; 
        array_push($data, $object);
    }
  } 

  //print_r($data);
 echo json_encode($data);

$conn->close();
?>
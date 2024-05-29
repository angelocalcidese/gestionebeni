<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";


$data = getRequestDataBody();

$sql2 = "INSERT INTO `tipologiabene` (`id`, `category`, `voce`, `company`) VALUES (NULL, '" . $data["idcat"] . "', '" . $data["typenew"] . "', '" . $user_params->company . "')";
$result2 = $conn->query($sql2);
$sql3 = "SELECT MAX(id) FROM `tipologiabene`";
$result3 = $conn->query($sql3);
if ($result3->num_rows > 0) {
    while ($row = $result3->fetch_assoc()) {
        $res = $row['MAX(id)'];
    }
} 
echo $res;

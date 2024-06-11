<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";


    $data = getRequestDataBody();

    $sql = "INSERT INTO `beni` (`id`, `category`, `tipologia`, `marca`, `modello`, `seriale`, `assegnatoa`, `datainserimento`, `dataassegnazione`, `valoreacquisto`, `stato`, `note`, `company`) 
    VALUES (NULL, '" . $data["category"] . "', '" . $data["tipologia"] . "', '" . $data["marca"] . "', '" . $data["modello"] . "', '" . $data["sn"] . "', 
    '" . $data["assegnatoa"] . "', '" . $data["datainserimento"] . "', '" . $data["dataassegnazione"] . "', '" . $data["valoreacquisto"] . "', '" . $data["stato"] . "', '" . $data["note"] . "', 
    '". $user_params->company."')";

    $result = $conn->query($sql);

    $sql3 = "SELECT MAX(id) FROM `beni`";
    $result3 = $conn->query($sql3);
    if ($result3->num_rows > 0) {
        while ($row = $result3->fetch_assoc()) {
            $res = $row['MAX(id)'];
        }
    }

    if (isset($data["assegnatoa"])) {
        $sql = "INSERT INTO `gestori_bene` (`id`, `bene`, `da`, `a`, `dipendente`) 
    VALUES (NULL, '" . $res . "', '" . $data["dataassegnazione"] . "', NULL, '" . $data["assegnatoa"] . "')";

    $result = $conn->query($sql);
    }
    echo $result;
?>
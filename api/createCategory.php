<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";


    $data = getRequestDataBody();
    
        $sql = "INSERT INTO `category_bene` (`id`, `voce`, `company`) VALUES (NULL, '". $data["catnew"]."', '". $user_params->company."')";
        $result = $conn->query($sql);

        $sql1 = "SELECT MAX(id) FROM `category_bene`";
        $result1 = $conn->query($sql1);

        if ($result1->num_rows > 0) {
            while ($row = $result1->fetch_assoc()) {
                $res = $row['MAX(id)'];
            }
        } 
        echo $res;
   

?>
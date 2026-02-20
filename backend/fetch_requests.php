<?php
include "config.php";
$pending = [];
$approved = [];
$result = $conn->query("SELECT * FROM service_requests ORDER BY id DESC");
while($row = $result->fetch_assoc()){
    if($row['status']=="pending") $pending[] = $row;
    else $approved[] = $row;
}
echo json_encode(['pending'=>$pending,'approved'=>$approved]);
?>

<?php
include "config.php";
$q = isset($_GET['q']) ? $_GET['q'] : "";
$sql = "SELECT *, CONCAT(lname,', ',fname,' ',mname) as name FROM residents
        WHERE lname LIKE '%$q%' OR fname LIKE '%$q%' OR mname LIKE '%$q%'";
$result = $conn->query($sql);
$data = [];
while($row = $result->fetch_assoc()) $data[] = $row;
echo json_encode($data);
?>

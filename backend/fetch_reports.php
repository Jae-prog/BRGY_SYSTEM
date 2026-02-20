<?php
include "config.php";
$result = $conn->query("SELECT * FROM reports ORDER BY date DESC");
$data = [];
while($row = $result->fetch_assoc()) $data[] = $row;
echo json_encode($data);
?>

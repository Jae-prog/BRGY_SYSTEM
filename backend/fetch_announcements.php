<?php
include "config.php";
$sql = "SELECT * FROM announcements ORDER BY date DESC";
$result = $conn->query($sql);
$data = [];
while($row = $result->fetch_assoc()) $data[] = $row;
echo json_encode($data);
?>

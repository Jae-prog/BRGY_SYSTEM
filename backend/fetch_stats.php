<?php
include "config.php";

$residents = $conn->query("SELECT COUNT(*) as total FROM residents")->fetch_assoc()['total'];
$pending_requests = $conn->query("SELECT COUNT(*) as total FROM service_requests WHERE status='pending'")->fetch_assoc()['total'];
$approved_requests = $conn->query("SELECT COUNT(*) as total FROM service_requests WHERE status='approved'")->fetch_assoc()['total'];
$reports_total = $conn->query("SELECT COUNT(*) as total FROM reports")->fetch_assoc()['total'];
$reports_pending = $conn->query("SELECT COUNT(*) as total FROM reports WHERE status='pending'")->fetch_assoc()['total'];
$reports_resolved = $conn->query("SELECT COUNT(*) as total FROM reports WHERE status='resolved'")->fetch_assoc()['total'];

echo json_encode(compact(
    'residents','pending_requests','approved_requests',
    'reports_total','reports_pending','reports_resolved'
));
?>

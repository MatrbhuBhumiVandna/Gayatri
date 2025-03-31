<?php
require_once 'config.php';

$customerId = $_GET['customer_id'] ?? 0;

try {
    $stmt = $pdo->prepare("SELECT * FROM measurements WHERE customer_id = ?");
    $stmt->execute([$customerId]);
    $measurements = $stmt->fetchAll();
    echo json_encode($measurements);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

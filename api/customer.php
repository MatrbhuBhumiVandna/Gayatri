<?php
require_once 'config.php';

$customerId = $_GET['id'] ?? 0;

try {
    $stmt = $pdo->prepare("SELECT * FROM customers WHERE customer_id = ?");
    $stmt->execute([$customerId]);
    $customer = $stmt->fetch();
    
    if ($customer) {
        echo json_encode($customer);
    } else {
        echo json_encode(['error' => 'Customer not found']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

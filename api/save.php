<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

try {
    $pdo->beginTransaction();
    
    // Save or update customer
    if (empty($data['customer_id'])) {
        $stmt = $pdo->prepare("INSERT INTO customers (name, mobile) VALUES (?, ?)");
        $stmt->execute([$data['name'], $data['mobile']]);
        $customerId = $pdo->lastInsertId();
    } else {
        $customerId = $data['customer_id'];
        $stmt = $pdo->prepare("UPDATE customers SET name = ?, mobile = ? WHERE customer_id = ?");
        $stmt->execute([$data['name'], $data['mobile'], $customerId]);
    }
    
    // Delete existing measurements
    $stmt = $pdo->prepare("DELETE FROM measurements WHERE customer_id = ?");
    $stmt->execute([$customerId]);
    
    // Insert new measurements
    if (!empty($data['measurements'])) {
        $stmt = $pdo->prepare("INSERT INTO measurements (customer_id, garment_type, measurement_name, measurement_value) VALUES (?, ?, ?, ?)");
        foreach ($data['measurements'] as $measurement) {
            $stmt->execute([
                $customerId,
                $measurement['garment_type'],
                $measurement['measurement_name'],
                $measurement['measurement_value']
            ]);
        }
    }
    
    $pdo->commit();
    echo json_encode(['success' => true, 'customer_id' => $customerId]);
} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>

<?php
require_once 'config.php';

$search = $_GET['search'] ?? '';

try {
    $query = "SELECT * FROM customers";
    if ($search) {
        $query .= " WHERE name LIKE :search OR mobile LIKE :search";
        $stmt = $pdo->prepare($query);
        $stmt->execute(['search' => "%$search%"]);
    } else {
        $stmt = $pdo->query($query);
    }
    
    $customers = $stmt->fetchAll();
    echo json_encode($customers);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

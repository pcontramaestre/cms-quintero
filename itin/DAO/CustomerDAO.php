<?php
require_once __ROOT__ . '/services/itin/class/Customer.php';
function getCustomerById(int $id): Customer
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM customers WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $customer = new Customer(
        $result['id'],
        $result['id_code'],
        $result['is_active'],
        $result['user_id'],
        $result['first_name'],
        $result['middle_name'],
        $result['last_name'],
        $result['date_of_birth'],
        $result['gender'],
        $result['marital_status'],
        $result['occupation'],
        $result['status'],
        $result['status_date'],
        $result['notes'],
        $result['ip_address'],
        $result['server_language'],
        $result['form_language'],
        $result['created_at'],
        $result['updated_at']
    );

    return $customer;
}
?>
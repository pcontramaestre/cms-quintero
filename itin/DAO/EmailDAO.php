<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/services/itin/class/Email.php';

function getCustomerDefaultEmail(int $customer_id): Email
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM emails WHERE is_customer = 1 AND customer_id = :customer_id AND is_default = 1");
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return new Email(
        $result['id'],
        $result['id_code'],
        $result['is_active'],
        $result['is_user'],
        $result['user_id'],
        $result['is_customer'],
        $result['customer_id'],
        $result['is_individual'],
        $result['individual_id'],
        $result['name'],
        $result['address'],
        $result['is_default'],
        $result['type'],
        $result['is_verified'],
        $result['status'],
        $result['status_date'],
        $result['notes'],
        $result['ip_address'],
        $result['server_language'],
        $result['form_language'],
        $result['created_at'],
        $result['updated_at']
    );
}
?>
<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/services/itin/class/ServiceRecord.php';

function getServiceRecordById(int $id)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM service_records WHERE id = ?");
    $stmt->execute([$id]);
    $serviceRecord = $stmt->fetch(PDO::FETCH_ASSOC);

    $serviceRecord = new ServiceRecord(
        $serviceRecord['id'],
        $serviceRecord['id_code'],
        $serviceRecord['is_active'],
        $serviceRecord['service_id'],
        $serviceRecord['purchase_date'],
        $serviceRecord['price'],
        $serviceRecord['customer_id'],
        $serviceRecord['service_type'],
        $serviceRecord['service_for'],
        $serviceRecord['individual_id'],
        $serviceRecord['business_id'],
        $serviceRecord['recipient_id'],
        $serviceRecord['start_date'],
        $serviceRecord['estimate_completion_date'],
        $serviceRecord['folder_path'],
        $serviceRecord['status'],
        $serviceRecord['status_date'],
        $serviceRecord['notes'],
        $serviceRecord['is_subscription'],
        $serviceRecord['plan'],
        $serviceRecord['expiry_date'],
        $serviceRecord['renewal_period'],
        $serviceRecord['last_renewal'],
        $serviceRecord['autorenew'],
        $serviceRecord['ip_address'],
        $serviceRecord['server_language'],
        $serviceRecord['form_language'],
        $serviceRecord['created_at'],
        $serviceRecord['updated_at']
    );

    return $serviceRecord;
}
?>
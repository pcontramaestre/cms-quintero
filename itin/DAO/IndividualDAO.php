<?php
require_once __ROOT__ . '/services/itin/class/Individual.php';

function getIndividualById(int $id): Individual
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM individuals WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $individual = new Individual(
        $result['id'],
        $result['id_code'],
        $result['is_active'],
        $result['customer_id'],
        $result['name'],
        $result['industry'],
        $result['tax_id'],
        $result['folder_path'],
        $result['profile_picture'],
        $result['status'],
        $result['status_date'],
        $result['notes'],
        $result['ip_address'],
        $result['server_language'],
        $result['form_language'],
        $result['created_at'],
        $result['updated_at']
    );

    return $individual;
}
?>
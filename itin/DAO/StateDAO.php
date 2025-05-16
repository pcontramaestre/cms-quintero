<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/services/itin/class/State.php';

function getStateByISOCode($iso_code)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM states WHERE iso_code = :iso_code");
    $stmt->bindParam(':iso_code', $iso_code);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return new State(
        $result['id'],
        $result['is_active'],
        $result['country_id'],
        $result['en_name'],
        $result['en_td'],
        $result['es_name'],
        $result['es_td'],
        $result['pt_name'],
        $result['pt_td'],
        $result['zh_name'],
        $result['zh_td'],
        $result['iso_code'],
        $result['status'],
        $result['status_date'],
        $result['ip_address'],
        $result['server_language'],
        $result['form_language'],
        $result['created_at'],
        $result['updated_at']
    );
}
?>
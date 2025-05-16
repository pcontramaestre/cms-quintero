<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/services/itin/class/Country.php';

function getCountryByAlpha2Code($alpha2_code)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM countries WHERE alpha2_code = :alpha2_code");
    $stmt->bindParam(':alpha2_code', $alpha2_code);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return new Country(
        $result['id'],
        $result['is_active'],
        $result['alpha2_code'],
        $result['alpha3_code'],
        $result['numeric_code'],
        $result['en_name'],
        $result['es_name'],
        $result['pt_name'],
        $result['zh_name'],
        $result['phone_code'],
        $result['internet_domain'],
        $result['currency'],
        $result['currency_code'],
        $result['flag_path'],
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
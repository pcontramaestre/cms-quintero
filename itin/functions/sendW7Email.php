<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/includes/includes_functions.php';
require_once __ROOT__ . '/services/DAO/ServiceRecord.php';
require_once __ROOT__ . '/services/itin/DAO/CustomerDAO.php';
require_once __ROOT__ . '/services/itin/DAO/EmailDAO.php';


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /');
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$serviceRecordId = $data['serviceRecordId'];

$serviceRecord = getServiceRecordById($serviceRecordId);
$customer = getCustomerById($serviceRecord->getCustomerId());
$email = getCustomerDefaultEmail($customer->getId());

$file_path = $serviceRecord->getFolderPath() . '/w7.pdf';

$subject = 'W-7 Form';
$body = 'Please find attached the W-7 form.';

try {
    sendEmail(
        $email->getAddress(),
        $subject,
        $body,
        '',
        '',
        0,
        $file_path
    );

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false]);
}
?>
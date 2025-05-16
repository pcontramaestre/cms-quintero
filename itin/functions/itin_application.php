<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/services/itin/data/sql_itin_application.php';
require_once __ROOT__ . '/services/itin/generate-invoice.php';

$content = print_r($_POST, true);
$filePath = __DIR__ . '/itin_application.txt';
file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

$temporal = filter_var($_POST['temporal'], FILTER_VALIDATE_BOOLEAN);

$itin = saveitinapplication($temporal);
$content = date('Y-m-d H:i:s') . " - The saveitiapplication() function was executed";
file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

if (!$temporal) {

    insertCustomer();
    $content = date('Y-m-d H:i:s') . " - The insertCustomer() function was executed";
    file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

    insertIndividual();
    $content = date('Y-m-d H:i:s') . " - insertIndividual() function was executed";
    file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

    if (!empty($_POST['us_address_line1'])) {
        insertUSAddress();
        $content = date('Y-m-d H:i:s') . " - The insertUSAddress() function was executed";
        file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);
    }

    if (!empty($_POST['non_us_address_line1'])) {
        insertNonUSAddress();
        $content = date('Y-m-d H:i:s') . " - The insertNonUSAddress() function was executed";
        file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);
    }

    updateEmail();
    $content = date('Y-m-d H:i:s') . " - The updateEmail() function was executed";
    file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

    if (!empty($_POST['us_phone'])) {
        insertUSPhone();
        $content = date('Y-m-d H:i:s') . " - insertUSPhone() function was executed";
        file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);
    }

    if (!empty($_POST['non_us_phone'])) {
        insertNonUSPhone();
        $content = date('Y-m-d H:i:s') . " - insertNonUSPhone() function was executed";
        file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);
    }

    insertEmailToNewsletterSuscription();
    $content = date('Y-m-d H:i:s') . " - insertEmailToNewsletterSuscription() function was executed";
    file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

    $serviceRecordResult = insertServiceRecord();
    $content = date('Y-m-d H:i:s') . " - insertService() function was executed";
    file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

    insertITINSummary();
    $content = date('Y-m-d H:i:s') . " - insertITINSummaryInfo() function was executed";
    file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

    $order = insertOrder($serviceRecordResult['customer_id'], $serviceRecordResult['service_record_id'], $serviceRecordResult['amount']);
    $content = date('Y-m-d H:i:s') . " - insertOrder() function was executed";
    file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

    $invoice = getInvoiceById(insertInvoice($order));
    $content = date('Y-m-d H:i:s') . " - insertInvoice() function was executed";
    file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

    generateInvoice(['number' => $invoice->getId(), 'date' => explode(' ', $invoice->getCreatedAt())[0], 'due_date' => explode(' ', $invoice->getCreatedAt())[0]], ['Andres Arrieche', 'Villa Crepuscular', 'Barquisimeto, 3001', 'Venezuela'], [[$serviceRecordResult['service_type'], '1', 'Unit', $serviceRecordResult['amount'], $serviceRecordResult['amount']]], $order->getId());

    $receipt = insertReceipt($order);
    $content = date('Y-m-d H:i:s') . " - insertReceipt() function was executed";
    file_put_contents($filePath, $content . PHP_EOL, FILE_APPEND);

    echo json_encode(['success' => true, 'order_id' => $order->getId(), 'itin_id' => $itin['itin_id']]);
    exit;
    /*
    session_unset();
    session_destroy();
    $_SESSION = array();
    */
}

echo json_encode(['success' => true, 'itin_id' => $itin['itin_id']]);




<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/services/itin/class/Receipt.php';

function getReceiptById(int $id)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM receipts WHERE id = ?");
    $stmt->execute([$id]);
    $receipt = $stmt->fetch(PDO::FETCH_ASSOC);

    $receipt = new Receipt(
        $receipt['id'],
        $receipt['id_code'],
        $receipt['is_active'],
        $receipt['order_id'],
        $receipt['receipt_date'],
        $receipt['amount_paid'],
        $receipt['payment_method'],
        $receipt['transaction_id'],
        $receipt['status'],
        $receipt['status_date'],
        $receipt['notes'],
        $receipt['ip_address'],
        $receipt['server_language'],
        $receipt['form_language'],
        $receipt['created_at'],
        $receipt['updated_at']
    );

    return $receipt;
}

function getReceiptByOrderId(int $order_id): Receipt
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM receipts_itin WHERE order_id = ?");
    $stmt->execute([$order_id]);
    $receipt = $stmt->fetch(PDO::FETCH_ASSOC);

    $receipt = new Receipt(
        $receipt['id'],
        $receipt['id_code'],
        $receipt['is_active'],
        $receipt['order_id'],
        $receipt['receipt_date'],
        $receipt['amount_paid'],
        $receipt['payment_method'],
        $receipt['transaction_id'],
        $receipt['status'],
        $receipt['status_date'],
        $receipt['notes'],
        $receipt['ip_address'],
        $receipt['server_language'],
        $receipt['form_language'],
        $receipt['created_at'],
        $receipt['updated_at']
    );

    return $receipt;
}

function createReceipt(Receipt $receipt)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("INSERT INTO receipts_itin (id_code, is_active, order_id, receipt_date, amount_paid, payment_method, transaction_id, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, :is_active, :order_id, :receipt_date, :amount_paid, :payment_method, :transaction_id, :status, :status_date, :notes, :ip_address, :server_language, :form_language, :created_at, :updated_at)");

    $stmt->execute([
        'id_code' => $receipt->getIdCode(),
        'is_active' => $receipt->getIsActive(),
        'order_id' => $receipt->getOrderId(),
        'receipt_date' => $receipt->getReceiptDate(),
        'amount_paid' => $receipt->getAmountPaid(),
        'payment_method' => $receipt->getPaymentMethod(),
        'transaction_id' => $receipt->getTransactionId(),
        'status' => $receipt->getStatus(),
        'status_date' => $receipt->getStatusDate(),
        'notes' => $receipt->getNotes(),
        'ip_address' => $receipt->getIpAddress(),
        'server_language' => $receipt->getServerLanguage(),
        'form_language' => $receipt->getFormLanguage(),
        'created_at' => $receipt->getCreatedAt(),
        'updated_at' => $receipt->getUpdatedAt()
    ]);

    return $conn->lastInsertId();
}

?>
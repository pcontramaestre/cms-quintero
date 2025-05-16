<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/services/itin/class/Invoice.php';

function getInvoiceById(int $id): Invoice
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM invoices_itin WHERE id = ?");
    $stmt->execute([$id]);
    $invoice = $stmt->fetch(PDO::FETCH_ASSOC);

    $invoice = new Invoice(
        $invoice['id'],
        $invoice['id_code'],
        $invoice['is_active'],
        $invoice['order_id'],
        $invoice['invoice_date'],
        $invoice['total_amount'],
        $invoice['tax_amount'],
        $invoice['subtotal'],
        $invoice['status'],
        $invoice['status_date'],
        $invoice['notes'],
        $invoice['ip_address'],
        $invoice['server_language'],
        $invoice['form_language'],
        $invoice['created_at'],
        $invoice['updated_at']
    );

    return $invoice;
}

function getInvoiceByOrderId(int $order_id): Invoice
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM invoices_itin WHERE order_id = ?");
    $stmt->execute([$order_id]);
    $invoice = $stmt->fetch(PDO::FETCH_ASSOC);

    $invoice = new Invoice(
        $invoice['id'],
        $invoice['id_code'],
        $invoice['is_active'],
        $invoice['order_id'],
        $invoice['invoice_date'],
        $invoice['total_amount'],
        $invoice['tax_amount'],
        $invoice['subtotal'],
        $invoice['status'],
        $invoice['status_date'],
        $invoice['notes'],
        $invoice['ip_address'],
        $invoice['server_language'],
        $invoice['form_language'],
        $invoice['created_at'],
        $invoice['updated_at']
    );

    return $invoice;
}

function createInvoice(Invoice $invoice)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("INSERT INTO invoices_itin (id_code, is_active, order_id, invoice_date, total_amount, tax_amount, subtotal, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, :is_active, :order_id, :invoice_date, :total_amount, :tax_amount, :subtotal, :status, :status_date, :notes, :ip_address, :server_language, :form_language, :created_at, :updated_at)");

    $stmt->execute([
        'id_code' => $invoice->getIdCode(),
        'is_active' => $invoice->getIsActive(),
        'order_id' => $invoice->getOrderId(),
        'invoice_date' => $invoice->getInvoiceDate(),
        'total_amount' => $invoice->getTotalAmount(),
        'tax_amount' => $invoice->getTaxAmount(),
        'subtotal' => $invoice->getSubtotal(),
        'status' => $invoice->getStatus(),
        'status_date' => $invoice->getStatusDate(),
        'notes' => $invoice->getNotes(),
        'ip_address' => $invoice->getIpAddress(),
        'server_language' => $invoice->getServerLanguage(),
        'form_language' => $invoice->getFormLanguage(),
        'created_at' => $invoice->getCreatedAt(),
        'updated_at' => $invoice->getUpdatedAt()
    ]);

    return $conn->lastInsertId();

}
?>
<?php
// Start of the session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Includes configuration file to load global variables and settings
require_once __DIR__ . '/../config/config.php';
require_once __ROOT__ . '/includes/includes.php';
// Load the Composer autoloader
require_once __ROOT__ . '/libraries/vendor/autoload.php';
// Import Fpdi class
use setasign\Fpdi\Fpdi;

function generateInvoice($data)
{
    $pdf = new Fpdi();
    $pdf->SetMargins(10, 10, 10); // Margen izquierdo, superior y derecho
    $pdf->AddPage();

    // Configuración de la fuente
    $pdf->SetFont('Arial', 'B', 16);

    // Nombre de la empresa
    $pdf->Cell(0, 5, 'Quintero & Associates Inc', 0, 1, 'L');
    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(0, 5, 'www.quinteroandassociates.com', 0, 1, 'L');
    $pdf->Cell(0, 5, 'PO Box 521234', 0, 1, 'L');
    $pdf->Cell(0, 5, 'Miami FL, 33152', 0, 1, 'L');
    $pdf->Cell(0, 5, '1-305-529-4929', 0, 1, 'L');

    // Salto de línea
    $pdf->Ln(10);

    // Título de la factura
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->Cell(0, 10, 'Invoice', 0, 1, 'C');

    // Datos de la factura
    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(100, 10, 'Invoice #:' . $data['invoice_number'], 0, 0);
    $pdf->Cell(0, 10, 'Invoice Date: ' . $data['invoice_date'], 0, 1);
    $pdf->Cell(100, 10, 'Due Date: ' . $data['due_date'], 0, 0);

    // Información del cliente
    $pdf->Ln(10);
    $pdf->Cell(0, 10, 'Bill To:', 0, 1);
    $pdf->Cell(0, 10, $data['bill_to']['name'], 0, 1);
    $pdf->Cell(0, 10, $data['bill_to']['address'], 0, 1);

    // Dirección de envío
    $pdf->Ln(5);
    $pdf->Cell(0, 10, 'Shipping To:', 0, 1);
    $pdf->Cell(0, 10, $data['shipping_to']['address'], 0, 1);

    // Salto de línea
    $pdf->Ln(10);

    // Encabezado de la tabla de artículos
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(80, 10, 'Item Description', 1);
    $pdf->Cell(30, 10, 'Quantity', 1);
    $pdf->Cell(30, 10, 'U/M', 1);
    $pdf->Cell(30, 10, 'Rate', 1);
    $pdf->Cell(30, 10, 'Amount', 1);
    $pdf->Ln();

    // Detalles de los artículos
    $pdf->SetFont('Arial', '', 12);
    $subtotal = 0;
    foreach ($data['items'] as $item) {
        $amount = $item['quantity'] * $item['rate'];
        $subtotal += $amount;
        $pdf->Cell(80, 10, $item['description'], 1);
        $pdf->Cell(30, 10, $item['quantity'], 1);
        $pdf->Cell(30, 10, $item['unit'], 1);
        $pdf->Cell(30, 10, '$' . number_format($item['rate'], 2), 1);
        $pdf->Cell(30, 10, '$' . number_format($amount, 2), 1);
        $pdf->Ln();
    }

    // Subtotal
    $pdf->Cell(170, 10, 'Subtotal:', 1);
    $pdf->Cell(30, 10, '$' . number_format($subtotal, 2), 1);
    $pdf->Ln();

    // Impuestos (suponiendo un 7% de impuestos como ejemplo)
    $tax = $subtotal * 0.07;
    $pdf->Cell(170, 10, 'Taxes (7%):', 1);
    $pdf->Cell(30, 10, '$' . number_format($tax, 2), 1);
    $pdf->Ln();

    // Total
    $total = $subtotal + $tax;
    $pdf->Cell(170, 10, 'Total:', 1);
    $pdf->Cell(30, 10, '$' . number_format($total, 2), 1);
    $pdf->Ln(15);

    // Leyenda importante
    $pdf->SetFont('Arial', '', 7.5);
    $pdf->MultiCell(0, 4, "Important:\n1. Under no circumstances are refunds made.\n2. This invoice must be paid no later than the due date.\n3. We only accept payments via ZELLE or with checks, debit or credit cards. We do not accept cash. Payments received with debit or credit card will have a charge of $5 or 5%, whichever is greater.\n4. Your only proof of payment is the 'Payment Receipt' duly signed by the Administration Department. DEMAND IT. Any balance due must be paid as agreed.\n5. Any transaction that is returned or rejected by the bank or the processing entity of the payment will be charged with a fee of $35 plus expenses.\n6. Any late payment will have a charge of $35 (Fee Late) plus a daily penalty of $5 or 5% of the amount owed, whichever is greater.\n7. The holder of this document accepts to know, understand and accept the terms and conditions under which this Firm and its associates and/or its contractors provide their services having entered the website https://quinteroandassociates.com/legal/termsandconditions, has read them and agrees.", 0, 'L');

    /*
    // Salida del PDF
    $pdf->Output();
    */
    /*
    // Generar el nombre del archivo
    $invoiceFileName = "FL" . $invoiceNumber . "_Quintero_&_Associates_Inc.pdf";
    $filePath = __DIR__ . '/invoices/' . $invoiceFileName; // Asegúrate de que la carpeta 'invoices' exista

    // Salida del PDF
    $pdf->Output('F', $filePath); // Guardar el archivo en el servidor
    */
    // Generar el nombre del archivo
    $invoiceFileName = "FL240818010002_Quintero_&_Associates_Inc.pdf";
    $filePath = __ROOT__ . '/billing/invoices/' . $invoiceFileName; // Asegúrate de que la carpeta 'invoices' exista

    // Salida del PDF
    $pdf->Output('F', $filePath); // Guardar el archivo en el servidor
    // $pdf->Output('I'); // Mostrar el archivo en el navegador

    /*
    // Redirigir al archivo PDF guardado
    header('Location: ' . $filePath);
    */

    // Enviar el correo electrónico con el archivo adjunto
    $email = 'thestudentofcode@gmail.com'; // Dirección de correo del destinatario
    $subject = "Factura #{$data['invoice_number']}";
    $body = "Adjunto encontrará la factura #{$data['invoice_number']} generada el {$data['invoice_date']}.";

    sendEmail($email, $subject, $body, "", "", "", $filePath);
}

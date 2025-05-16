<?php
require_once __DIR__ . '/../../config/config.php';
require_once __ROOT__ . '/libraries/vendor/autoload.php';
use setasign\Fpdi\Fpdi;

class PDF extends Fpdi
{

    public $headers;
    public $widths;
    public $address;
    public $invoice;
    public $totalAmount;

    public bool $isFinished = false;

    public function __construct($headers, $widths, $address, $invoice, $totalAmount)
    {
        parent::__construct();
        $this->headers = $headers;
        $this->widths = $widths;
        $this->address = $address;
        $this->invoice = $invoice;
        $this->totalAmount = $totalAmount;
    }
    public function Header()
    {
        printContactInfo($this);

        printInvoiceInfo($this);

        printBillingInfo($this);
        $this->Ln(10);

        setLabelFont($this);
        $this->SetLineWidth(0.4);
        $this->SetFillColor(200, 200, 200);

        foreach ($this->headers as $index => $header) {

            $this->Cell($this->widths[$index], 10, $header, 1, $index === count($this->headers) - 1 ? 1 : 0, 'C', true);
        }
    }

    public function Footer()
    {
        if ($this->isFinished) {
            $this->SetFont('Arial', 'B', 18);
            $this->SetXY(140, -80);

            $this->Rect($this->GetX(), $this->GetY(), 60, 12);

            $this->SetXY(140, -78.5);
            $this->Cell(70, 10, 'Total', 0, 0, 'L');

            $this->SetFont('Times', '', 18);

            $this->SetXY(140, -78.5);
            $this->Cell(60, 10, '$' . $this->totalAmount, 0, 0, 'R');
        }

        $this->SetY(-59);
        $this->SetFont('Times', '', 9);
        $this->MultiCell(0, 4, "Important:\n1. Under no circumstances are refunds made.\n2. This invoice must be paid no later than the due date.\n3. We only accept payments via ZELLE or with checks, debit or credit cards. We do not accept cash. Payments received with debit or credit card will have a charge of $5 or 5%, whichever is greater.\n4. Your only proof of payment is the 'Payment Receipt' duly signed by the Administration Department. DEMAND IT. Any balance due must be paid as agreed.\n5. Any transaction that is returned or rejected by the bank or the processing entity of the payment will be charged with a fee of $35 plus expenses.\n6. Any late payment will have a charge of $35 (Fee Late) plus a daily penalty of $5 or 5% of the amount owed, whichever is greater.\n7. The holder of this document accepts to know, understand and accept the terms and conditions under which this Firm and its associates and/or its contractors provide their services having entered the website https://quinteroandassociates.com/legal/termsandconditions, has read them and agrees.", 0, 'J');
        $this->Cell(0, 10, 'Page ' . $this->PageNo(), 0, 0, 'C');
    }
}

function getLargestLengthString(string ...$strings): string
{
    $largest = '';
    foreach ($strings as $string) {
        $length = strlen($string);
        if ($length > strlen($largest)) {
            $largest = $string;
        }
    }
    return $largest;
}

function getNumberOfLines(PDF $pdf, string $string, int $cellWidth): int
{
    $width = $pdf->GetStringWidth($string);

    $numberOfLines = ceil(($width) / $cellWidth);
    return $numberOfLines;
}

function setLabelFont(PDF $pdf): void
{
    $pdf->SetFont('Arial', '', 9);
}

function setContentFont(PDF $pdf): void
{
    $pdf->SetFont('Times', '', 9);
}

function printContactInfo(PDF $pdf): void
{
    $pdf->SetXY(25, 18);
    $pdf->SetFont('Times', 'B', 10);

    $pdf->SetX(25);
    $pdf->Cell(50, 3, 'Quintero & Associates Inc', 0, 1, 'C');

    setContentFont($pdf);
    $pdf->SetX(25);
    $pdf->Cell(50, 4, 'www.quinteroandassociates.com', 0, 1, 'C');

    $pdf->SetX(25);
    $pdf->MultiCell(50, 4, "PO Box 521234\nMiami FL, 33152\n1-305-529-4929", 0, 'C');
}

function printInvoiceInfo(PDF $pdf)
{
    $pdf->SetFont('Arial', 'B', 20);
    $pdf->SetXY(0, 10);
    $pdf->Cell(0, 10, 'Invoice', 0, 1, 'R');

    setLabelFont($pdf);
    $pdf->SetY(25);
    $pdf->Cell(170, 6, 'Invoice #:', 0, 0, 'R');

    $pdf->SetY(25);
    setContentFont($pdf);
    $pdf->SetX(183);
    $pdf->Cell(20, 6, $pdf->invoice['number'], 0, 1, 'C');

    setLabelFont($pdf);
    $pdf->Cell(170, 6, 'Invoice Date:', 0, 0, 'R');
    $Y = $pdf->GetY();
    $pdf->SetY($Y);

    setContentFont($pdf);
    $pdf->SetX(183);
    $pdf->Cell(20, 6, $pdf->invoice['date'], 0, 1, 'C');

    setLabelFont($pdf);
    $pdf->Cell(170, 6, 'Due Date:', 0, 0, 'R');
    $Y = $pdf->GetY();

    $pdf->SetY($Y);
    setContentFont($pdf);
    $pdf->SetX(183);
    $pdf->Cell(20, 6, $pdf->invoice['due_date'], 0, 1, 'C');
}

function printBillingInfo(PDF $pdf)
{
    setLabelFont($pdf);
    $pdf->SetXY(20, 45);

    $pdf->Cell(0, 10, 'Bill To:', 0, 1, 'L');

    $billFinalText = array_reduce($pdf->address, function ($carry, $item) {
        return $carry . $item . "\n";
    });

    $pdf->SetX(17);
    setContentFont($pdf);

    $pdf->MultiCell(0, 4, $billFinalText, 0, 'L');
}

function printTable(PDF $pdf, $texts, $aligns)
{
    $X = $pdf->GetX();
    $Y = $pdf->GetY();
    setContentFont($pdf);
    foreach ($texts as $textIndex => $text) {
        $largestNumberOfLines = 0;

        foreach ($text as $index => $item) {
            $largestNumberOfLines = getNumberOfLines($pdf, $item, $pdf->widths[$index]) > $largestNumberOfLines ? getNumberOfLines($pdf, getLargestLengthString(...$text), $pdf->widths[$index]) : $largestNumberOfLines;
        }

        if ($pdf->GetY() + 10 * $largestNumberOfLines > 200) {
            $pdf->AddPage();
            $pdf->SetAutoPageBreak(false, 0);
            $pdf->SetMargins(10, 10, 10);
            $X = $pdf->GetX();
            $Y = $pdf->GetY();
        }

        foreach ($text as $index => $item) {
            $pdf->MultiCell($pdf->widths[$index], 10, $item, 0, $aligns[$index]);
            $pdf->SetXY($X + $pdf->widths[$index], $Y);
            $X = $pdf->GetX();
        }

        $pdf->SetXY(10, $pdf->GetY() + 10 * ($largestNumberOfLines));
        $X = $pdf->GetX();
        $Y = $pdf->GetY();
    }

    $pdf->isFinished = true;
}

function generateInvoice($invoice, $address, $products, $order_id)
{
    $headers = ['Description', 'Quantity', 'U/M', 'Rate', 'Amount'];
    $widths = [60, 30, 26, 27, 47];

    $totalAmount = array_reduce($products, function ($carry, $item) {
        return ((float) $carry) + $item[4];
    });

    $pdf = new PDF($headers, $widths, $address, $invoice, $totalAmount);
    $pdf->AddPage();
    $pdf->SetAutoPageBreak(false, 0);
    $pdf->SetMargins(10, 10, 10);

    // $texts = [
    //     ['Prueba1 Prueba Prueba Prueba Prueba Prueba PruebaPrueba Prueba PruebaPrueba Prueba Prueba', '1', '2', '3', '4'],
    //     ['Prueba2 Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba', '1', '2', '3', '4'],
    //     ['Prueba3 Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba', '1', '2', '3', '4'],
    //     ['Prueba4 Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba', '1', '2', '3', '4'],
    //     ['Prueba5 Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba', '1', '2', '3', '4'],
    //     ['Prueba6 Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba', '1', '2', '3', '4'],
    //     ['Prueba7 Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba', '1', '2', '3', '4'],
    //     ['Prueba8 Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    //     ['Prueba', '1', '2', '3', '4'],
    // ];
    $aligns = ['L', 'C', 'C', 'R', 'R'];

    printTable($pdf, $products, $aligns);

    if (!is_dir(__ROOT__ . '/billing/invoices')) {
        mkdir(__ROOT__ . '/billing/invoices', 0777, true);
    }

    $pdf->Output(__ROOT__ . '/billing/invoices' . "/invoice$order_id.pdf", 'F');
}
?>
<?php
class Invoice
{
    private ?int $id;
    private string $id_code;
    private bool $is_active;
    private int $order_id;
    private string $invoice_date;
    private float $total_amount;
    private float $tax_amount;
    private float $subtotal;
    private string $status;
    private ?string $status_date;
    private ?string $notes;
    private string $ip_address;
    private string $server_language;
    private string $form_language;
    private string $created_at;
    private string $updated_at;

    public function __construct(
        ?int $id,
        string $id_code,
        bool $is_active,
        int $order_id,
        string $invoice_date,
        float $total_amount,
        float $tax_amount,
        float $subtotal,
        string $status,
        ?string $status_date,
        ?string $notes,
        string $ip_address,
        string $server_language,
        string $form_language,
        string $created_at,
        string $updated_at
    ) {
        $this->id = $id;
        $this->id_code = $id_code;
        $this->is_active = $is_active;
        $this->order_id = $order_id;
        $this->invoice_date = $invoice_date;
        $this->total_amount = $total_amount;
        $this->tax_amount = $tax_amount;
        $this->subtotal = $subtotal;
        $this->status = $status;
        $this->status_date = $status_date;
        $this->notes = $notes;
        $this->ip_address = $ip_address;
        $this->server_language = $server_language;
        $this->form_language = $form_language;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getIdCode(): string
    {
        return $this->id_code;
    }

    public function setIdCode(string $id_code): void
    {
        $this->id_code = $id_code;
    }

    public function getIsActive(): bool
    {
        return $this->is_active;
    }

    public function setIsActive(bool $is_active): void
    {
        $this->is_active = $is_active;
    }

    public function getOrderId(): int
    {
        return $this->order_id;
    }

    public function setOrderId(int $order_id): void
    {
        $this->order_id = $order_id;
    }

    public function getInvoiceDate(): string
    {
        return $this->invoice_date;
    }

    public function setInvoiceDate(string $invoice_date): void
    {
        $this->invoice_date = $invoice_date;
    }

    public function getTotalAmount(): float
    {
        return $this->total_amount;
    }

    public function setTotalAmount(float $total_amount): void
    {
        $this->total_amount = $total_amount;
    }

    public function getTaxAmount(): float
    {
        return $this->tax_amount;
    }

    public function setTaxAmount(float $tax_amount): void
    {
        $this->tax_amount = $tax_amount;
    }

    public function getSubtotal(): float
    {
        return $this->subtotal;
    }

    public function setSubtotal(float $subtotal): void
    {
        $this->subtotal = $subtotal;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }

    public function getStatusDate(): ?string
    {
        return $this->status_date;
    }

    public function setStatusDate(?string $status_date): void
    {
        $this->status_date = $status_date;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function setNotes(?string $notes): void
    {
        $this->notes = $notes;
    }

    public function getIpAddress(): string
    {
        return $this->ip_address;
    }

    public function setIpAddress(string $ip_address): void
    {
        $this->ip_address = $ip_address;
    }

    public function getServerLanguage(): string
    {
        return $this->server_language;
    }

    public function setServerLanguage(string $server_language): void
    {
        $this->server_language = $server_language;
    }

    public function getFormLanguage(): string
    {
        return $this->form_language;
    }

    public function setFormLanguage(string $form_language): void
    {
        $this->form_language = $form_language;
    }

    public function getCreatedAt(): string
    {
        return $this->created_at;
    }

    public function setCreatedAt(string $created_at): void
    {
        $this->created_at = $created_at;
    }

    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(string $updated_at): void
    {
        $this->updated_at = $updated_at;
    }
}
?>
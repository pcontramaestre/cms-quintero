<?php
class Receipt
{
    private ?int $id;
    private string $id_code;
    private bool $is_active;
    private int $order_id;
    private string $receipt_date;
    private float $amount_paid;
    private ?string $payment_method;
    private ?string $transaction_id;
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
        string $receipt_date,
        float $amount_paid,
        ?string $payment_method,
        ?string $transaction_id,
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
        $this->receipt_date = $receipt_date;
        $this->amount_paid = $amount_paid;
        $this->payment_method = $payment_method;
        $this->transaction_id = $transaction_id;
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

    public function getReceiptDate(): string
    {
        return $this->receipt_date;
    }

    public function setReceiptDate(string $receipt_date): void
    {
        $this->receipt_date = $receipt_date;
    }

    public function getAmountPaid(): float
    {
        return $this->amount_paid;
    }

    public function setAmountPaid(float $amount_paid): void
    {
        $this->amount_paid = $amount_paid;
    }

    public function getPaymentMethod(): ?string
    {
        return $this->payment_method;
    }

    public function setPaymentMethod(?string $payment_method): void
    {
        $this->payment_method = $payment_method;
    }

    public function getTransactionId(): ?string
    {
        return $this->transaction_id;
    }

    public function setTransactionId(?string $transaction_id): void
    {
        $this->transaction_id = $transaction_id;
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
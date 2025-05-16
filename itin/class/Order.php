<?php
class Order
{
    private ?int $id;
    private string $id_code;
    private bool $is_active;
    private int $customer_id;
    private ?int $provider_id;
    private int $service_record_id;
    private float $amount;
    private string $status;
    private string $status_date;
    private string $ip_address;
    private string $server_language;
    private string $form_language;
    private string $created_at;
    private string $updated_at;

    public function __construct(
        ?int $id,
        string $id_code,
        bool $is_active,
        int $customer_id,
        ?int $provider_id,
        int $service_record_id,
        float $amount,
        string $status,
        string $status_date,
        string $ip_address,
        string $server_language,
        string $form_language,
        string $created_at,
        string $updated_at
    ) {
        $this->id = $id;
        $this->id_code = $id_code;
        $this->is_active = $is_active;
        $this->customer_id = $customer_id;
        $this->provider_id = $provider_id;
        $this->service_record_id = $service_record_id;
        $this->amount = $amount;
        $this->status = $status;
        $this->status_date = $status_date;
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

    public function getCustomerId(): int
    {
        return $this->customer_id;
    }

    public function setCustomerId(?int $customer_id): void
    {
        $this->customer_id = $customer_id;
    }

    public function getProviderId(): ?int
    {
        return $this->provider_id;
    }

    public function setProviderId(int $provider_id): void
    {
        $this->provider_id = $provider_id;
    }

    public function getServiceRecordId(): int
    {
        return $this->service_record_id;
    }

    public function setServiceRecordId(int $service_record_id): void
    {
        $this->service_record_id = $service_record_id;
    }

    public function getAmount(): float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): void
    {
        $this->amount = $amount;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }

    public function getStatusDate(): string
    {
        return $this->status_date;
    }

    public function setStatusDate(string $status_date): void
    {
        $this->status_date = $status_date;
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
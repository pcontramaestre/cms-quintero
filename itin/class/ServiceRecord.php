<?php
class ServiceRecord
{
    private ?int $id;
    private string $id_code;
    private bool $is_active;
    private int $service_id;
    private string $purchase_date;
    private float $price;
    private int $customer_id;
    private string $service_type;
    private string $service_for;
    private int $individual_id;
    private int $business_id;
    private int $recipient_id;
    private string $start_date;
    private string $estimate_completion_date;
    private string $folder_path;
    private string $status;
    private string $status_date;
    private ?string $notes;
    private bool $is_subscription;
    private ?string $plan;
    private ?string $expiry_date;
    private ?string $renewal_period;
    private ?string $last_renewal;
    private bool $autorenew;
    private string $ip_address;
    private string $server_language;
    private string $form_language;
    private string $created_at;
    private string $updated_at;

    public function __construct(
        ?int $id,
        string $id_code,
        bool $is_active,
        int $service_id,
        string $purchase_date,
        float $price,
        int $customer_id,
        string $service_type,
        string $service_for,
        int $individual_id,
        int $business_id,
        int $recipient_id,
        string $start_date,
        string $estimate_completion_date,
        string $folder_path,
        string $status,
        string $status_date,
        ?string $notes,
        bool $is_subscription,
        ?string $plan,
        ?string $expiry_date,
        ?string $renewal_period,
        ?string $last_renewal,
        bool $autorenew,
        string $ip_address,
        string $server_language,
        string $form_language,
        string $created_at,
        string $updated_at
    ) {
        $this->id = $id;
        $this->id_code = $id_code;
        $this->is_active = $is_active;
        $this->service_id = $service_id;
        $this->purchase_date = $purchase_date;
        $this->price = $price;
        $this->customer_id = $customer_id;
        $this->service_type = $service_type;
        $this->service_for = $service_for;
        $this->individual_id = $individual_id;
        $this->business_id = $business_id;
        $this->recipient_id = $recipient_id;
        $this->start_date = $start_date;
        $this->estimate_completion_date = $estimate_completion_date;
        $this->folder_path = $folder_path;
        $this->status = $status;
        $this->status_date = $status_date;
        $this->notes = $notes;
        $this->is_subscription = $is_subscription;
        $this->plan = $plan;
        $this->expiry_date = $expiry_date;
        $this->renewal_period = $renewal_period;
        $this->last_renewal = $last_renewal;
        $this->autorenew = $autorenew;
        $this->ip_address = $ip_address;
        $this->server_language = $server_language;
        $this->form_language = $form_language;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public function getId(): int|null
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getIdCode(): string
    {
        return $this->id_code;
    }

    public function setIdCode($id_code): void
    {
        $this->id_code = $id_code;
    }

    public function getIsActive(): bool
    {
        return $this->is_active;
    }

    public function setIsActive($is_active): void
    {
        $this->is_active = $is_active;
    }

    public function getServiceId(): int
    {
        return $this->service_id;
    }

    public function setServiceId($service_id): void
    {
        $this->service_id = $service_id;
    }

    public function getPurchaseDate(): string
    {
        return $this->purchase_date;
    }

    public function setPurchaseDate($purchase_date): void
    {
        $this->purchase_date = $purchase_date;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice($price): void
    {
        $this->price = $price;
    }

    public function getCustomerId(): int
    {
        return $this->customer_id;
    }

    public function setCustomerId($customer_id): void
    {
        $this->customer_id = $customer_id;
    }

    public function getServiceType(): string
    {
        return $this->service_type;
    }

    public function setServiceType($service_type): void
    {
        $this->service_type = $service_type;
    }

    public function getServiceFor(): string
    {
        return $this->service_for;
    }

    public function setServiceFor($service_for): void
    {
        $this->service_for = $service_for;
    }

    public function getIndividualId(): int
    {
        return $this->individual_id;
    }

    public function setIndividualId($individual_id): void
    {
        $this->individual_id = $individual_id;
    }

    public function getBusinessId(): int
    {
        return $this->business_id;
    }

    public function setBusinessId($business_id): void
    {
        $this->business_id = $business_id;
    }

    public function getRecipientId(): int
    {
        return $this->recipient_id;
    }

    public function setRecipientId($recipient_id): void
    {
        $this->recipient_id = $recipient_id;
    }

    public function getStartDate(): string
    {
        return $this->start_date;
    }

    public function setStartDate($start_date): void
    {
        $this->start_date = $start_date;
    }

    public function getEstimateCompletionDate(): string
    {
        return $this->estimate_completion_date;
    }

    public function setEstimateCompletionDate($estimate_completion_date): void
    {
        $this->estimate_completion_date = $estimate_completion_date;
    }

    public function getFolderPath(): string
    {
        return $this->folder_path;
    }

    public function setFolderPath($folder_path): void
    {
        $this->folder_path = $folder_path;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus($status): void
    {
        $this->status = $status;
    }

    public function getStatusDate(): string
    {
        return $this->status_date;
    }

    public function setStatusDate($status_date): void
    {
        $this->status_date = $status_date;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function setNotes($notes): void
    {
        $this->notes = $notes;
    }

    public function getIsSubscription(): bool
    {
        return $this->is_subscription;
    }

    public function setIsSubscription($is_subscription): void
    {
        $this->is_subscription = $is_subscription;
    }

    public function getPlan(): string|null
    {
        return $this->plan;
    }

    public function setPlan($plan): void
    {
        $this->plan = $plan;
    }

    public function getExpiryDate(): string|null
    {
        return $this->expiry_date;
    }

    public function setExpiryDate($expiry_date): void
    {
        $this->expiry_date = $expiry_date;
    }

    public function getRenewalPeriod(): string|null
    {
        return $this->renewal_period;
    }

    public function setRenewalPeriod($renewal_period): void
    {
        $this->renewal_period = $renewal_period;
    }

    public function getLastRenewal(): string|null
    {
        return $this->last_renewal;
    }

    public function setLastRenewal($last_renewal): void
    {
        $this->last_renewal = $last_renewal;
    }

    public function getAutorenew(): bool
    {
        return $this->autorenew;
    }

    public function setAutorenew($autorenew): void
    {
        $this->autorenew = $autorenew;
    }

    public function getIpAddress(): string
    {
        return $this->ip_address;
    }

    public function setIpAddress($ip_address): void
    {
        $this->ip_address = $ip_address;
    }

    public function getServerLanguage(): string
    {
        return $this->server_language;
    }

    public function setServerLanguage($server_language): void
    {
        $this->server_language = $server_language;
    }

    public function getFormLanguage(): string
    {
        return $this->form_language;
    }

    public function setFormLanguage($form_language): void
    {
        $this->form_language = $form_language;
    }

    public function getCreatedAt(): string
    {
        return $this->created_at;
    }

    public function setCreatedAt($created_at): void
    {
        $this->created_at = $created_at;
    }

    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    public function setUpdatedAt($updated_at): void
    {
        $this->updated_at = $updated_at;
    }
}
?>
<?php
class ITINSummary
{
    private ?int $id;
    private string $id_code;
    private int $is_active;
    private int $itin_application_id;
    private int $customer_id;
    private int $individual_id;
    private int $service_record_id;
    private string $application_date;
    private bool $w7;
    private bool $caa;
    private bool $tax_return;
    private bool $form_a_company;
    private string $itin_type;
    private string $reason;
    private bool $shipping;
    private ?string $shipping_date;
    private ?string $carrier;
    private ?string $tracking;
    private string $status;
    private ?string $status_date;
    private ?string $documents;
    private ?string $notes;
    private string $ip_address;
    private string $server_language;
    private string $form_language;
    private string $created_at;
    private string $updated_at;

    public function __construct(
        ?int $id,
        string $id_code,
        int $is_active,
        int $itin_application_id,
        int $customer_id,
        int $individual_id,
        int $service_record_id,
        string $application_date,
        bool $w7,
        bool $caa,
        bool $tax_return,
        bool $form_a_company,
        string $itin_type,
        string $reason,
        bool $shipping,
        ?string $shipping_date,
        ?string $carrier,
        ?string $tracking,
        string $status,
        ?string $status_date,
        ?string $documents,
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
        $this->itin_application_id = $itin_application_id;
        $this->customer_id = $customer_id;
        $this->individual_id = $individual_id;
        $this->service_record_id = $service_record_id;
        $this->application_date = $application_date;
        $this->w7 = $w7;
        $this->caa = $caa;
        $this->tax_return = $tax_return;
        $this->form_a_company = $form_a_company;
        $this->itin_type = $itin_type;
        $this->reason = $reason;
        $this->shipping = $shipping;
        $this->shipping_date = $shipping_date;
        $this->carrier = $carrier;
        $this->tracking = $tracking;
        $this->status = $status;
        $this->status_date = $status_date;
        $this->documents = $documents;
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

    public function getIdCode(): string
    {
        return $this->id_code;
    }

    public function getIsActive(): int
    {
        return $this->is_active;
    }

    public function getItinApplicationId(): int
    {
        return $this->itin_application_id;
    }

    public function getCustomerId(): int
    {
        return $this->customer_id;
    }

    public function getIndividualId(): int
    {
        return $this->individual_id;
    }

    public function getServiceRecordId(): int
    {
        return $this->service_record_id;
    }

    public function getApplicationDate(): string
    {
        return $this->application_date;
    }

    public function getW7(): bool
    {
        return $this->w7;
    }

    public function getCaa(): bool
    {
        return $this->caa;
    }

    public function getTaxReturn(): bool
    {
        return $this->tax_return;
    }

    public function getFormACompany(): bool
    {
        return $this->form_a_company;
    }

    public function getItinType(): string
    {
        return $this->itin_type;
    }

    public function getReason(): string
    {
        return $this->reason;
    }

    public function getShipping(): bool
    {
        return $this->shipping;
    }

    public function getShippingDate(): ?string
    {
        return $this->shipping_date;
    }

    public function getCarrier(): ?string
    {
        return $this->carrier;
    }

    public function getTracking(): ?string
    {
        return $this->tracking;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getStatusDate(): ?string
    {
        return $this->status_date;
    }

    public function getDocuments(): ?string
    {
        return $this->documents;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function getIpAddress(): string
    {
        return $this->ip_address;
    }

    public function getServerLanguage(): string
    {
        return $this->server_language;
    }

    public function getFormLanguage(): string
    {
        return $this->form_language;
    }

    public function getCreatedAt(): string
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function setIdCode(string $id_code): void
    {
        $this->id_code = $id_code;
    }

    public function setIsActive(int $is_active): void
    {
        $this->is_active = $is_active;
    }

    public function setItinApplicationId(int $itin_application_id): void
    {
        $this->itin_application_id = $itin_application_id;
    }

    public function setCustomerId(int $customer_id): void
    {
        $this->customer_id = $customer_id;
    }

    public function setIndividualId(int $individual_id): void
    {
        $this->individual_id = $individual_id;
    }

    public function setServiceRecordId(int $service_record_id): void
    {
        $this->service_record_id = $service_record_id;
    }

    public function setApplicationDate(string $application_date): void
    {
        $this->application_date = $application_date;
    }

    public function setW7(bool $w7): void
    {
        $this->w7 = $w7;
    }

    public function setCaa(bool $caa): void
    {
        $this->caa = $caa;
    }

    public function setTaxReturn(bool $tax_return): void
    {
        $this->tax_return = $tax_return;
    }

    public function setFormACompany(bool $form_a_company): void
    {
        $this->form_a_company = $form_a_company;
    }

    public function setItinType(string $itin_type): void
    {
        $this->itin_type = $itin_type;
    }

    public function setReason(string $reason): void
    {
        $this->reason = $reason;
    }

    public function setShipping(bool $shipping): void
    {
        $this->shipping = $shipping;
    }

    public function setShippingDate(?string $shipping_date): void
    {
        $this->shipping_date = $shipping_date;
    }

    public function setCarrier(?string $carrier): void
    {
        $this->carrier = $carrier;
    }

    public function setTracking(?string $tracking): void
    {
        $this->tracking = $tracking;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }

    public function setStatusDate(?string $status_date): void
    {
        $this->status_date = $status_date;
    }

    public function setDocuments(?string $documents): void
    {
        $this->documents = $documents;
    }

    public function setNotes(?string $notes): void
    {
        $this->notes = $notes;
    }

    public function setIpAddress(string $ip_address): void
    {
        $this->ip_address = $ip_address;
    }

    public function setServerLanguage(string $server_language): void
    {
        $this->server_language = $server_language;
    }

    public function setFormLanguage(string $form_language): void
    {
        $this->form_language = $form_language;
    }

    public function setCreatedAt(string $created_at): void
    {
        $this->created_at = $created_at;
    }

    public function setUpdatedAt(string $updated_at): void
    {
        $this->updated_at = $updated_at;
    }
}
?>
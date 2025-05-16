<?php
class Email
{
    private ?int $id;
    private string $id_code;
    private int $is_active;
    private int $is_user;
    private int $user_id;
    private int $is_customer;
    private int $customer_id;
    private int $is_individual;
    private int $individual_id;
    private ?string $name;
    private string $address;
    private int $is_default;
    private string $type;
    private int $is_verified;
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
        int $is_active,
        int $is_user,
        int $user_id,
        int $is_customer,
        int $customer_id,
        int $is_individual,
        int $individual_id,
        ?string $name,
        string $address,
        int $is_default,
        string $type,
        int $is_verified,
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
        $this->is_user = $is_user;
        $this->user_id = $user_id;
        $this->is_customer = $is_customer;
        $this->customer_id = $customer_id;
        $this->is_individual = $is_individual;
        $this->individual_id = $individual_id;
        $this->name = $name;
        $this->address = $address;
        $this->is_default = $is_default;
        $this->type = $type;
        $this->is_verified = $is_verified;
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

    public function getIsActive(): int
    {
        return $this->is_active;
    }

    public function setIsActive(int $is_active): void
    {
        $this->is_active = $is_active;
    }

    public function getIsUser(): int
    {
        return $this->is_user;
    }

    public function setIsUser(int $is_user): void
    {
        $this->is_user = $is_user;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }

    public function getIsCustomer(): int
    {
        return $this->is_customer;
    }

    public function setIsCustomer(int $is_customer): void
    {
        $this->is_customer = $is_customer;
    }

    public function getCustomerId(): int
    {
        return $this->customer_id;
    }

    public function setCustomerId(int $customer_id): void
    {
        $this->customer_id = $customer_id;
    }

    public function getIsIndividual(): int
    {
        return $this->is_individual;
    }

    public function setIsIndividual(int $is_individual): void
    {
        $this->is_individual = $is_individual;
    }

    public function getIndividualId(): int
    {
        return $this->individual_id;
    }

    public function setIndividualId(int $individual_id): void
    {
        $this->individual_id = $individual_id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): void
    {
        $this->address = $address;
    }

    public function getIsDefault(): int
    {
        return $this->is_default;
    }

    public function setIsDefault(int $is_default): void
    {
        $this->is_default = $is_default;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getIsVerified(): int
    {
        return $this->is_verified;
    }

    public function setIsVerified(int $is_verified): void
    {
        $this->is_verified = $is_verified;
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
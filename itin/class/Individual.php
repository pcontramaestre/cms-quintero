<?php
class Individual
{
    private ?int $id;
    private string $id_code;
    private int $is_active;
    private int $customer_id;
    private string $name;
    private string $industry;
    private string $tax_id;
    private string $folder_path;
    private string $profile_picture;
    private string $status;
    private string $status_date;
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
        int $customer_id,
        string $name,
        string $industry,
        string $tax_id,
        string $folder_path,
        string $profile_picture,
        string $status,
        string $status_date,
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
        $this->customer_id = $customer_id;
        $this->name = $name;
        $this->industry = $industry;
        $this->tax_id = $tax_id;
        $this->folder_path = $folder_path;
        $this->profile_picture = $profile_picture;
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

    public function getCustomerId(): int
    {
        return $this->customer_id;
    }

    public function setCustomerId(int $customer_id): void
    {
        $this->customer_id = $customer_id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getIndustry(): string
    {
        return $this->industry;
    }

    public function setIndustry(string $industry): void
    {
        $this->industry = $industry;
    }

    public function getTaxId(): string
    {
        return $this->tax_id;
    }

    public function setTaxId(string $tax_id): void
    {
        $this->tax_id = $tax_id;
    }

    public function getFolderPath(): string
    {
        return $this->folder_path;
    }

    public function setFolderPath(string $folder_path): void
    {
        $this->folder_path = $folder_path;
    }

    public function getProfilePicture(): string
    {
        return $this->profile_picture;
    }

    public function setProfilePicture(string $profile_picture): void
    {
        $this->profile_picture = $profile_picture;
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
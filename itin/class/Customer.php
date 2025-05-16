<?php
class Customer
{
    private ?int $id;
    private string $id_code;
    private int $is_active;
    private ?int $user_id;
    private string $first_name;
    private string $middle_name;
    private string $last_name;
    private string $date_of_birth;
    private string $gender;
    private string $marital_status;
    private string $occupation;
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
        ?int $user_id,
        string $first_name,
        string $middle_name,
        string $last_name,
        string $date_of_birth,
        string $gender,
        string $marital_status,
        string $occupation,
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
        $this->user_id = $user_id;
        $this->first_name = $first_name;
        $this->middle_name = $middle_name;
        $this->last_name = $last_name;
        $this->date_of_birth = $date_of_birth;
        $this->gender = $gender;
        $this->marital_status = $marital_status;
        $this->occupation = $occupation;
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

    public function getIdCode(): string
    {
        return $this->id_code;
    }

    public function getIsActive(): int
    {
        return $this->is_active;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function getFirstName(): string
    {
        return $this->first_name;
    }

    public function getMiddleName(): string
    {
        return $this->middle_name;
    }

    public function getLastName(): string
    {
        return $this->last_name;
    }

    public function getDateOfBirth(): string
    {
        return $this->date_of_birth;
    }

    public function getGender(): string
    {
        return $this->gender;
    }

    public function getMaritalStatus(): string
    {
        return $this->marital_status;
    }

    public function getOccupation(): string
    {
        return $this->occupation;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getStatusDate(): string
    {
        return $this->status_date;
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

    public function setUserId(?int $user_id): void
    {
        $this->user_id = $user_id;
    }

    public function setFirstName(string $first_name): void
    {
        $this->first_name = $first_name;
    }

    public function setMiddleName(string $middle_name): void
    {
        $this->middle_name = $middle_name;
    }

    public function setLastName(string $last_name): void
    {
        $this->last_name = $last_name;
    }

    public function setDateOfBirth(string $date_of_birth): void
    {
        $this->date_of_birth = $date_of_birth;
    }

    public function setGender(string $gender): void
    {
        $this->gender = $gender;
    }

    public function setMaritalStatus(string $marital_status): void
    {
        $this->marital_status = $marital_status;
    }

    public function setOccupation(string $occupation): void
    {
        $this->occupation = $occupation;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }

    public function setStatusDate(string $status_date): void
    {
        $this->status_date = $status_date;
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
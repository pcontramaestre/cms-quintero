<?php
class State
{
    private ?int $id;
    private ?int $is_active;
    private ?int $country_id;
    private ?string $en_name;
    private ?string $en_td;
    private ?string $es_name;
    private ?string $es_td;
    private ?string $pt_name;
    private ?string $pt_td;
    private ?string $zh_name;
    private ?string $zh_td;
    private ?string $iso_code;
    private ?string $status;
    private ?string $status_date;
    private ?string $ip_address;
    private ?string $server_language;
    private ?string $form_language;
    private ?string $created_at;
    private ?string $updated_at;

    public function __construct(
        ?int $id = null,
        ?int $is_active = null,
        ?int $country_id = null,
        ?string $en_name = null,
        ?string $en_td = null,
        ?string $es_name = null,
        ?string $es_td = null,
        ?string $pt_name = null,
        ?string $pt_td = null,
        ?string $zh_name = null,
        ?string $zh_td = null,
        ?string $iso_code = null,
        ?string $status = null,
        ?string $status_date = null,
        ?string $ip_address = null,
        ?string $server_language = null,
        ?string $form_language = null,
        ?string $created_at = null,
        ?string $updated_at = null
    ) {
        $this->id = $id;
        $this->is_active = $is_active;
        $this->country_id = $country_id;
        $this->en_name = $en_name;
        $this->en_td = $en_td;
        $this->es_name = $es_name;
        $this->es_td = $es_td;
        $this->pt_name = $pt_name;
        $this->pt_td = $pt_td;
        $this->zh_name = $zh_name;
        $this->zh_td = $zh_td;
        $this->iso_code = $iso_code;
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

    public function getIsActive(): ?int
    {
        return $this->is_active;
    }

    public function setIsActive(?int $is_active): void
    {
        $this->is_active = $is_active;
    }

    public function getCountryId(): ?int
    {
        return $this->country_id;
    }

    public function setCountryId(?int $country_id): void
    {
        $this->country_id = $country_id;
    }

    public function getEnName(): ?string
    {
        return $this->en_name;
    }

    public function setEnName(?string $en_name): void
    {
        $this->en_name = $en_name;
    }

    public function getEnTd(): ?string
    {
        return $this->en_td;
    }

    public function setEnTd(?string $en_td): void
    {
        $this->en_td = $en_td;
    }

    public function getEsName(): ?string
    {
        return $this->es_name;
    }

    public function setEsName(?string $es_name): void
    {
        $this->es_name = $es_name;
    }

    public function getEsTd(): ?string
    {
        return $this->es_td;
    }

    public function setEsTd(?string $es_td): void
    {
        $this->es_td = $es_td;
    }

    public function getPtName(): ?string
    {
        return $this->pt_name;
    }

    public function setPtName(?string $pt_name): void
    {
        $this->pt_name = $pt_name;
    }

    public function getPtTd(): ?string
    {
        return $this->pt_td;
    }

    public function setPtTd(?string $pt_td): void
    {
        $this->pt_td = $pt_td;
    }

    public function getZhName(): ?string
    {
        return $this->zh_name;
    }

    public function setZhName(?string $zh_name): void
    {
        $this->zh_name = $zh_name;
    }

    public function getZhTd(): ?string
    {
        return $this->zh_td;
    }

    public function setZhTd(?string $zh_td): void
    {
        $this->zh_td = $zh_td;
    }

    public function getIsoCode(): ?string
    {
        return $this->iso_code;
    }

    public function setIsoCode(?string $iso_code): void
    {
        $this->iso_code = $iso_code;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): void
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

    public function getIpAddress(): ?string
    {
        return $this->ip_address;
    }

    public function setIpAddress(?string $ip_address): void
    {
        $this->ip_address = $ip_address;
    }

    public function getServerLanguage(): ?string
    {
        return $this->server_language;
    }

    public function setServerLanguage(?string $server_language): void
    {
        $this->server_language = $server_language;
    }

    public function getFormLanguage(): ?string
    {
        return $this->form_language;
    }

    public function setFormLanguage(?string $form_language): void
    {
        $this->form_language = $form_language;
    }

    public function getCreatedAt(): ?string
    {
        return $this->created_at;
    }

    public function setCreatedAt(?string $created_at): void
    {
        $this->created_at = $created_at;
    }

    public function getUpdatedAt(): ?string
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?string $updated_at): void
    {
        $this->updated_at = $updated_at;
    }
}
?>
<?php
class Country
{
    private ?int $id;
    private int $is_active;
    private ?string $alpha2_code;
    private ?string $alpha3_code;
    private ?string $numeric_code;
    private ?string $en_name;
    private ?string $es_name;
    private ?string $pt_name;
    private ?string $zh_name;
    private ?string $phone_code;
    private ?string $internet_domain;
    private ?string $currency;
    private string $currency_code;
    private ?string $flag_path;
    private ?string $status;
    private ?string $status_date;
    private ?string $ip_address;
    private ?string $server_language;
    private ?string $form_language;
    private string $created_at;
    private string $updated_at;

    public function __construct(
        ?int $id,
        int $is_active,
        ?string $alpha2_code,
        ?string $alpha3_code,
        ?string $numeric_code,
        ?string $en_name,
        ?string $es_name,
        ?string $pt_name,
        ?string $zh_name,
        ?string $phone_code,
        ?string $internet_domain,
        ?string $currency,
        string $currency_code,
        ?string $flag_path,
        ?string $status,
        ?string $status_date,
        ?string $ip_address,
        ?string $server_language,
        ?string $form_language,
        string $created_at,
        string $updated_at
    ) {
        $this->id = $id;
        $this->is_active = $is_active;
        $this->alpha2_code = $alpha2_code;
        $this->alpha3_code = $alpha3_code;
        $this->numeric_code = $numeric_code;
        $this->en_name = $en_name;
        $this->es_name = $es_name;
        $this->pt_name = $pt_name;
        $this->zh_name = $zh_name;
        $this->phone_code = $phone_code;
        $this->internet_domain = $internet_domain;
        $this->currency = $currency;
        $this->currency_code = $currency_code;
        $this->flag_path = $flag_path;
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

    public function getIsActive(): int
    {
        return $this->is_active;
    }

    public function setIsActive(int $is_active): void
    {
        $this->is_active = $is_active;
    }

    public function getAlpha2Code(): ?string
    {
        return $this->alpha2_code;
    }

    public function setAlpha2Code(?string $alpha2_code): void
    {
        $this->alpha2_code = $alpha2_code;
    }

    public function getAlpha3Code(): ?string
    {
        return $this->alpha3_code;
    }

    public function setAlpha3Code(?string $alpha3_code): void
    {
        $this->alpha3_code = $alpha3_code;
    }

    public function getNumericCode(): ?string
    {
        return $this->numeric_code;
    }

    public function setNumericCode(?string $numeric_code): void
    {
        $this->numeric_code = $numeric_code;
    }

    public function getEnName(): ?string
    {
        return $this->en_name;
    }

    public function setEnName(?string $en_name): void
    {
        $this->en_name = $en_name;
    }

    public function getEsName(): ?string
    {
        return $this->es_name;
    }

    public function setEsName(?string $es_name): void
    {
        $this->es_name = $es_name;
    }

    public function getPtName(): ?string
    {
        return $this->pt_name;
    }

    public function setPtName(?string $pt_name): void
    {
        $this->pt_name = $pt_name;
    }

    public function getZhName(): ?string
    {
        return $this->zh_name;
    }

    public function setZhName(?string $zh_name): void
    {
        $this->zh_name = $zh_name;
    }

    public function getPhoneCode(): ?string
    {
        return $this->phone_code;
    }

    public function setPhoneCode(?string $phone_code): void
    {
        $this->phone_code = $phone_code;
    }

    public function getInternetDomain(): ?string
    {
        return $this->internet_domain;
    }

    public function setInternetDomain(?string $internet_domain): void
    {
        $this->internet_domain = $internet_domain;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(?string $currency): void
    {
        $this->currency = $currency;
    }

    public function getCurrencyCode(): string
    {
        return $this->currency_code;
    }

    public function setCurrencyCode(string $currency_code): void
    {
        $this->currency_code = $currency_code;
    }

    public function getFlagPath(): ?string
    {
        return $this->flag_path;
    }

    public function setFlagPath(?string $flag_path): void
    {
        $this->flag_path = $flag_path;
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
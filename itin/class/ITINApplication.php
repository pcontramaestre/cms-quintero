<?php
class ITINApplication
{
    private $id;
    private $id_code;
    private $is_active;
    private $application_date;
    private $itin_type;
    private $reason;
    private $treaty_country_for_nonresident;
    private $treaty_article_for_nonresident;
    private $relationship_to_us_citizen;
    private $relative_info;
    private $spouse_info;
    private $treaty_country_for_nonresident_spr;
    private $treaty_article_for_nonresident_spr;
    private $other_info;
    private $first_name;
    private $middle_name;
    private $last_name;
    private $first_name_at_birth;
    private $middle_name_at_birth;
    private $last_name_at_birth;
    private $us_address_line1;
    private $us_city;
    private $us_state;
    private $us_zip_code;
    private $us_phone;
    private $non_us_address_line1;
    private $non_us_city;
    private $non_us_state;
    private $non_us_country;
    private $non_us_zip_code;
    private $non_us_country_phone_code;
    private $non_us_phone;
    private $date_of_birth;
    private $country_of_birth;
    private $birth_city;
    private $birth_state;
    private $gender;
    private $country_of_citizenship;
    private $foreign_tax_id;
    private $us_visa_type;
    private $us_visa_number;
    private $us_visa_exp_date;
    private $passport;
    private $passport_issued_by;
    private $passport_number;
    private $passport_exp_date;
    private $drivers_license;
    private $drivers_license_issued_by;
    private $drivers_license_number;
    private $drivers_license_exp_date;
    private $state_id;
    private $state_id_issued_by;
    private $state_id_number;
    private $state_id_exp_date;
    private $uscis_documentation;
    private $uscis_documentation_type;
    private $uscis_documentation_issued_by;
    private $uscis_documentation_number;
    private $uscis_documentation_exp_date;
    private $other_documentation;
    private $other_documentation_type;
    private $other_documentation_issued_by;
    private $other_documentation_number;
    private $other_documentation_exp_date;
    private $issued_by;
    private $id_no;
    private $exp_date;
    private $entry_date;
    private $itin_or_irsn;
    private $itin_or_irsn_no;
    private $itin_or_irs_first_name;
    private $itin_or_irs_middle_name;
    private $itin_or_irs_last_name;
    private $college_univ_company;
    private $college_univ_company_city;
    private $college_univ_company_state;
    private $length_of_stay;
    private $email;
    private $payer_id;
    private $billing;
    private $status;
    private $status_date;
    private $notes;
    private $ip_address;
    private $server_language;
    private $form_language;
    private $created_at;
    private $updated_at;

    public function __construct($id, $id_code, $is_active, $application_date, $itin_type, $reason, $treaty_country_for_nonresident, $treaty_article_for_nonresident, $relationship_to_us_citizen, $relative_info, $spouse_info, $treaty_country_for_nonresident_spr, $treaty_article_for_nonresident_spr, $other_info, $first_name, $middle_name, $last_name, $first_name_at_birth, $middle_name_at_birth, $last_name_at_birth, $us_address_line1, $us_city, $us_state, $us_zip_code, $us_phone, $non_us_address_line1, $non_us_city, $non_us_state, $non_us_country, $non_us_zip_code, $non_us_country_phone_code, $non_us_phone, $date_of_birth, $country_of_birth, $birth_city, $birth_state, $gender, $country_of_citizenship, $foreign_tax_id, $us_visa_type, $us_visa_number, $us_visa_exp_date, $passport, $passport_issued_by, $passport_number, $passport_exp_date, $drivers_license, $drivers_license_issued_by, $drivers_license_number, $drivers_license_exp_date, $state_id, $state_id_issued_by, $state_id_number, $state_id_exp_date, $uscis_documentation, $uscis_documentation_type, $uscis_documentation_issued_by, $uscis_documentation_number, $uscis_documentation_exp_date, $other_documentation, $other_documentation_type, $other_documentation_issued_by, $other_documentation_number, $other_documentation_exp_date, $issued_by, $id_no, $exp_date, $entry_date, $itin_or_irsn, $itin_or_irsn_no, $itin_or_irs_first_name, $itin_or_irs_middle_name, $itin_or_irs_last_name, $college_univ_company, $college_univ_company_city, $college_univ_company_state, $length_of_stay, $email, $payer_id, $billing, $status, $status_date, $notes, $ip_address, $server_language, $form_language, $created_at, $updated_at)
    {
        $this->id = $id;
        $this->id_code = $id_code;
        $this->is_active = $is_active;
        $this->application_date = $application_date;
        $this->itin_type = $itin_type;
        $this->reason = $reason;
        $this->treaty_country_for_nonresident = $treaty_country_for_nonresident;
        $this->treaty_article_for_nonresident = $treaty_article_for_nonresident;
        $this->relationship_to_us_citizen = $relationship_to_us_citizen;
        $this->relative_info = $relative_info;
        $this->spouse_info = $spouse_info;
        $this->treaty_country_for_nonresident_spr = $treaty_country_for_nonresident_spr;
        $this->treaty_article_for_nonresident_spr = $treaty_article_for_nonresident_spr;
        $this->other_info = $other_info;
        $this->first_name = $first_name;
        $this->middle_name = $middle_name;
        $this->last_name = $last_name;
        $this->first_name_at_birth = $first_name_at_birth;
        $this->middle_name_at_birth = $middle_name_at_birth;
        $this->last_name_at_birth = $last_name_at_birth;
        $this->us_address_line1 = $us_address_line1;
        $this->us_city = $us_city;
        $this->us_state = $us_state;
        $this->us_zip_code = $us_zip_code;
        $this->us_phone = $us_phone;
        $this->non_us_address_line1 = $non_us_address_line1;
        $this->non_us_city = $non_us_city;
        $this->non_us_state = $non_us_state;
        $this->non_us_country = $non_us_country;
        $this->non_us_zip_code = $non_us_zip_code;
        $this->non_us_country_phone_code = $non_us_country_phone_code;
        $this->non_us_phone = $non_us_phone;
        $this->date_of_birth = $date_of_birth;
        $this->country_of_birth = $country_of_birth;
        $this->birth_city = $birth_city;
        $this->birth_state = $birth_state;
        $this->gender = $gender;
        $this->country_of_citizenship = $country_of_citizenship;
        $this->foreign_tax_id = $foreign_tax_id;
        $this->us_visa_type = $us_visa_type;
        $this->us_visa_number = $us_visa_number;
        $this->us_visa_exp_date = $us_visa_exp_date;
        $this->passport = $passport;
        $this->passport_issued_by = $passport_issued_by;
        $this->passport_number = $passport_number;
        $this->passport_exp_date = $passport_exp_date;
        $this->drivers_license = $drivers_license;
        $this->drivers_license_issued_by = $drivers_license_issued_by;
        $this->drivers_license_number = $drivers_license_number;
        $this->drivers_license_exp_date = $drivers_license_exp_date;
        $this->state_id = $state_id;
        $this->state_id_issued_by = $state_id_issued_by;
        $this->state_id_number = $state_id_number;
        $this->state_id_exp_date = $state_id_exp_date;
        $this->uscis_documentation = $uscis_documentation;
        $this->uscis_documentation_type = $uscis_documentation_type;
        $this->uscis_documentation_issued_by = $uscis_documentation_issued_by;
        $this->uscis_documentation_number = $uscis_documentation_number;
        $this->uscis_documentation_exp_date = $uscis_documentation_exp_date;
        $this->other_documentation = $other_documentation;
        $this->other_documentation_type = $other_documentation_type;
        $this->other_documentation_issued_by = $other_documentation_issued_by;
        $this->other_documentation_number = $other_documentation_number;
        $this->other_documentation_exp_date = $other_documentation_exp_date;
        $this->issued_by = $issued_by;
        $this->id_no = $id_no;
        $this->exp_date = $exp_date;
        $this->entry_date = $entry_date;
        $this->itin_or_irsn = $itin_or_irsn;
        $this->itin_or_irsn_no = $itin_or_irsn_no;
        $this->itin_or_irs_first_name = $itin_or_irs_first_name;
        $this->itin_or_irs_middle_name = $itin_or_irs_middle_name;
        $this->itin_or_irs_last_name = $itin_or_irs_last_name;
        $this->college_univ_company = $college_univ_company;
        $this->college_univ_company_city = $college_univ_company_city;
        $this->college_univ_company_state = $college_univ_company_state;
        $this->length_of_stay = $length_of_stay;
        $this->email = $email;
        $this->payer_id = $payer_id;
        $this->billing = $billing;
        $this->status = $status;
        $this->status_date = $status_date;
        $this->notes = $notes;
        $this->ip_address = $ip_address;
        $this->server_language = $server_language;
        $this->form_language = $form_language;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }


    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getIdCode()
    {
        return $this->id_code;
    }

    public function setIdCode($id_code)
    {
        $this->id_code = $id_code;
    }

    public function getIsActive()
    {
        return $this->is_active;
    }

    public function setIsActive($is_active)
    {
        $this->is_active = $is_active;
    }

    public function getApplicationDate()
    {
        return $this->application_date;
    }

    public function setApplicationDate($application_date)
    {
        $this->application_date = $application_date;
    }

    public function getItinType()
    {
        return $this->itin_type;
    }

    public function setItinType($itin_type)
    {
        $this->itin_type = $itin_type;
    }

    public function getReason()
    {
        return $this->reason;
    }

    public function setReason($reason)
    {
        $this->reason = $reason;
    }

    public function getTreatyCountryForNonresident()
    {
        return $this->treaty_country_for_nonresident;
    }

    public function setTreatyCountryForNonresident($treaty_country_for_nonresident)
    {
        $this->treaty_country_for_nonresident = $treaty_country_for_nonresident;
    }

    public function getTreatyArticleForNonresident()
    {
        return $this->treaty_article_for_nonresident;
    }

    public function setTreatyArticleForNonresident($treaty_article_for_nonresident)
    {
        $this->treaty_article_for_nonresident = $treaty_article_for_nonresident;
    }

    public function getRelationshipToUsCitizen()
    {
        return $this->relationship_to_us_citizen;
    }

    public function setRelationshipToUsCitizen($relationship_to_us_citizen)
    {
        $this->relationship_to_us_citizen = $relationship_to_us_citizen;
    }

    public function getRelativeInfo()
    {
        return $this->relative_info;
    }

    public function setRelativeInfo($relative_info)
    {
        $this->relative_info = $relative_info;
    }

    public function getSpouseInfo()
    {
        return $this->spouse_info;
    }

    public function setSpouseInfo($spouse_info)
    {
        $this->spouse_info = $spouse_info;
    }

    public function getTreatyCountryForNonresidentSpr()
    {
        return $this->treaty_country_for_nonresident_spr;
    }

    public function setTreatyCountryForNonresidentSpr($treaty_country_for_nonresident_spr)
    {
        $this->treaty_country_for_nonresident_spr = $treaty_country_for_nonresident_spr;
    }

    public function getTreatyArticleForNonresidentSpr()
    {
        return $this->treaty_article_for_nonresident_spr;
    }

    public function setTreatyArticleForNonresidentSpr($treaty_article_for_nonresident_spr)
    {
        $this->treaty_article_for_nonresident_spr = $treaty_article_for_nonresident_spr;
    }

    public function getOtherInfo()
    {
        return $this->other_info;
    }

    public function setOtherInfo($other_info)
    {
        $this->other_info = $other_info;
    }

    public function getFirstName()
    {
        return $this->first_name;
    }

    public function setFirstName($first_name)
    {
        $this->first_name = $first_name;
    }

    public function getMiddleName()
    {
        return $this->middle_name;
    }

    public function setMiddleName($middle_name)
    {
        $this->middle_name = $middle_name;
    }

    public function getLastName()
    {
        return $this->last_name;
    }

    public function setLastName($last_name)
    {
        $this->last_name = $last_name;
    }

    public function getFirstNameAtBirth()
    {
        return $this->first_name_at_birth;
    }

    public function setFirstNameAtBirth($first_name_at_birth)
    {
        $this->first_name_at_birth = $first_name_at_birth;
    }

    public function getMiddleNameAtBirth()
    {
        return $this->middle_name_at_birth;
    }

    public function setMiddleNameAtBirth($middle_name_at_birth)
    {
        $this->middle_name_at_birth = $middle_name_at_birth;
    }

    public function getLastNameAtBirth()
    {
        return $this->last_name_at_birth;
    }

    public function setLastNameAtBirth($last_name_at_birth)
    {
        $this->last_name_at_birth = $last_name_at_birth;
    }

    public function getUsAddressLine1()
    {
        return $this->us_address_line1;
    }

    public function setUsAddressLine1($us_address_line1)
    {
        $this->us_address_line1 = $us_address_line1;
    }

    public function getUsCity()
    {
        return $this->us_city;
    }

    public function setUsCity($us_city)
    {
        $this->us_city = $us_city;
    }

    public function getUsState()
    {
        return $this->us_state;
    }

    public function setUsState($us_state)
    {
        $this->us_state = $us_state;
    }

    public function getUsZipCode()
    {
        return $this->us_zip_code;
    }

    public function setUsZipCode($us_zip_code)
    {
        $this->us_zip_code = $us_zip_code;
    }

    public function getUsPhone()
    {
        return $this->us_phone;
    }

    public function setUsPhone($us_phone)
    {
        $this->us_phone = $us_phone;
    }

    public function getNonUsAddressLine1()
    {
        return $this->non_us_address_line1;
    }

    public function setNonUsAddressLine1($non_us_address_line1)
    {
        $this->non_us_address_line1 = $non_us_address_line1;
    }

    public function getNonUsCity()
    {
        return $this->non_us_city;
    }

    public function setNonUsCity($non_us_city)
    {
        $this->non_us_city = $non_us_city;
    }

    public function getNonUsState()
    {
        return $this->non_us_state;
    }

    public function setNonUsState($non_us_state)
    {
        $this->non_us_state = $non_us_state;
    }

    public function getNonUsCountry()
    {
        return $this->non_us_country;
    }

    public function setNonUsCountry($non_us_country)
    {
        $this->non_us_country = $non_us_country;
    }

    public function getNonUsZipCode()
    {
        return $this->non_us_zip_code;
    }

    public function setNonUsZipCode($non_us_zip_code)
    {
        $this->non_us_zip_code = $non_us_zip_code;
    }

    public function getNonUsCountryPhoneCode()
    {
        return $this->non_us_country_phone_code;
    }

    public function setNonUsCountryPhoneCode($non_us_country_phone_code)
    {
        $this->non_us_country_phone_code = $non_us_country_phone_code;
    }

    public function getNonUsPhone()
    {
        return $this->non_us_phone;
    }

    public function setNonUsPhone($non_us_phone)
    {
        $this->non_us_phone = $non_us_phone;
    }

    public function getDateOfBirth()
    {
        return $this->date_of_birth;
    }

    public function setDateOfBirth($date_of_birth)
    {
        $this->date_of_birth = $date_of_birth;
    }

    public function getCountryOfBirth()
    {
        return $this->country_of_birth;
    }

    public function setCountryOfBirth($country_of_birth)
    {
        $this->country_of_birth = $country_of_birth;
    }

    public function getBirthCity()
    {
        return $this->birth_city;
    }

    public function setBirthCity($birth_city)
    {
        $this->birth_city = $birth_city;
    }

    public function getBirthState()
    {
        return $this->birth_state;
    }

    public function setBirthState($birth_state)
    {
        $this->birth_state = $birth_state;
    }

    public function getGender()
    {
        return $this->gender;
    }

    public function setGender($gender)
    {
        $this->gender = $gender;
    }

    public function getCountryOfCitizenship()
    {
        return $this->country_of_citizenship;
    }

    public function setCountryOfCitizenship($country_of_citizenship)
    {
        $this->country_of_citizenship = $country_of_citizenship;
    }

    public function getForeignTaxId()
    {
        return $this->foreign_tax_id;
    }

    public function setForeignTaxId($foreign_tax_id)
    {
        $this->foreign_tax_id = $foreign_tax_id;
    }

    public function getUsVisaType()
    {
        return $this->us_visa_type;
    }

    public function setUsVisaType($us_visa_type)
    {
        $this->us_visa_type = $us_visa_type;
    }

    public function getUsVisaNumber()
    {
        return $this->us_visa_number;
    }

    public function setUsVisaNumber($us_visa_number)
    {
        $this->us_visa_number = $us_visa_number;
    }

    public function getUsVisaExpDate()
    {
        return $this->us_visa_exp_date;
    }

    public function setUsVisaExpDate($us_visa_exp_date)
    {
        $this->us_visa_exp_date = $us_visa_exp_date;
    }

    public function getPassport()
    {
        return $this->passport;
    }

    public function setPassport($passport)
    {
        $this->passport = $passport;
    }

    public function getPassportIssuedBy()
    {
        return $this->passport_issued_by;
    }

    public function setPassportIssuedBy($passport_issued_by)
    {
        $this->passport_issued_by = $passport_issued_by;
    }

    public function getPassportNumber()
    {
        return $this->passport_number;
    }

    public function setPassportNumber($passport_number)
    {
        $this->passport_number = $passport_number;
    }

    public function getPassportExpDate()
    {
        return $this->passport_exp_date;
    }

    public function setPassportExpDate($passport_exp_date)
    {
        $this->passport_exp_date = $passport_exp_date;
    }

    public function getDriversLicense()
    {
        return $this->drivers_license;
    }

    public function setDriversLicense($drivers_license)
    {
        $this->drivers_license = $drivers_license;
    }

    public function getDriversLicenseIssuedBy()
    {
        return $this->drivers_license_issued_by;
    }

    public function setDriversLicenseIssuedBy($drivers_license_issued_by)
    {
        $this->drivers_license_issued_by = $drivers_license_issued_by;
    }

    public function getDriversLicenseNumber()
    {
        return $this->drivers_license_number;
    }

    public function setDriversLicenseNumber($drivers_license_number)
    {
        $this->drivers_license_number = $drivers_license_number;
    }

    public function getDriversLicenseExpDate()
    {
        return $this->drivers_license_exp_date;
    }

    public function setDriversLicenseExpDate($drivers_license_exp_date)
    {
        $this->drivers_license_exp_date = $drivers_license_exp_date;
    }

    public function getStateId()
    {
        return $this->state_id;
    }

    public function setStateId($state_id)
    {
        $this->state_id = $state_id;
    }

    public function getStateIdIssuedBy()
    {
        return $this->state_id_issued_by;
    }

    public function setStateIdIssuedBy($state_id_issued_by)
    {
        $this->state_id_issued_by = $state_id_issued_by;
    }

    public function getStateIdNumber()
    {
        return $this->state_id_number;
    }

    public function setStateIdNumber($state_id_number)
    {
        $this->state_id_number = $state_id_number;
    }

    public function getStateIdExpDate()
    {
        return $this->state_id_exp_date;
    }

    public function setStateIdExpDate($state_id_exp_date)
    {
        $this->state_id_exp_date = $state_id_exp_date;
    }

    public function getUscisDocumentation()
    {
        return $this->uscis_documentation;
    }

    public function setUscisDocumentation($uscis_documentation)
    {
        $this->uscis_documentation = $uscis_documentation;
    }

    public function getUscisDocumentationType()
    {
        return $this->uscis_documentation_type;
    }

    public function setUscisDocumentationType($uscis_documentation_type)
    {
        $this->uscis_documentation_type = $uscis_documentation_type;
    }

    public function getUscisDocumentationIssuedBy()
    {
        return $this->uscis_documentation_issued_by;
    }

    public function setUscisDocumentationIssuedBy($uscis_documentation_issued_by)
    {
        $this->uscis_documentation_issued_by = $uscis_documentation_issued_by;
    }

    public function getUscisDocumentationNumber()
    {
        return $this->uscis_documentation_number;
    }

    public function setUscisDocumentationNumber($uscis_documentation_number)
    {
        $this->uscis_documentation_number = $uscis_documentation_number;
    }

    public function getUscisDocumentationExpDate()
    {
        return $this->uscis_documentation_exp_date;
    }

    public function setUscisDocumentationExpDate($uscis_documentation_exp_date)
    {
        $this->uscis_documentation_exp_date = $uscis_documentation_exp_date;
    }

    public function getOtherDocumentation()
    {
        return $this->other_documentation;
    }

    public function setOtherDocumentation($other_documentation)
    {
        $this->other_documentation = $other_documentation;
    }

    public function getOtherDocumentationType()
    {
        return $this->other_documentation_type;
    }

    public function setOtherDocumentationType($other_documentation_type)
    {
        $this->other_documentation_type = $other_documentation_type;
    }

    public function getOtherDocumentationIssuedBy()
    {
        return $this->other_documentation_issued_by;
    }

    public function setOtherDocumentationIssuedBy($other_documentation_issued_by)
    {
        $this->other_documentation_issued_by = $other_documentation_issued_by;
    }

    public function getOtherDocumentationNumber()
    {
        return $this->other_documentation_number;
    }

    public function setOtherDocumentationNumber($other_documentation_number)
    {
        $this->other_documentation_number = $other_documentation_number;
    }

    public function getOtherDocumentationExpDate()
    {
        return $this->other_documentation_exp_date;
    }

    public function setOtherDocumentationExpDate($other_documentation_exp_date)
    {
        $this->other_documentation_exp_date = $other_documentation_exp_date;
    }

    public function getIssuedBy()
    {
        return $this->issued_by;
    }

    public function setIssuedBy($issued_by)
    {
        $this->issued_by = $issued_by;
    }

    public function getIdNo()
    {
        return $this->id_no;
    }

    public function setIdNo($id_no)
    {
        $this->id_no = $id_no;
    }

    public function getExpDate()
    {
        return $this->exp_date;
    }

    public function setExpDate($exp_date)
    {
        $this->exp_date = $exp_date;
    }

    public function getEntryDate()
    {
        return $this->entry_date;
    }

    public function setEntryDate($entry_date)
    {
        $this->entry_date = $entry_date;
    }

    public function getItinOrIrsn()
    {
        return $this->itin_or_irsn;
    }

    public function setItinOrIrsn($itin_or_irsn)
    {
        $this->itin_or_irsn = $itin_or_irsn;
    }

    public function getItinOrIrsnNo()
    {
        return $this->itin_or_irsn_no;
    }

    public function setItinOrIrsnNo($itin_or_irsn_no)
    {
        $this->itin_or_irsn_no = $itin_or_irsn_no;
    }

    public function getItinOrIrsFirstName()
    {
        return $this->itin_or_irs_first_name;
    }

    public function setItinOrIrsFirstName($itin_or_irs_first_name)
    {
        $this->itin_or_irs_first_name = $itin_or_irs_first_name;
    }

    public function getItinOrIrsMiddleName()
    {
        return $this->itin_or_irs_middle_name;
    }

    public function setItinOrIrsMiddleName($itin_or_irs_middle_name)
    {
        $this->itin_or_irs_middle_name = $itin_or_irs_middle_name;
    }

    public function getItinOrIrsLastName()
    {
        return $this->itin_or_irs_last_name;
    }

    public function setItinOrIrsLastName($itin_or_irs_last_name)
    {
        $this->itin_or_irs_last_name = $itin_or_irs_last_name;
    }

    public function getCollegeUnivCompany()
    {
        return $this->college_univ_company;
    }

    public function setCollegeUnivCompany($college_univ_company)
    {
        $this->college_univ_company = $college_univ_company;
    }

    public function getCollegeUnivCompanyCity()
    {
        return $this->college_univ_company_city;
    }

    public function setCollegeUnivCompanyCity($college_univ_company_city)
    {
        $this->college_univ_company_city = $college_univ_company_city;
    }

    public function getCollegeUnivCompanyState()
    {
        return $this->college_univ_company_state;
    }

    public function setCollegeUnivCompanyState($college_univ_company_state)
    {
        $this->college_univ_company_state = $college_univ_company_state;
    }

    public function getLengthOfStay()
    {
        return $this->length_of_stay;
    }

    public function setLengthOfStay($length_of_stay)
    {
        $this->length_of_stay = $length_of_stay;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getPayerId()
    {
        return $this->payer_id;
    }

    public function setPayerId($payer_id)
    {
        $this->payer_id = $payer_id;
    }

    public function getBilling()
    {
        return $this->billing;
    }

    public function setBilling($billing)
    {
        $this->billing = $billing;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function getStatusDate()
    {
        return $this->status_date;
    }

    public function setStatusDate($status_date)
    {
        $this->status_date = $status_date;
    }

    public function getNotes()
    {
        return $this->notes;
    }

    public function setNotes($notes)
    {
        $this->notes = $notes;
    }

    public function getIpAddress()
    {
        return $this->ip_address;
    }

    public function setIpAddress($ip_address)
    {
        $this->ip_address = $ip_address;
    }

    public function getServerLanguage()
    {
        return $this->server_language;
    }

    public function setServerLanguage($server_language)
    {
        $this->server_language = $server_language;
    }

    public function getFormLanguage()
    {
        return $this->form_language;
    }

    public function setFormLanguage($form_language)
    {
        $this->form_language = $form_language;
    }

    public function getCreatedAt()
    {
        return $this->created_at;
    }

    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;
    }
}
?>
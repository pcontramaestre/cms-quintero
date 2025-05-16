<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/Connection/Connection.php';
require_once __ROOT__ . '/services/itin/class/ITINApplication.php';


function createITINApplication(ITINApplication $ITINApplication, bool $temporal)
{
    $table = $temporal ? 'itin_applications_temp' : 'itin_applications';
    $conn = (new Connection())->getConnection();
    $sql = "INSERT INTO $table (
        id, id_code, is_active, application_date, itin_type, reason, treaty_country_for_nonresident, 
        treaty_article_for_nonresident, relationship_to_us_citizen, relative_info, spouse_info, 
        treaty_country_for_nonresident_spr, treaty_article_for_nonresident_spr, other_info, first_name, 
        middle_name, last_name, first_name_at_birth, middle_name_at_birth, last_name_at_birth, 
        us_address_line1, us_city, us_state, us_zip_code, us_phone, non_us_address_line1, non_us_city, 
        non_us_state, non_us_country, non_us_zip_code, non_us_country_phone_code, non_us_phone, 
        date_of_birth, country_of_birth, birth_city, birth_state, gender, country_of_citizenship, 
        foreign_tax_id, us_visa_type, us_visa_number, us_visa_exp_date, passport, passport_issued_by,
        passport_number, passport_exp_date, drivers_license, drivers_license_issued_by, drivers_license_number,
        drivers_license_exp_date, state_id, state_id_issued_by, state_id_number, state_id_exp_date,
        uscis_documentation, uscis_documentation_type, uscis_documentation_issued_by, uscis_documentation_number,
        uscis_documentation_exp_date, other_documentation, other_documentation_type, other_documentation_issued_by,
        other_documentation_number, other_documentation_exp_date, issued_by, id_no, exp_date, entry_date,
        itin_or_irsn, itin_or_irsn_no, itin_or_irs_first_name, itin_or_irs_middle_name, itin_or_irs_last_name,
        college_univ_company, college_univ_company_city, college_univ_company_state, length_of_stay, email,
        payer_id, billing, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at
    ) VALUES (
        :id, :id_code, :is_active, :application_date, :itin_type, :reason, :treaty_country_for_nonresident, 
        :treaty_article_for_nonresident, :relationship_to_us_citizen, :relative_info, :spouse_info, 
        :treaty_country_for_nonresident_spr, :treaty_article_for_nonresident_spr, :other_info, :first_name, 
        :middle_name, :last_name, :first_name_at_birth, :middle_name_at_birth, :last_name_at_birth, 
        :us_address_line1, :us_city, :us_state, :us_zip_code, :us_phone, :non_us_address_line1, :non_us_city, 
        :non_us_state, :non_us_country, :non_us_zip_code, :non_us_country_phone_code, :non_us_phone, 
        :date_of_birth, :country_of_birth, :birth_city, :birth_state, :gender, :country_of_citizenship,
        :foreign_tax_id, :us_visa_type, :us_visa_number, :us_visa_exp_date, :passport, :passport_issued_by,
        :passport_number, :passport_exp_date, :drivers_license, :drivers_license_issued_by, :drivers_license_number,
        :drivers_license_exp_date, :state_id, :state_id_issued_by, :state_id_number, :state_id_exp_date,
        :uscis_documentation, :uscis_documentation_type, :uscis_documentation_issued_by, :uscis_documentation_number,
        :uscis_documentation_exp_date, :other_documentation, :other_documentation_type, :other_documentation_issued_by,
        :other_documentation_number, :other_documentation_exp_date, :issued_by, :id_no, :exp_date, :entry_date,
        :itin_or_irsn, :itin_or_irsn_no, :itin_or_irs_first_name, :itin_or_irs_middle_name, :itin_or_irs_last_name,
        :college_univ_company, :college_univ_company_city, :college_univ_company_state, :length_of_stay, :email,
        :payer_id, :billing, :status, :status_date, :notes, :ip_address, :server_language, :form_language, :created_at, :updated_at
    )" . ($temporal ? " ON DUPLICATE KEY UPDATE 
        id = VALUES(id), id_code = VALUES(id_code), is_active = :is_active, application_date = :application_date, itin_type = :itin_type, 
        reason = :reason, treaty_country_for_nonresident = :treaty_country_for_nonresident, 
        treaty_article_for_nonresident = :treaty_article_for_nonresident, relationship_to_us_citizen = :relationship_to_us_citizen, 
        relative_info = :relative_info, spouse_info = :spouse_info, treaty_country_for_nonresident_spr = :treaty_country_for_nonresident_spr, 
        treaty_article_for_nonresident_spr = :treaty_article_for_nonresident_spr, other_info = :other_info, first_name = :first_name, 
        middle_name = :middle_name, last_name = :last_name, first_name_at_birth = :first_name_at_birth, 
        middle_name_at_birth = :middle_name_at_birth, last_name_at_birth = :last_name_at_birth, us_address_line1 = :us_address_line1, 
        us_city = :us_city, us_state = :us_state, us_zip_code = :us_zip_code, us_phone = :us_phone, 
        non_us_address_line1 = :non_us_address_line1, non_us_city = :non_us_city, non_us_state = :non_us_state, 
        non_us_country = :non_us_country, non_us_zip_code = :non_us_zip_code, non_us_country_phone_code = :non_us_country_phone_code, 
        non_us_phone = :non_us_phone, date_of_birth = :date_of_birth, country_of_birth = :country_of_birth, 
        birth_city = :birth_city, birth_state = :birth_state, gender = :gender, country_of_citizenship = :country_of_citizenship,
        foreign_tax_id = :foreign_tax_id, us_visa_type = :us_visa_type, us_visa_number = :us_visa_number,
        us_visa_exp_date = :us_visa_exp_date, passport = :passport, passport_issued_by = :passport_issued_by,
        passport_number = :passport_number, passport_exp_date = :passport_exp_date, drivers_license = :drivers_license,
        drivers_license_issued_by = :drivers_license_issued_by, drivers_license_number = :drivers_license_number,
        drivers_license_exp_date = :drivers_license_exp_date, state_id = :state_id, state_id_issued_by = :state_id_issued_by,
        state_id_number = :state_id_number, state_id_exp_date = :state_id_exp_date, uscis_documentation = :uscis_documentation,
        uscis_documentation_type = :uscis_documentation_type, uscis_documentation_issued_by = :uscis_documentation_issued_by,
        uscis_documentation_number = :uscis_documentation_number, uscis_documentation_exp_date = :uscis_documentation_exp_date,
        other_documentation = :other_documentation, other_documentation_type = :other_documentation_type,
        other_documentation_issued_by = :other_documentation_issued_by, other_documentation_number = :other_documentation_number,
        other_documentation_exp_date = :other_documentation_exp_date, issued_by = :issued_by, id_no = :id_no,
        exp_date = :exp_date, entry_date = :entry_date, itin_or_irsn = :itin_or_irsn, itin_or_irsn_no = :itin_or_irsn_no,
        itin_or_irs_first_name = :itin_or_irs_first_name, itin_or_irs_middle_name = :itin_or_irs_middle_name,
        itin_or_irs_last_name = :itin_or_irs_last_name, college_univ_company = :college_univ_company,
        college_univ_company_city = :college_univ_company_city, college_univ_company_state = :college_univ_company_state,
        length_of_stay = :length_of_stay, email = :email, payer_id = :payer_id, billing = :billing, status = :status,
        status_date = :status_date, notes = :notes, ip_address = :ip_address, server_language = :server_language,
        form_language = :form_language, created_at = VALUES(created_at), updated_at = :updated_at" : "");

    $id = $ITINApplication->getId();
    $id_code = $ITINApplication->getIdCode();
    $is_active = $ITINApplication->getIsActive();
    $application_date = $ITINApplication->getApplicationDate();
    $itin_type = $ITINApplication->getItinType();
    $reason = $ITINApplication->getReason();
    $treaty_country_for_nonresident = $ITINApplication->getTreatyCountryForNonresident();
    $treaty_article_for_nonresident = $ITINApplication->getTreatyArticleForNonresident();
    $relationship_to_us_citizen = $ITINApplication->getRelationshipToUsCitizen();
    $relative_info = $ITINApplication->getRelativeInfo();
    $spouse_info = $ITINApplication->getSpouseInfo();
    $treaty_country_for_nonresident_spr = $ITINApplication->getTreatyCountryForNonresidentSpr();
    $treaty_article_for_nonresident_spr = $ITINApplication->getTreatyArticleForNonresidentSpr();
    $other_info = $ITINApplication->getOtherInfo();
    $first_name = $ITINApplication->getFirstName();
    $middle_name = $ITINApplication->getMiddleName();
    $last_name = $ITINApplication->getLastName();
    $first_name_at_birth = $ITINApplication->getFirstNameAtBirth();
    $middle_name_at_birth = $ITINApplication->getMiddleNameAtBirth();
    $last_name_at_birth = $ITINApplication->getLastNameAtBirth();
    $us_address_line1 = $ITINApplication->getUsAddressLine1();
    $us_city = $ITINApplication->getUsCity();
    $us_state = $ITINApplication->getUsState();
    $us_zip_code = $ITINApplication->getUsZipCode();
    $us_phone = $ITINApplication->getUsPhone();
    $non_us_address_line1 = $ITINApplication->getNonUsAddressLine1();
    $non_us_city = $ITINApplication->getNonUsCity();
    $non_us_state = $ITINApplication->getNonUsState();
    $non_us_country = $ITINApplication->getNonUsCountry();
    $non_us_zip_code = $ITINApplication->getNonUsZipCode();
    $non_us_country_phone_code = $ITINApplication->getNonUsCountryPhoneCode();
    $non_us_phone = $ITINApplication->getNonUsPhone();
    $date_of_birth = $ITINApplication->getDateOfBirth();
    $country_of_birth = $ITINApplication->getCountryOfBirth();
    $birth_city = $ITINApplication->getBirthCity();
    $birth_state = $ITINApplication->getBirthState();
    $gender = $ITINApplication->getGender();
    $country_of_citizenship = $ITINApplication->getCountryOfCitizenship();
    $foreign_tax_id = $ITINApplication->getForeignTaxId();
    $us_visa_type = $ITINApplication->getUsVisaType();
    $us_visa_number = $ITINApplication->getUsVisaNumber();
    $us_visa_exp_date = $ITINApplication->getUsVisaExpDate();
    $passport = $ITINApplication->getPassport();
    $passport_issued_by = $ITINApplication->getPassportIssuedBy();
    $passport_number = $ITINApplication->getPassportNumber();
    $passport_exp_date = $ITINApplication->getPassportExpDate();
    $drivers_license = $ITINApplication->getDriversLicense();
    $drivers_license_issued_by = $ITINApplication->getDriversLicenseIssuedBy();
    $drivers_license_number = $ITINApplication->getDriversLicenseNumber();
    $drivers_license_exp_date = $ITINApplication->getDriversLicenseExpDate();
    $state_id = $ITINApplication->getStateId();
    $state_id_issued_by = $ITINApplication->getStateIdIssuedBy();
    $state_id_number = $ITINApplication->getStateIdNumber();
    $state_id_exp_date = $ITINApplication->getStateIdExpDate();
    $uscis_documentation = $ITINApplication->getUscisDocumentation();
    $uscis_documentation_type = $ITINApplication->getUscisDocumentationType();
    $uscis_documentation_issued_by = $ITINApplication->getUscisDocumentationIssuedBy();
    $uscis_documentation_number = $ITINApplication->getUscisDocumentationNumber();
    $uscis_documentation_exp_date = $ITINApplication->getUscisDocumentationExpDate();
    $other_documentation = $ITINApplication->getOtherDocumentation();
    $other_documentation_type = $ITINApplication->getOtherDocumentationType();
    $other_documentation_issued_by = $ITINApplication->getOtherDocumentationIssuedBy();
    $other_documentation_number = $ITINApplication->getOtherDocumentationNumber();
    $other_documentation_exp_date = $ITINApplication->getOtherDocumentationExpDate();
    $issued_by = $ITINApplication->getIssuedBy();
    $id_no = $ITINApplication->getIdNo();
    $exp_date = $ITINApplication->getExpDate();
    $entry_date = $ITINApplication->getEntryDate();
    $itin_or_irsn = $ITINApplication->getItinOrIrsn();
    $itin_or_irsn_no = $ITINApplication->getItinOrIrsnNo();
    $itin_or_irs_first_name = $ITINApplication->getItinOrIrsFirstName();
    $itin_or_irs_middle_name = $ITINApplication->getItinOrIrsMiddleName();
    $itin_or_irs_last_name = $ITINApplication->getItinOrIrsLastName();
    $college_univ_company = $ITINApplication->getCollegeUnivCompany();
    $college_univ_company_city = $ITINApplication->getCollegeUnivCompanyCity();
    $college_univ_company_state = $ITINApplication->getCollegeUnivCompanyState();
    $length_of_stay = $ITINApplication->getLengthOfStay();
    $email = $ITINApplication->getEmail();
    $payer_id = $ITINApplication->getPayerId();
    $billing = $ITINApplication->getBilling();
    $status = $ITINApplication->getStatus();
    $status_date = $ITINApplication->getStatusDate();
    $notes = $ITINApplication->getNotes();
    $ip_address = $ITINApplication->getIpAddress();
    $server_language = $ITINApplication->getServerLanguage();
    $form_language = $ITINApplication->getFormLanguage();
    $created_at = $ITINApplication->getCreatedAt();
    $updated_at = $ITINApplication->getUpdatedAt();

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':id_code', $id_code);
    $stmt->bindParam(':is_active', $is_active);
    $stmt->bindParam(':application_date', $application_date);
    $stmt->bindParam(':itin_type', $itin_type);
    $stmt->bindParam(':reason', $reason);
    $stmt->bindParam(':treaty_country_for_nonresident', $treaty_country_for_nonresident);
    $stmt->bindParam(':treaty_article_for_nonresident', $treaty_article_for_nonresident);
    $stmt->bindParam(':relationship_to_us_citizen', $relationship_to_us_citizen);
    $stmt->bindParam(':relative_info', $relative_info);
    $stmt->bindParam(':spouse_info', $spouse_info);
    $stmt->bindParam(':treaty_country_for_nonresident_spr', $treaty_country_for_nonresident_spr);
    $stmt->bindParam(':treaty_article_for_nonresident_spr', $treaty_article_for_nonresident_spr);
    $stmt->bindParam(':other_info', $other_info);
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':middle_name', $middle_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':first_name_at_birth', $first_name_at_birth);
    $stmt->bindParam(':middle_name_at_birth', $middle_name_at_birth);
    $stmt->bindParam(':last_name_at_birth', $last_name_at_birth);
    $stmt->bindParam(':us_address_line1', $us_address_line1);
    $stmt->bindParam(':us_city', $us_city);
    $stmt->bindParam(':us_state', $us_state);
    $stmt->bindParam(':us_zip_code', $us_zip_code);
    $stmt->bindParam(':us_phone', $us_phone);
    $stmt->bindParam(':non_us_address_line1', $non_us_address_line1);
    $stmt->bindParam(':non_us_city', $non_us_city);
    $stmt->bindParam(':non_us_state', $non_us_state);
    $stmt->bindParam(':non_us_country', $non_us_country);
    $stmt->bindParam(':non_us_zip_code', $non_us_zip_code);
    $stmt->bindParam(':non_us_country_phone_code', $non_us_country_phone_code);
    $stmt->bindParam(':non_us_phone', $non_us_phone);
    $stmt->bindParam(':date_of_birth', $date_of_birth);
    $stmt->bindParam(':country_of_birth', $country_of_birth);
    $stmt->bindParam(':birth_city', $birth_city);
    $stmt->bindParam(':birth_state', $birth_state);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':country_of_citizenship', $country_of_citizenship);
    $stmt->bindParam(':foreign_tax_id', $foreign_tax_id);
    $stmt->bindParam(':us_visa_type', $us_visa_type);
    $stmt->bindParam(':us_visa_number', $us_visa_number);
    $stmt->bindParam(':us_visa_exp_date', $us_visa_exp_date);
    $stmt->bindParam(':passport', $passport);
    $stmt->bindParam(':passport_issued_by', $passport_issued_by);
    $stmt->bindParam(':passport_number', $passport_number);
    $stmt->bindParam(':passport_exp_date', $passport_exp_date);
    $stmt->bindParam(':drivers_license', $drivers_license);
    $stmt->bindParam(':drivers_license_issued_by', $drivers_license_issued_by);
    $stmt->bindParam(':drivers_license_number', $drivers_license_number);
    $stmt->bindParam(':drivers_license_exp_date', $drivers_license_exp_date);
    $stmt->bindParam(':state_id', $state_id);
    $stmt->bindParam(':state_id_issued_by', $state_id_issued_by);
    $stmt->bindParam(':state_id_number', $state_id_number);
    $stmt->bindParam(':state_id_exp_date', $state_id_exp_date);
    $stmt->bindParam(':uscis_documentation', $uscis_documentation);
    $stmt->bindParam(':uscis_documentation_type', $uscis_documentation_type);
    $stmt->bindParam(':uscis_documentation_issued_by', $uscis_documentation_issued_by);
    $stmt->bindParam(':uscis_documentation_number', $uscis_documentation_number);
    $stmt->bindParam(':uscis_documentation_exp_date', $uscis_documentation_exp_date);
    $stmt->bindParam(':other_documentation', $other_documentation);
    $stmt->bindParam(':other_documentation_type', $other_documentation_type);
    $stmt->bindParam(':other_documentation_issued_by', $other_documentation_issued_by);
    $stmt->bindParam(':other_documentation_number', $other_documentation_number);
    $stmt->bindParam(':other_documentation_exp_date', $other_documentation_exp_date);
    $stmt->bindParam(':issued_by', $issued_by);
    $stmt->bindParam(':id_no', $id_no);
    $stmt->bindParam(':exp_date', $exp_date);
    $stmt->bindParam(':entry_date', $entry_date);
    $stmt->bindParam(':itin_or_irsn', $itin_or_irsn);
    $stmt->bindParam(':itin_or_irsn_no', $itin_or_irsn_no);
    $stmt->bindParam(':itin_or_irs_first_name', $itin_or_irs_first_name);
    $stmt->bindParam(':itin_or_irs_middle_name', $itin_or_irs_middle_name);
    $stmt->bindParam(':itin_or_irs_last_name', $itin_or_irs_last_name);
    $stmt->bindParam(':college_univ_company', $college_univ_company);
    $stmt->bindParam(':college_univ_company_city', $college_univ_company_city);
    $stmt->bindParam(':college_univ_company_state', $college_univ_company_state);
    $stmt->bindParam(':length_of_stay', $length_of_stay);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':payer_id', $payer_id);
    $stmt->bindParam(':billing', $billing);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':status_date', $status_date);
    $stmt->bindParam(':notes', $notes);
    $stmt->bindParam(':ip_address', $ip_address);
    $stmt->bindParam(':server_language', $server_language);
    $stmt->bindParam(':form_language', $form_language);
    $stmt->bindParam(':created_at', $created_at);
    $stmt->bindParam(':updated_at', $updated_at);

    $stmt->execute();

    return $conn->lastInsertId();
}

function getLastITINApplicationFromEmail(string $email): ITINApplication
{
    $conn = (new Connection())->getConnection();
    $sql = "SELECT * FROM itin_applications WHERE email = :email ORDER BY created_at DESC LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $ITINApplication = new ITINApplication(
        $row['id'],
        $row['id_code'],
        $row['is_active'],
        $row['application_date'],
        $row['itin_type'],
        $row['reason'],
        $row['treaty_country_for_nonresident'],
        $row['treaty_article_for_nonresident'],
        $row['relationship_to_us_citizen'],
        $row['relative_info'],
        $row['spouse_info'],
        $row['treaty_country_for_nonresident_spr'],
        $row['treaty_article_for_nonresident_spr'],
        $row['other_info'],
        $row['first_name'],
        $row['middle_name'],
        $row['last_name'],
        $row['first_name_at_birth'],
        $row['middle_name_at_birth'],
        $row['last_name_at_birth'],
        $row['us_address_line1'],
        $row['us_city'],
        $row['us_state'],
        $row['us_zip_code'],
        $row['us_phone'],
        $row['non_us_address_line1'],
        $row['non_us_city'],
        $row['non_us_state'],
        $row['non_us_country'],
        $row['non_us_zip_code'],
        $row['non_us_country_phone_code'],
        $row['non_us_phone'],
        $row['date_of_birth'],
        $row['country_of_birth'],
        $row['birth_city'],
        $row['birth_state'],
        $row['gender'],
        $row['country_of_citizenship'],
        $row['foreign_tax_id'],
        $row['us_visa_type'],
        $row['us_visa_number'],
        $row['us_visa_exp_date'],
        $row['passport'],
        $row['passport_issued_by'],
        $row['passport_number'],
        $row['passport_exp_date'],
        $row['drivers_license'],
        $row['drivers_license_issued_by'],
        $row['drivers_license_number'],
        $row['drivers_license_exp_date'],
        $row['state_id'],
        $row['state_id_issued_by'],
        $row['state_id_number'],
        $row['state_id_exp_date'],
        $row['uscis_documentation'],
        $row['uscis_documentation_type'],
        $row['uscis_documentation_issued_by'],
        $row['uscis_documentation_number'],
        $row['uscis_documentation_exp_date'],
        $row['other_documentation'],
        $row['other_documentation_type'],
        $row['other_documentation_issued_by'],
        $row['other_documentation_number'],
        $row['other_documentation_exp_date'],
        $row['issued_by'],
        $row['id_no'],
        $row['exp_date'],
        $row['entry_date'],
        $row['itin_or_irsn'],
        $row['itin_or_irsn_no'],
        $row['itin_or_irs_first_name'],
        $row['itin_or_irs_middle_name'],
        $row['itin_or_irs_last_name'],
        $row['college_univ_company'],
        $row['college_univ_company_city'],
        $row['college_univ_company_state'],
        $row['length_of_stay'],
        $row['email'],
        $row['payer_id'],
        $row['billing'],
        $row['status'],
        $row['status_date'],
        $row['notes'],
        $row['ip_address'],
        $row['server_language'],
        $row['form_language'],
        $row['created_at'],
        $row['updated_at']
    );

    return $ITINApplication;
}

function getITINApplicationById(int $id): ITINApplication
{
    $conn = (new Connection())->getConnection();
    $sql = "SELECT * FROM itin_applications WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $ITINApplication = new ITINApplication(
        $row['id'],
        $row['id_code'],
        $row['is_active'],
        $row['application_date'],
        $row['itin_type'],
        $row['reason'],
        $row['treaty_country_for_nonresident'],
        $row['treaty_article_for_nonresident'],
        $row['relationship_to_us_citizen'],
        $row['relative_info'],
        $row['spouse_info'],
        $row['treaty_country_for_nonresident_spr'],
        $row['treaty_article_for_nonresident_spr'],
        $row['other_info'],
        $row['first_name'],
        $row['middle_name'],
        $row['last_name'],
        $row['first_name_at_birth'],
        $row['middle_name_at_birth'],
        $row['last_name_at_birth'],
        $row['us_address_line1'],
        $row['us_city'],
        $row['us_state'],
        $row['us_zip_code'],
        $row['us_phone'],
        $row['non_us_address_line1'],
        $row['non_us_city'],
        $row['non_us_state'],
        $row['non_us_country'],
        $row['non_us_zip_code'],
        $row['non_us_country_phone_code'],
        $row['non_us_phone'],
        $row['date_of_birth'],
        $row['country_of_birth'],
        $row['birth_city'],
        $row['birth_state'],
        $row['gender'],
        $row['country_of_citizenship'],
        $row['foreign_tax_id'],
        $row['us_visa_type'],
        $row['us_visa_number'],
        $row['us_visa_exp_date'],
        $row['passport'],
        $row['passport_issued_by'],
        $row['passport_number'],
        $row['passport_exp_date'],
        $row['drivers_license'],
        $row['drivers_license_issued_by'],
        $row['drivers_license_number'],
        $row['drivers_license_exp_date'],
        $row['state_id'],
        $row['state_id_issued_by'],
        $row['state_id_number'],
        $row['state_id_exp_date'],
        $row['uscis_documentation'],
        $row['uscis_documentation_type'],
        $row['uscis_documentation_issued_by'],
        $row['uscis_documentation_number'],
        $row['uscis_documentation_exp_date'],
        $row['other_documentation'],
        $row['other_documentation_type'],
        $row['other_documentation_issued_by'],
        $row['other_documentation_number'],
        $row['other_documentation_exp_date'],
        $row['issued_by'],
        $row['id_no'],
        $row['exp_date'],
        $row['entry_date'],
        $row['itin_or_irsn'],
        $row['itin_or_irsn_no'],
        $row['itin_or_irs_first_name'],
        $row['itin_or_irs_middle_name'],
        $row['itin_or_irs_last_name'],
        $row['college_univ_company'],
        $row['college_univ_company_city'],
        $row['college_univ_company_state'],
        $row['length_of_stay'],
        $row['email'],
        $row['payer_id'],
        $row['billing'],
        $row['status'],
        $row['status_date'],
        $row['notes'],
        $row['ip_address'],
        $row['server_language'],
        $row['form_language'],
        $row['created_at'],
        $row['updated_at']
    );

    return $ITINApplication;
}

?>
<?php
require_once __DIR__ . '/../../config/config.php';
require_once __ROOT__ . '/services/itin/DAO/ITINApplicationDAO.php';
require_once __ROOT__ . '/services/itin/DAO/ITINApplicationDAO.php';
require_once __ROOT__ . '/services/itin/DAO/CountryDAO.php';
require_once __ROOT__ . '/services/itin/DAO/StateDAO.php';
require_once __ROOT__ . '/services/itin/class/ITINApplication.php';
require_once __ROOT__ . '/libraries/vendor/autoload.php';
use setasign\Fpdi\Fpdi;

function printValueIntoField($pdf, $coordinates, $value)
{
    $pdf->SetXY($coordinates["x"], $coordinates["y"]);
    $pdf->Write(0, $value);
}

function printMultipleValuesIntoFields($pdf, $infoToBePrinted)
{
    foreach ($infoToBePrinted as $key => $value) {
        printValueIntoField($pdf, $value["coordinates"], $value["value"]);
    }
}

function saveITINToPDF(string $path)
{
    $email = $_POST['email'];
    $template = __ROOT__ . '/services/itin/template/fw7compressed.pdf';

    $ITINApplication = getLastITINApplicationFromEmail($email);
    $reason = $ITINApplication->getReason();
    $ITINType = $ITINApplication->getITINType();
    $treatyCountryForNonresident = $ITINApplication->getTreatyCountryForNonresident();
    $treatyArticleForNonresident = $ITINApplication->getTreatyArticleForNonresident();
    $treatyCountryForNonresidentSpr = $ITINApplication->getTreatyCountryForNonresidentSpr();
    $treatyArticleForNonresidentSpr = $ITINApplication->getTreatyArticleForNonresidentSpr();

    $treatyCountry = $reason == 'a' ? $treatyCountryForNonresident : ($reason == 'f' ? $treatyCountryForNonresidentSpr : '');
    $treatyArticle = $reason == 'a' ? $treatyArticleForNonresident : ($reason == 'f' ? $treatyArticleForNonresidentSpr : '');

    $relationshipToUsCitizen = $reason == 'd' ? $ITINApplication->getRelationshipToUsCitizen() : '';
    $relativeInfo = $reason == 'd' || $reason == 'e' ? $ITINApplication->getRelativeInfo() : '';

    $otherInfo = $reason == 'h' ? $ITINApplication->getOtherInfo() : '';

    $firstName = $ITINApplication->getFirstName();
    $middleName = $ITINApplication->getMiddleName();
    $lastName = $ITINApplication->getLastName();
    $firstNameAtBirth = $ITINApplication->getFirstNameAtBirth();
    $middleNameAtBirth = $ITINApplication->getMiddleNameAtBirth();
    $lastNameAtBirth = $ITINApplication->getLastNameAtBirth();

    $us_address_line1 = $ITINApplication->getUsAddressLine1();
    $us_city = $ITINApplication->getUsCity();
    $us_state = $ITINApplication->getUsState() !== "" ? getStateByISOCode($ITINApplication->getUsState())->getEnName() : "";
    $us_zip_code = $ITINApplication->getUsZipCode();
    $us_phone = $ITINApplication->getUsPhone();

    $non_us_address_line1 = $ITINApplication->getNonUsAddressLine1();
    $non_us_city = $ITINApplication->getNonUsCity();
    $non_us_state = $ITINApplication->getNonUsState() !== "" ? getStateByISOCode($ITINApplication->getNonUsState())->getEnName() : "";
    $non_us_country = $ITINApplication->getNonUsCountry() !== "" ? getCountryByAlpha2Code($ITINApplication->getNonUsCountry())->getEnName() : "";
    $non_us_zip_code = $ITINApplication->getNonUsZipCode();
    $countryOfBirth = getCountryByAlpha2Code($ITINApplication->getCountryOfBirth())->getEnName();
    $birthCity = $ITINApplication->getBirthCity();
    $birthState = $ITINApplication->getBirthState() !== "" ? getStateByISOCode($ITINApplication->getBirthState())->getEnName() : "";

    $birthPlace = $birthCity !== "" && $birthState !== "" ? implode(', ', [$birthCity, $birthState]) : "";


    $locationInformation = implode(', ', [$us_city, $us_state, $us_zip_code]);
    $nonUsLocationInformation = $non_us_city !== "" && $non_us_state !== "" && $non_us_country !== "" ? implode(', ', [$non_us_city, $non_us_state, $non_us_country, $non_us_zip_code]) : '';

    $birthMonth = date('m', strtotime($ITINApplication->getDateOfBirth()));
    $birthDay = date('d', strtotime($ITINApplication->getDateOfBirth()));
    $birthYear = date('Y', strtotime($ITINApplication->getDateOfBirth()));
    $gender = $ITINApplication->getGender();

    $countriesOfCitizenshipArray = explode(', ', $ITINApplication->getCountryOfCitizenship());

    $countriesOfCitizenship = count($countriesOfCitizenshipArray) > 1 ? getCountryByAlpha2Code($countriesOfCitizenshipArray[0])->getEnName() . ', ' . getCountryByAlpha2Code($countriesOfCitizenshipArray[1])->getEnName() : getCountryByAlpha2Code($countriesOfCitizenshipArray[0])->getEnName();
    $foreignTaxId = $ITINApplication->getForeignTaxId();

    $usVisaType = $ITINApplication->getUsVisaType();
    $usVisaNumber = $ITINApplication->getUsVisaNumber();
    $usVisaExpDate = $ITINApplication->getUsVisaExpDate();

    $visaInformation = $usVisaType !== "" && $usVisaNumber !== "" && $usVisaExpDate !== "" ? implode(', ', [$usVisaType, $usVisaNumber, $usVisaExpDate]) : '';

    $passport = $ITINApplication->getPassport() == 1 ? 'X' : '';
    $driversLicenseOrStateID = $ITINApplication->getDriversLicense() == 1 || $ITINApplication->getStateID() == 1 ? 'X' : '';
    $uscisDocumentation = $ITINApplication->getUscisDocumentation() == 1 ? 'X' : '';
    $otherDocumentation = $ITINApplication->getOtherDocumentation() == 1 ? 'X' : '';
    $firstDocumentSubmitted = array_search("1", [$ITINApplication->getPassport(), $ITINApplication->getDriversLicense(), $ITINApplication->getStateID(), $ITINApplication->getUscisDocumentation(), $ITINApplication->getOtherDocumentation()]);
    $expDate = $firstDocumentSubmitted == 0 ? $ITINApplication->getPassportExpDate() : ($firstDocumentSubmitted == 1 ? $ITINApplication->getDriversLicenseExpDate() : ($firstDocumentSubmitted == 2 ? $ITINApplication->getStateIDExpDate() : ($firstDocumentSubmitted == 3 ? $ITINApplication->getUscisDocumentationExpDate() : ($firstDocumentSubmitted == 4 ? $ITINApplication->getOtherDocumentationExpDate() : ''))));
    $issuedBy = $firstDocumentSubmitted == 0 ? $ITINApplication->getPassportIssuedBy() : ($firstDocumentSubmitted == 1 ? $ITINApplication->getDriversLicenseIssuedBy() : ($firstDocumentSubmitted == 2 ? $ITINApplication->getStateIDIssuedBy() : ($firstDocumentSubmitted == 3 ? $ITINApplication->getUscisDocumentationIssuedBy() : ($firstDocumentSubmitted == 4 ? $ITINApplication->getOtherDocumentationIssuedBy() : ''))));
    if ($issuedBy !== "")
        $issuedBy = getCountryByAlpha2Code($issuedBy)->getEnName();
    $idNo = $firstDocumentSubmitted == 0 ? $ITINApplication->getPassportNumber() : ($firstDocumentSubmitted == 1 ? $ITINApplication->getDriversLicenseNumber() : ($firstDocumentSubmitted == 2 ? $ITINApplication->getStateIDNumber() : ($firstDocumentSubmitted == 3 ? $ITINApplication->getUscisDocumentationNumber() : ($firstDocumentSubmitted == 4 ? $ITINApplication->getOtherDocumentationNumber() : ''))));

    $expMonth = date('m', strtotime($expDate));
    $expDay = date('d', strtotime($expDate));
    $expYear = date('Y', strtotime($expDate));
    $entryDate = $ITINApplication->getEntryDate();
    $entryMonth = $entryDate ? date('m', strtotime($ITINApplication->getEntryDate())) : '';
    $entryDay = $entryDate ? date('d', strtotime($ITINApplication->getEntryDate())) : '';
    $entryYear = $entryDate ? date('Y', strtotime($ITINApplication->getEntryDate())) : '';
    $ITINOrIRSN = $ITINApplication->getITINOrIRSN();
    $ITINOrIRSNNumbers = str_split($ITINApplication->getITINOrIRSNNo());
    $noNumbers = ['', '', '', '', '', '', '', '', ''];
    $noNumbersPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    $ITINPositions = [87.8, 92.8, 97.8, 105.5, 110.5, 118, 123, 128, 133];
    $IRSNPositions = [153.5, 158.5, 163.5, 171.2, 176.2, 183.7, 188.7, 193.7, 199];
    $ITINOrIRSNFirstName = $ITINApplication->getITINOrIRSFirstName();
    $ITINOrIRSNMiddleName = $ITINApplication->getITINOrIRSMiddleName();
    $ITINOrIRSNLastName = $ITINApplication->getITINOrIRSLastName();

    $collegeUniversityCompany = $ITINApplication->getCollegeUnivCompany();
    $collegeUniversityCompanyCity = $ITINApplication->getCollegeUnivCompanyCity();
    $collegeUniversityCompanyState = $ITINApplication->getCollegeUnivCompanyState();
    $lengthOfStay = $ITINApplication->getLengthOfStay();

    $collegeUniversityCompanyAddress = $collegeUniversityCompanyCity !== "" && $collegeUniversityCompanyState !== "" ? implode(', ', [$collegeUniversityCompanyCity, $collegeUniversityCompanyState]) : '';

    if ($ITINOrIRSN == 'Not disclosure') {
        $positions = $noNumbersPositions;
        $numbers = $noNumbers;
    }

    if ($ITINOrIRSN == "itin") {
        $positions = $ITINPositions;
        $numbers = $ITINOrIRSNNumbers;
    }

    if ($ITINOrIRSN == "irsn") {
        $positions = $IRSNPositions;
        $numbers = $ITINOrIRSNNumbers;
    }

    if ($reason == 'a')
        $reasonY = 53.2;
    if ($reason == 'b')
        $reasonY = 57.5;
    if ($reason == 'c')
        $reasonY = 61.5;
    if ($reason == 'd')
        $reasonY = 65.8;
    if ($reason == 'e')
        $reasonY = 70.1;
    if ($reason == 'f')
        $reasonY = 78.7;
    if ($reason == 'g')
        $reasonY = 86.8;
    if ($reason == 'h')
        $reasonY = 91.2;


    if ($ITINType == "new")
        $ITINTypeY = 36;
    if ($ITINType == "renew")
        $ITINTypeY = 40;

    if ($gender == "male" || $gender == "Male")
        $genderY = 150.4;
    if ($gender == "female" || $gender == "Female")
        $genderY = 154.6;

    $ITINOrIRSNY = $ITINOrIRSN == "Not disclosure" ? 188.5 : 192.6;


    $infoToBePrinted = [
        "Reason" => [
            "coordinates" => ["x" => 18, "y" => $reasonY],
            "value" => "X"
        ],

        "ITINType" => [
            "coordinates" => ["x" => 159.5, "y" => $ITINTypeY],
            "value" => "X"
        ],

        "TreatyCountryForNonresident" => [
            "coordinates" => ["x" => 80, "y" => 95.2],
            "value" => $treatyCountry
        ],

        "TrearyArticleForNonresident" => [
            "coordinates" => ["x" => 157, "y" => 95.2],
            "value" => $treatyArticle
        ],

        "RelationshipToUsCitizen" => [
            "coordinates" => ["x" => 165, "y" => 65.8],
            "value" => $relationshipToUsCitizen
        ],

        "RelativeInfo" => [
            "coordinates" => ["x" => 78, "y" => 74.5],
            "value" => $relativeInfo
        ],

        "OtherInfo" => [
            "coordinates" => ["x" => 53, "y" => 91.2],
            "value" => $otherInfo
        ],

        "FirstName" => [
            "coordinates" => ["x" => 40, "y" => 103.5],
            "value" => $firstName
        ],

        "MiddleName" => [
            "coordinates" => ["x" => 97, "y" => 103.5],
            "value" => $middleName
        ],

        "LastName" => [
            "coordinates" => ["x" => 148, "y" => 103.5],
            "value" => $lastName
        ],

        "FirstNameAtBirth" => [
            "coordinates" => ["x" => 40, "y" => 112],
            "value" => $firstNameAtBirth
        ],

        "MiddleNameAtBirth" => [
            "coordinates" => ["x" => 97, "y" => 112],
            "value" => $middleNameAtBirth
        ],

        "LastNameAtBirth" => [
            "coordinates" => ["x" => 148, "y" => 112],
            "value" => $lastNameAtBirth
        ],

        "UsAddressLine1" => [
            "coordinates" => ["x" => 40, "y" => 120.5],
            "value" => $us_address_line1
        ],

        "LocationInformation" => [
            "coordinates" => ["x" => 40, "y" => 129],
            "value" => $locationInformation
        ],

        "NonUsAddressLine1" => [
            "coordinates" => ["x" => 40, "y" => 137.5],
            "value" => $non_us_address_line1
        ],

        "NonUsLocationInformation" => [
            "coordinates" => ["x" => 40, "y" => 146],
            "value" => $nonUsLocationInformation
        ],

        "BirthMonth" => [
            "coordinates" => ["x" => 48, "y" => 155],
            "value" => $birthMonth
        ],

        "BirthDay" => [
            "coordinates" => ["x" => 57, "y" => 155],
            "value" => $birthDay
        ],

        "BirthYear" => [
            "coordinates" => ["x" => 65, "y" => 155],
            "value" => $birthYear
        ],

        "CountryOfBirth" => [
            "coordinates" => ["x" => 90, "y" => 155],
            "value" => $countryOfBirth
        ],

        "BirthPlace" => [
            "coordinates" => ["x" => 133, "y" => 155],
            "value" => $birthPlace
        ],

        "Gender" => [
            "coordinates" => ["x" => 185.6, "y" => $genderY],
            "value" => "X"
        ],

        "CountriesOfCitizenship" => [
            "coordinates" => ["x" => 40, "y" => 163.5],
            "value" => $countriesOfCitizenship
        ],

        "ForeignTaxId" => [
            "coordinates" => ["x" => 85, "y" => 163.5],
            "value" => $foreignTaxId
        ],

        "VisaInformation" => [
            "coordinates" => ["x" => 130, "y" => 163.5],
            "value" => $visaInformation
        ],

        "Passport" => [
            "coordinates" => ["x" => 45.2, "y" => 171.7],
            "value" => $passport
        ],

        "DriversLicenseOrStateID" => [
            "coordinates" => ["x" => 68.1, "y" => 171.7],
            "value" => $driversLicenseOrStateID
        ],

        "UscisDocumentation" => [
            "coordinates" => ["x" => 111.2, "y" => 171.7],
            "value" => $uscisDocumentation
        ],

        "OtherDocumentation" => [
            "coordinates" => ["x" => 151.9, "y" => 171.7],
            "value" => $otherDocumentation
        ],

        "IssuedBy" => [
            "coordinates" => ["x" => 60, "y" => 176],
            "value" => $issuedBy
        ],

        "IdNo" => [
            "coordinates" => ["x" => 57, "y" => 180],
            "value" => $idNo
        ],

        "ExpMonth" => [
            "coordinates" => ["x" => 129, "y" => 180],
            "value" => $expMonth
        ],

        "ExpDay" => [
            "coordinates" => ["x" => 135, "y" => 180],
            "value" => $expDay
        ],

        "ExpYear" => [
            "coordinates" => ["x" => 142, "y" => 180],
            "value" => $expYear
        ],

        "EntryMonth" => [
            "coordinates" => ["x" => 180, "y" => 180],
            "value" => $entryMonth
        ],

        "EntryDay" => [
            "coordinates" => ["x" => 186, "y" => 180],
            "value" => $entryDay
        ],

        "EntryYear" => [
            "coordinates" => ["x" => 191, "y" => 180],
            "value" => $entryYear
        ],

        "ITINOrIRSN" => [
            "coordinates" => ["x" => 45.2, "y" => $ITINOrIRSNY],
            "value" => "X"
        ],

        "FirstNumber" => [
            "coordinates" => ["x" => $positions[0], "y" => 197],
            "value" => $numbers[0]
        ],

        "SecondNumber" => [
            "coordinates" => ["x" => $positions[1], "y" => 197],
            "value" => $numbers[1]
        ],

        "ThirdNumber" => [
            "coordinates" => ["x" => $positions[2], "y" => 197],
            "value" => $numbers[2]
        ],

        "FourthNumber" => [
            "coordinates" => ["x" => $positions[3], "y" => 197],
            "value" => $numbers[3]
        ],

        "FifthNumber" => [
            "coordinates" => ["x" => $positions[4], "y" => 197],
            "value" => $numbers[4]
        ],

        "SixthNumber" => [
            "coordinates" => ["x" => $positions[5], "y" => 197],
            "value" => $numbers[5]
        ],

        "SeventhNumber" => [
            "coordinates" => ["x" => $positions[6], "y" => 197],
            "value" => $numbers[6]
        ],

        "EighthNumber" => [
            "coordinates" => ["x" => $positions[7], "y" => 197],
            "value" => $numbers[7]
        ],

        "NinthNumber" => [
            "coordinates" => ["x" => $positions[8], "y" => 197],
            "value" => $numbers[8]
        ],

        "ITINOrIRSNFirstName" => [
            "coordinates" => ["x" => 94, "y" => 202],
            "value" => $ITINOrIRSNFirstName
        ],

        "ITINOrIRSNMiddleName" => [
            "coordinates" => ["x" => 130, "y" => 202],
            "value" => $ITINOrIRSNMiddleName
        ],

        "ITINOrIRSNLastName" => [
            "coordinates" => ["x" => 165, "y" => 202],
            "value" => $ITINOrIRSNLastName
        ],

        "CollegeUniversityCompany" => [
            "coordinates" => ["x" => 120, "y" => 210.2],
            "value" => $collegeUniversityCompany
        ],

        "CollegeUniversityCompanyAddress" => [
            "coordinates" => ["x" => 64, "y" => 214.2],
            "value" => $collegeUniversityCompanyAddress
        ],

        "LengthOfStay" => [
            "coordinates" => ["x" => 155, "y" => 214.2],
            "value" => $lengthOfStay
        ]

    ];





    $pdf = new Fpdi();
    $pdf->AddPage();
    $pdf->setSourceFile($template);


    $template = $pdf->importPage(1);
    $pdf->useTemplate($template);

    $pdf->SetFont('Arial');
    $pdf->SetFontSize(8);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetMargins(1, 1, 0);

    printMultipleValuesIntoFields($pdf, $infoToBePrinted);

    $pdf->Output('F', $path . 'w7.pdf');
}
?>
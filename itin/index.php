<?php
// Start of the session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Get the session language, if available, or set it to 'en-US' by default
$formLanguage = isset($_SESSION['user']['language']) ? htmlspecialchars($_SESSION['user']['language'], ENT_QUOTES, 'UTF-8') : 'en-US';

// Includes configuration file to load global variables and settings
require_once __DIR__ . '/../../config/config.php';
// require_once __ROOT__ . '/includes/includes.php';
// require_once __ROOT__ . '/includes/includes_layouts.php';
require_once __ROOT__ . '/includes/includes_functions.php';
// require_once __ROOT__ . '/includes/includes_messages.php';
// require_once __ROOT__ . '/includes/includes_languages.php';
// require_once __ROOT__ . '/includes/includesDAO.php';

// Check if the user is logged in
//checkSession($formLanguage);

// Write the log to the log file (SESSION)
if (isset($_SESSION)) {
    $content = print_r($_SESSION, true);
    $filePath = __DIR__ . '/index.txt';
    $errorFilePath = __DIR__ . '/index_error_log.txt';
    $source = '/services/mailbox/index.php';
    // logData($filePath, $content, $source, $errorFilePath);
}

// Get user information from the session
$user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
$username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';
$email = isset($_SESSION['user']['email']) ? htmlspecialchars(trim($_SESSION['user']['email']), ENT_QUOTES, 'UTF-8') : '';
$phone = isset($_SESSION['user']['phone']) ? htmlspecialchars(trim($_SESSION['user']['phone']), ENT_QUOTES, 'UTF-8') : '';

// Get service information from the session
$formLanguage = $_SESSION['formLanguage'] ?? $formLanguage;
$service_id = $_SESSION['service_id'] ?? '';
$serviceType = $_SESSION['service_type'] ?? '';
$serviceFor = $_SESSION['service_for'] ?? '';
$offer = $_SESSION['offer'] ?? '';
$price = $_SESSION['price'] ?? '';

// Create an instance of the Connection class and establish the connection to the database
$connect = new Connection(); // Create a new Connection object
$conn = $connect->getConnection(); // Get a database connection

// Verificar el correo electrónico antes de continuar
//checkEmailVerification($conn, $formLanguage, $username, $email);

// Get the customer_id from the session
$customer_id = null;

$individual_id = $_SESSION['selected_individual']['id'] ?? null;
$business_id = $_SESSION['selected_business']['id'] ?? null;

if (isset($_SESSION['selected_individual']['customer_id'])) {
    $customer_id = $_SESSION['selected_individual']['customer_id'];
} elseif (isset($_SESSION['selected_business']['customer_id'])) {
    $customer_id = $_SESSION['selected_business']['customer_id'];
} elseif (isset($_SESSION['customer_id'])) {
    $customer_id = $_SESSION['customer_id'];
}

/*
// If the user is a business
if (!empty($_SESSION['selected_business'])) {
    // Array of messages in different languages
    $messages = array(
        'en-US' => array(
            'message' => "This service is only available for individuals. Please log in with a personal profile to continue."
        ),
        'es-ES' => array(
            'message' => "Este servicio está disponible solo para personas físicas. Por favor, inicie sesión con un perfil personal para continuar."
        ),
        'pt-BR' => array(
            'message' => "Este serviço está disponível apenas para pessoas físicas. Por favor, faça login com um perfil pessoal para continuar."
        ),
        'zh-CN' => array(
            'message' => "此服务仅适用于个人。请使用个人资料登录以继续。"
        ),
    );

    // Select the message in the correct language
    $message = $messages[$formLanguage]['message'] ?? $messages['en-US']['message'];

    // Escape variables to prevent security issues
    $message = htmlspecialchars($message, ENT_QUOTES);

    // Show message indicating that the service is only for individuals
    echo '<script language="javascript">
    alert("' . $message . '");
    window.history.back();
    </script>';
    exit();
}

**/
// $user = getUserById($user_id);
// $customer = getCustomerById($customer_id);
// $individual = getIndividualById($individual_id);
// $business = getBusinessById($business_id);

// Methods for the user
// $user_id = $user ? $user->getId() : null;
// if ($user_id) {
//     $user_emails = getUserEmailByUserId($user_id);
//     $userDefaultEmail = getUserDefaultEmailByUserId($user_id);
//     $user_phones = getUserPhoneByUserId($user_id);
//     $userDefaultPhone = getUserDefaultPhoneByUserId($user_id);
//     //$user_addresses = getUserAddressByUserId($user_id);
//     //$userDefaultAddress = getUserDefaultAddressByUserId($user_id);
// }

// Methods for the customer
// $customer_id = $customer ? $customer->getId() : null;
// if ($customer_id) {
//     $customer_emails = getCustomerEmailByCustomerId($customer_id);
//     $customerDefaultEmail = getCustomerDefaultEmailByCustomerId($customer_id);
//     $customer_phones = getCustomerPhoneByCustomerId($customer_id);
//     $customerDefaultPhone = getCustomerDefaultPhoneByCustomerId($customer_id);
//     $customer_addresses = getCustomerAddressByCustomerId($customer_id);
//     $customerDefaultAddress = getCustomerDefaultAddressByCustomerId($customer_id);
//     $customerBillingAddress = getCustomerBillingAddressByCustomerId($customer_id);
//     $customerShippingAddress = getCustomerShippingAddressByCustomerId($customer_id);
// }

// Methods for the individual
// $individual_id = $individual ? $individual->getId() : null;
// if ($individual_id) {
//     $individual_emails = getIndividualEmailByIndividualId($individual_id);
//     $individualDefaultEmail = getIndividualDefaultEmailByIndividualId($individual_id);
//     $individual_phones = getIndividualPhoneByIndividualId($individual_id);
//     $individualDefaultPhone = getIndividualDefaultPhoneByIndividualId($individual_id);
//     $individual_addresses = getIndividualAddressByIndividualId($individual_id);
//     $individualDefaultAddress = getIndividualDefaultAddressByIndividualId($individual_id);
//     $individualBillingAddress = getIndividualBillingAddressByIndividualId($individual_id);
//     $individualShippingAddress = getIndividualShippingAddressByIndividualId($individual_id);
// }

// Methods for business
// $business_id = $business ? $business->getId() : null;
// if ($business_id) {
//     $business_emails = getBusinessEmailByBusinessId($business_id);
//     $businessDefaultEmail = getBusinessDefaultEmailByBusinessId($business_id);
//     $business_phones = getBusinessPhoneByBusinessId($business_id);
//     $businessDefaultPhone = getBusinessDefaultPhoneByBusinessId($business_id);
//     $business_addresses = getBusinessAddressByBusinessId($business_id);
//     $businessDefaultAddress = getBusinessDefaultAddressByBusinessId($business_id);
//     $businessBillingAddress = getBusinessBillingAddressByBusinessId($business_id);
//     $businessShippingAddress = getBusinessShippingAddressByBusinessId($business_id);
// }

// Select texts based on the language
// $langTexts = $textsITIN[$formLanguage] ?? $textsITIN['en-US'];
// $langTexts = !empty($textsITIN[$formLanguage]) ? $textsITIN[$formLanguage] : $textsITIN['en-US'];
$langTexts = !empty($textsITIN_index[$formLanguage]) ? $textsITIN_index[$formLanguage] : $textsITIN_index['en-US'];

// Open HTML
echo '<!DOCTYPE html>';
echo '<html lang="' . $formLanguage . '">';

echo '<head>';

// Load Common Resources
loadCommonResources();
echo '<link rel="stylesheet" href="' . URL . '/assets/css/itin.css">';

// Header
// displayUserHeader($formLanguage, $user);

echo '<title>' . $langTexts['indexTabTitle'] . '</title>';

echo '</head>';

echo '<body>';

// Menu
// displayUserMenu($formLanguage);

// Mailbox content
echo '<div class="container-fluid p-0">';
// Row content
echo '<div class="row g-0">';
echo '<div class="row g-0">';
// Main content
echo '<div class="col-12 p-0 d-flex flex-column">';
echo '<div class="flex-grow-1">';
// Greeting
echo '<div class="container-fluid">';
echo '<div class="col px-0 text-center">';
// echo displayGreeting($formLanguage, $user, $individual, $business);
echo '</div>';
echo '</div>';
echo '<br>';
echo '<br>';

// Mailbox Cards
echo '<div class="container">';

// First row
echo '<div class="row">';

// Card 1: Important notices
echo '<div class="col-12 mb-3">';
echo '<div class="card card-announcement">';
echo '<div class="card-body">';
echo '<h5 class="card-title font-weight-bold text-start">Turn On Your Digital Mailbox Features Now to Start Receiving Mail</h5>';
echo '<p class="card-text text-start">In order to start receiving mail, the US Postal Service requires that your identity be verified. Please click on the blue Complete Verification button below to get started.</p>';
echo '<p class="card-text text-start">To successfully go through the verification process, you\'ll need access to:</p>';
echo '<ul class="card-text text-start">';
echo '<li>Laptop or Desktop Computer</li>';
echo '<li>2 Pieces of Identification</li>';
echo '</ul>';
echo '<button class="btn btn-primary float-start announcement-button">Complete Verification</button>';
echo '</div>'; // Ends card-body
echo '</div>'; // Ends card
echo '</div>'; // Ends col

echo '</div>'; // Ends first row

// Second row
echo '<div class="row">';

// Get the itin summaries
$query = "SELECT * FROM itin_summaries WHERE customer_id = :customer_id AND individual_id = :individual_id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':customer_id', $customer_id);
$stmt->bindParam(':individual_id', $individual_id);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!empty($results)) {
    foreach ($results as $result) {

        // Get the ITIN plan
        $query = "SELECT plan FROM service_records WHERE id = :service_record_id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':service_record_id', $result['service_record_id'], PDO::PARAM_STR);
        $stmt->execute();
        $plan = $stmt->fetchColumn();

        $baseLanguage = substr($formLanguage, 0, 2);
        $langField = $baseLanguage . '_name';

        // Consulta SQL para obtener country_of_birth y country_of_citizenship de itin_applications
        $query = "SELECT ia.country_of_birth, ia.country_of_citizenship, cb." . $langField . " AS country_of_birth_name, cc." . $langField . " AS country_of_citizenship_name FROM itin_summaries AS isum JOIN itin_applications AS ia ON isum.itin_application_id = ia.id JOIN countries AS cb ON ia.country_of_birth = cb.alpha2_code JOIN countries AS cc ON ia.country_of_citizenship = cc.alpha2_code WHERE isum.id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $result['id']);
        $stmt->execute();
        $country = $stmt->fetch(PDO::FETCH_ASSOC);

        $countryOfBirth = $country['country_of_birth_name'];
        $countryOfCitizenship = $country['country_of_citizenship_name'];

        // Get the default individual address
        // $individualDefaultAddress = getIndividualDefaultAddressByIndividualId($individual_id);
        // Check if a default individual address exists
        if ($individualDefaultAddress) {
            // If yes, retrieve the email address, and construct the full address using the relevant properties of the individual address object

            // Retrieve the country name in the user's language
            $country_code = $individualDefaultAddress->getCountry();
            $query = "SELECT " . $langField . " AS country_name FROM countries WHERE alpha2_code = :country_code";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':country_code', $country_code);
            $stmt->execute();
            $countryName = $stmt->fetch(PDO::FETCH_ASSOC);
            $countryName = ($countryName) ? $countryName['country_name'] : 'Unknown';

            // Retrieve the state name in the user's language
            $state_code = $individualDefaultAddress->getState();
            $query = "SELECT " . $langField . " AS state_name FROM states WHERE iso_code = :state_code";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':state_code', $state_code);
            $stmt->execute();
            $stateName = $stmt->fetch(PDO::FETCH_ASSOC);
            $stateName = ($stateName) ? $stateName['state_name'] : 'Unknown';

            // Construct the full address including the country name in the user's language
            $defaultAddress = $individualDefaultAddress->getLine1() . ($individualDefaultAddress->getLine2() ? ', ' . $individualDefaultAddress->getLine2() : '') . ', ' . $individualDefaultAddress->getCity() . ', ' . $stateName . ', ' . $individualDefaultAddress->getZipCode() . ', ' . $countryName;
        } else {
            // If no, set the defaultAddress variable to 'No default address found.'
            $defaultAddress = 'No default address found.';
        }

        // Get the default individual email
        // $individualDefaultEmail = getIndividualDefaultEmailByIndividualId($individual_id);
        // Check if a default individual email exists
        if ($individualDefaultEmail) {
            // If yes, retrieve the email address
            $defaultEmail = $individualDefaultEmail->getAddress();
        } else {
            // If no, set the defaultEmail variable to 'No default email found.'
            $defaultEmail = 'No default email found.';
        }

        // Get the default individual phone
        // $individualDefaultPhone = getIndividualDefaultPhoneByIndividualId($individual_id);
        // Check if a default individual phone exists
        if ($individualDefaultPhone) {
            // If yes, retrieve the phone number
            $defaultCountryCode = $individualDefaultPhone->getCountryCode();
            $defaultPhone = " +" . $individualDefaultPhone->getCountryPhoneCode() . " " . $individualDefaultPhone->getNumber();
        } else {
            // If no, set the defaultPhone variable to 'No default phone found.'
            $defaultPhone = 'No default phone found.';
        }

        $hasActiveApplication = false;
        if ($result['status'] != 'Closed' && $result['status'] != 'Assigned') {
            $hasActiveApplication = true;
        }

        // Store the selected summary in the session
        echo '<form method="post" action="application-summary" style="display:none;" id="itinSummaryForm' . $result['itin_application_id'] . '">';
        echo '<input type="hidden" name="selected-itin-application-id" value="' . $result['itin_application_id'] . '">';
        echo '</form>';

        // Card 1: Individual info
        echo '<div class="col-12 col-md-6 mb-3">';
        echo '<div class="card card-itin card-service-info" onclick="document.getElementById(\'itinSummaryForm' . $result['itin_application_id'] . '\').submit();">';
        echo '<div class="card-body mb-3">';
        echo '<h5 class="card-title text-start">' . $langTexts['application'] . ' ' . $langTexts['madeOn'] . ' ' . $result['application_date'] . '</h5>';
        echo '<p class="card-text text-start" style="min-height: 140px; overflow: hidden;">';
        echo '<strong>' . $langTexts['plan'] . ':</strong> <u style="text-decoration-style: dotted;">' . $plan . '</u><br>';
        echo '<strong>' . $langTexts['subscriber'] . ':</strong> <u style="text-decoration-style: dotted;">' . $individual->getName() . '</u><br>';
        echo '<strong>' . $langTexts['taxId'] . ':</strong> <u style="text-decoration-style: dotted;">' . $individual->getTaxId() . '</u><br>';
        echo '<strong>' . $langTexts['address'] . ':</strong> <u style="text-decoration-style: dotted;">' . $defaultAddress . '</u><br>';
        echo '<strong>' . $langTexts['email'] . ':</strong> <u style="text-decoration-style: dotted;">' . $defaultEmail . '</u><br>';
        echo '<strong>' . $langTexts['phone'] . ':</strong> <u style="text-decoration-style: dotted;">';
        if (!empty($defaultCountryCode) && !empty($defaultPhone)) {
            echo '<span class="fi fi-' . strtolower($defaultCountryCode) . '"> </span>' . $defaultPhone . '</u><br>';
        } else {
            echo 'N/A<br>';
        }
        echo '</p>';
        echo '<hr>';
        echo '<p class="card-text text-start">';
        echo '<strong>' . $langTexts['dateOfBirth'] . ':</strong> <u style="text-decoration-style: dotted;">' . $customer->getDateOfBirth() . '</u><br>';
        echo '<strong>' . $langTexts['countryOfBirth'] . ':</strong> <u style="text-decoration-style: dotted;">' . $countryOfBirth . '</u><br>';
        echo '<strong>' . $langTexts['countryOfCitizenship'] . ':</strong> <u style="text-decoration-style: dotted;">' . $countryOfCitizenship . '</u><br>';
        echo '</p>';
        echo '</div>'; // Ends card-body
        echo '</div>'; // Ends card
        echo '</div>'; // Ends col
    }
    echo '</div>'; // Ends second row
} else {
    // Card 1: Individual info
    echo '<div class="col-12 col-md-6 mb-3">';
    echo '<div class="card card card-itin card-service-info">';
    echo '<div class="card-body">';
    echo '<h5 class="card-title"></h5>';
    echo '<p class="card-text">' . $langTexts['noServiceFound'] . '</p>'; // No applications found
    echo '</div>'; // Ends card-body
    echo '</div>'; // Ends card
    echo '</div>'; // Ends col
    echo '</div>'; // Ends second row
}

// Third row
echo '<div class="row">';

// Card 1: Add a new Itin
echo '<div class="col-12 col-md-6 mb-3">';
echo '<div class="card card card-itin card-add-a-new-itin dotted-border" id="add-a-new-itin">';
echo '<i class="bi bi-plus-circle"></i>';
echo '<div class="card-body">';
echo '<h5 class="card-title">' . $langTexts['applyForAnITIN'] . '</h5>';
echo '<p class="card-text">' . $langTexts['newOrRenew'] . '</p>';
echo '</div>'; // Ends card-body
echo '</div>'; // Ends card
echo '</div>'; // Ends col

echo '</div>'; // Ends third row


echo '</div>'; // Ends Mailbox Cards 
echo '<br>';
echo '<br>';

echo '</div>'; // Ends "flex-grow-1"
echo '</div>'; // End Main Content 
echo '</div>'; // End "row g-0"

// Back button
echo '<div style="text-align: center;">';
echo '<a href="' . URL . '/services/" id="itin-back-link">';
echo '<i class="bi bi-arrow-left"></i> ' . $langTexts['back'];
echo '</a>';
echo '</div>';
echo '<br>';
echo '<br>';

// Footer
echo '<div>';
// displayUserFooter($formLanguage);
echo '</div>';

echo '</div>'; // End "row g-0"
echo '</div>'; // End "container-fluid p-0"

// Load Common Scripts
loadCommonScripts();
// Sweetalert 
echo '<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>';

echo '</body>';
echo '</html>';

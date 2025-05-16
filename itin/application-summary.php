<?php
// Start of the session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Get the session language, if available, or set it to 'en-US' by default
$formLanguage = isset($_SESSION['user']['language']) ? htmlspecialchars($_SESSION['user']['language'], ENT_QUOTES, 'UTF-8') : 'en-US';

// Includes configuration file to load global variables and settings
require_once __DIR__ . '/../../config/config.php';
require_once __ROOT__ . '/includes/includes.php';
require_once __ROOT__ . '/includes/includes_layouts.php';
require_once __ROOT__ . '/includes/includes_functions.php';
require_once __ROOT__ . '/includes/includes_messages.php';
require_once __ROOT__ . '/includes/includes_languages.php';
require_once __ROOT__ . '/includes/includesDAO.php';

// Check if the user is logged in
checkSession($formLanguage);

// Write the log to the log file (SESSION)
if (isset($_SESSION)) {
    $content = print_r($_SESSION, true);
    $filePath = __DIR__ . '/session_application_summary.txt';
    $errorFilePath = __DIR__ . '/session_application_summary_error_log.txt';
    $source = '/services/itin/application_summary.php';
    logData($filePath, $content, $source, $errorFilePath);
}
// Write the log to the log file (POST)
if (isset($_POST)) {
    $content = print_r($_POST, true);
    $filePath = __DIR__ . '/post_application_summary.txt';
    $errorFilePath = __DIR__ . '/post_application_summary_error_log.txt';
    $source = '/services/itin/application_summary.php';
    logData($filePath, $content, $source, $errorFilePath);
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
checkEmailVerification($conn, $formLanguage, $username, $email);

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

$user = getUserById($user_id);
$customer = getCustomerById($customer_id);
$individual = getIndividualById($individual_id);
$business = getBusinessById($business_id);

// Methods for the user
$user_id = $user ? $user->getId() : null;
if ($user_id) {
    $user_emails = getUserEmailByUserId($user_id);
    $userDefaultEmail = getUserDefaultEmailByUserId($user_id);
    $user_phones = getUserPhoneByUserId($user_id);
    $userDefaultPhone = getUserDefaultPhoneByUserId($user_id);
    //$user_addresses = getUserAddressByUserId($user_id);
    //$userDefaultAddress = getUserDefaultAddressByUserId($user_id);
}

// Methods for the customer
$customer_id = $customer ? $customer->getId() : null;
if ($customer_id) {
    $customer_emails = getCustomerEmailByCustomerId($customer_id);
    $customerDefaultEmail = getCustomerDefaultEmailByCustomerId($customer_id);
    $customer_phones = getCustomerPhoneByCustomerId($customer_id);
    $customerDefaultPhone = getCustomerDefaultPhoneByCustomerId($customer_id);
    $customer_addresses = getCustomerAddressByCustomerId($customer_id);
    $customerDefaultAddress = getCustomerDefaultAddressByCustomerId($customer_id);
    $customerBillingAddress = getCustomerBillingAddressByCustomerId($customer_id);
    $customerShippingAddress = getCustomerShippingAddressByCustomerId($customer_id);
}

// Methods for the individual
$individual_id = $individual ? $individual->getId() : null;
if ($individual_id) {
    $individual_emails = getIndividualEmailByIndividualId($individual_id);
    $individualDefaultEmail = getIndividualDefaultEmailByIndividualId($individual_id);
    $individual_phones = getIndividualPhoneByIndividualId($individual_id);
    $individualDefaultPhone = getIndividualDefaultPhoneByIndividualId($individual_id);
    $individual_addresses = getIndividualAddressByIndividualId($individual_id);
    $individualDefaultAddress = getIndividualDefaultAddressByIndividualId($individual_id);
    $individualBillingAddress = getIndividualBillingAddressByIndividualId($individual_id);
    $individualShippingAddress = getIndividualShippingAddressByIndividualId($individual_id);
}

// Methods for business
$business_id = $business ? $business->getId() : null;
if ($business_id) {
    $business_emails = getBusinessEmailByBusinessId($business_id);
    $businessDefaultEmail = getBusinessDefaultEmailByBusinessId($business_id);
    $business_phones = getBusinessPhoneByBusinessId($business_id);
    $businessDefaultPhone = getBusinessDefaultPhoneByBusinessId($business_id);
    $business_addresses = getBusinessAddressByBusinessId($business_id);
    $businessDefaultAddress = getBusinessDefaultAddressByBusinessId($business_id);
    $businessBillingAddress = getBusinessBillingAddressByBusinessId($business_id);
    $businessShippingAddress = getBusinessShippingAddressByBusinessId($business_id);
}

// Select texts based on the language
// $langTexts = $textsITIN[$formLanguage] ?? $textsITIN['en-US'];
// $langTexts = !empty($textsITIN[$formLanguage]) ? $textsITIN[$formLanguage] : $textsITIN['en-US'];
$langTexts = !empty($textsITIN_application_summary[$formLanguage]) ? $textsITIN_application_summary[$formLanguage] : $textsITIN_application_summary['en-US'];

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['selected-itin-application-id'])) {
    $_SESSION['itin_application_id'] = $_POST['selected-itin-application-id'];
    header('Location: application-summary');
    exit;
}

// Verificar que el mailbox seleccionado pertenece al usuario autenticado
$itin_application_id = $_SESSION['itin_application_id'] ?? null;

// Open HTML
echo '<!DOCTYPE html>';
echo '<html lang="' . $formLanguage . '">';

echo '<style>';
echo '#prepare-tax-return-itin-link,';
echo '#caa-service-request-itin-link,';
echo '#create-company-itin-link {';
echo 'margin-right: 10px;';
echo 'text-decoration: none;';
echo '/*color: #000000;*/';
echo '}';
echo '.card {';
echo 'display: flex;';
echo 'align-items: left;';
echo 'justify-content: center;';
echo 'flex-direction: column;';
// echo 'text-align: center;';
echo 'min-height: 150px;';
echo '}';
echo '.card-header {';
echo 'background-color: #f8f9fa;';
echo '}';
echo '.card-body {';
echo 'padding: 1rem;';
echo '}';
echo '.card-footer {';
echo 'background-color: #f8f9fa;';
echo '}';
echo '.card-itin.card-upload-files:hover {';
echo 'background-color: rgba(100, 163, 242, 0.1);';
echo 'cursor: pointer;';
echo '}';
echo '.icons a {';
echo 'margin: 0 10px;';
echo '}';
echo '.btn-outline-custom {';
echo 'color: #000;';
echo 'transition: color 0.3s;';
echo '}';
echo '.btn-outline-custom:hover {';
echo 'color: #fff;';
echo '}';
echo '</style>';

echo '<head>';

// Load Common Resources
loadCommonResources();
// echo '<link rel="stylesheet" href="' . URL . '/assets/css/itin.css">';

// Header
displayUserHeader($formLanguage, $user);

// Tab title
echo '<title>' . $langTexts['applicationSummaryTabTitle'] . '</title>';

echo '</head>';

echo '<body>';

// Menu
displayUserMenu($formLanguage);

// Application Summary content
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
echo '<h4 class="mt-5" id="greeting">';
echo '' . $langTexts['titleApplicationSummary'] . '';
echo '</h4>';
echo '</div>';
echo '</div>';
echo '<br>';
echo '<br>';

// Cards
echo '<div class="container">';

echo '<div style="text-align: center;">';
echo '<a href="#" id="prepare-tax-return-itin-link" class="btn btn-outline-primary me-2 mb-2"><i class="bi bi-file-bar-graph"></i> ' . $langTexts['taxReturn'] . '</a>';
echo '<a href="#" id="caa-service-request-itin-link" class="btn btn-outline-secondary me-2 mb-2"><i class="bi bi-file-person"></i> ' . $langTexts['caaService'] . '</a>';
echo '<a href="#" id="create-company-itin-link" class="btn btn-outline-success me-2 mb-2"><i class="bi bi-building"></i> ' . $langTexts['formCompany'] . '</a>';
echo '</div>';
echo '<br>';
echo '<br>';

// First row
echo '<div class="row">';
$sql = "SELECT id, id_code, application_date, w7, caa, tax_return, form_a_company, itin_type, reason, shipping, shipping_date, carrier, tracking, status,  status_date FROM itin_summaries WHERE itin_application_id = :itin_application_id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':itin_application_id', $itin_application_id);
$stmt->execute();
$itin_summaries = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($itin_summaries as $itin_summary) {
    echo '<div class="col-12 col-md-6 mb-3">';
    echo '<div class="card card-itin card-application-summary">';
    echo '<div class="card-header">';
    echo '<h5 class="card-title">' . $langTexts['applicationID'] . ': ' . $itin_summary['id_code'] . '</h5>';
    echo '</div>'; // Ends card-header
    echo '<div class="card-body">';
    echo '<strong>' . $langTexts['requestDate'] . ':</strong> ' . $itin_summary['application_date'] . '<br>';
    echo '<strong>' . $langTexts['includesW7'] . ':</strong> ' . (($itin_summary['w7'] == 1) ? 'Included' : 'Not included') . '<br>';
    echo '<strong>' . $langTexts['includesCAAService'] . ':</strong> ' . (($itin_summary['caa'] == 1) ? 'Included' : 'Not included') . '<br>';
    echo '<strong>' . $langTexts['includesTaxReturn'] . ':</strong> ' . (($itin_summary['tax_return'] == 1) ? 'Included' : 'Not included') . '<br>';
    echo '<strong>' . $langTexts['includesFormCompany'] . ':</strong> ' . (($itin_summary['form_a_company'] == 1) ? 'Included' : 'Not included') . '<br>';
    echo '<strong>' . $langTexts['applicationType'] . ':</strong> ' . $itin_summary['itin_type'] . '<br>';
    echo '<strong>' . $langTexts['reasonForApplying'] . ':</strong> ' . $itin_summary['reason'] . '<br>';
    echo '<strong>' . $langTexts['includesShipping'] . ':</strong> ' . (($itin_summary['shipping'] == 1) ? 'Included' : 'Not included') . '<br>';
    echo '<strong>' . $langTexts['shippingDate'] . ':</strong> ' . $itin_summary['shipping_date'] . '<br>';
    echo '<strong>' . $langTexts['carrier'] . ':</strong> ' . $itin_summary['carrier'] . '<br>';
    echo '<strong>' . $langTexts['trackingNumber'] . ':</strong> ' . $itin_summary['tracking'] . '<br>';
    echo '<strong>' . $langTexts['status'] . ':</strong> ' . $itin_summary['status'] . '<br>';
    echo '<strong>' . $langTexts['statusDate'] . ':</strong> ' . $itin_summary['status_date'] . '<br>';
    echo '<br>';
    echo '<br>';
    echo '<div class="text-center">';
    echo '<form action="application-documents" method="post">';
    echo '<input type="hidden" name="application_id" value="' . $itin_summary['id'] . '">';
    echo '<button type="submit" class="btn btn-primary">' . $langTexts['viewDocuments'] . '</button>';
    echo '</form>';
    echo '</div>';
    echo '<br>';
    echo '</div>'; // Ends card-body
    echo '<div class="card-footer text-center">';
    echo '<br>';
    echo '</div>'; // Ends card-footer
    echo '</div>'; // Ends card
    echo '</div>'; // Ends col

    $hasActiveApplication = false;
    if ($itin_summary['status'] != 'Closed' && $itin_summary['status'] != 'Assigned') {
        $hasActiveApplication = true;
    }
}
echo '</div>'; // Ends first row

// Second row
echo '<div class="row">';

// Mostrar el card de "Upload Files" solo si hay una aplicación activa
if ($hasActiveApplication) {
// Card 1: Upload Files
echo '<div class="col-12 col-md-6 mb-3">';
echo '<div class="card card-itin card-upload-files dotted-border text-center" id="upload-files-for-itin">';
echo '<i class="bi bi-cloud-upload"></i>';
echo '<div class="card-body">';
echo '<h5 class="card-title">' . $langTexts['uploadFiles'] .  '</h5>';
echo '<p class="card-text"></p>';
echo '</div>';
echo '</div>';
echo '</div>';
}

echo '</div>'; // Ends second row

echo '</div>'; // Ends container
echo '<br>';
echo '<br>';
/*
echo '<div style="text-align: center;">';
echo '<a href="#" id="itin-upload-files-link">';
echo '<a ' . ($hasActiveApplication ? '' : 'disabled') . ' href="' . ($hasActiveApplication ? URL . '/services/itin/upload_files' : '#') . '" id="itin-upload-files-link">' . $langTexts['uploadFiles'] . '</a>';
echo '<br>';
echo '</div>';
echo '<br>';
echo '<br>';
*/
echo '</div>'; // Ends flex-grow-1
echo '</div>'; // Ends Main Content
echo '</div>'; // Ends second row g-0

// Back button
echo '<div style="text-align: center;">';
echo '<a href="' . URL . '/services/itin/" id="mail-back-link">';
echo '<i class="bi bi-arrow-left"></i> ' . $langTexts['back'];
echo '</a>';
echo '</div>';
echo '<br>';
echo '<br>';

// Footer
echo '<div>';
displayUserFooter($formLanguage);
echo '</div>';

echo '</div>'; // Ends first row g-0
echo '</div>'; // Ends Applications Summary content

// Load Common Scripts
loadCommonScripts();
// Sweetalert 
echo '<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>';

/**
 * JavaScript to redirect only if there is an active application
 */
echo '<script>';
echo 'var cardElement = document.getElementById(\'upload-files-for-itin\');';
echo 'cardElement.addEventListener(\'click\', function () {';
echo 'if (' . ($hasActiveApplication ? 'true' : 'false') . ') {';
echo 'window.location.href = baseURL + \'/services/itin/upload-files\';'; // Redirect if there is an active application
echo '}';
echo '});';
echo '</script>';

echo '</body>';
echo '</html>';

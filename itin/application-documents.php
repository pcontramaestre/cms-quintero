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
    $filePath = __DIR__ . '/session_application_documents.txt';
    $errorFilePath = __DIR__ . '/session_application_documents_error_log.txt';
    $source = '/services/itin/application_documents.php';
    logData($filePath, $content, $source, $errorFilePath);
}
// Write the log to the log file (POST)
if (isset($_POST)) {
    $content = print_r($_POST, true);
    $filePath = __DIR__ . '/post_application_documents.txt';
    $errorFilePath = __DIR__ . '/post_application_documents_error_log.txt';
    $source = '/services/itin/application_documents.php';
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
// $langTexts = $textsITIN_[$formLanguage] ?? $textsITIN['en-US'];
// $langTexts = !empty($textsITIN[$formLanguage]) ? $textsITIN[$formLanguage] : $textsITIN['en-US'];
$langTexts = !empty($textsITIN_application_documents[$formLanguage]) ? $textsITIN_application_documents[$formLanguage] : $textsITIN_application_documents['en-US'];

// Application ID
$application_id = isset($_POST['application_id']) ? htmlspecialchars(trim($_POST['application_id']), ENT_QUOTES, 'UTF-8') : '';

// Open HTML
echo '<!DOCTYPE html>';
echo '<html lang="' . $formLanguage . '">';

echo '<head>';

// Load Common Resources
loadCommonResources();

// Header
displayUserHeader($formLanguage, $user);

echo '<title>' . $langTexts['applicationDocumentsTabTitle'] . ' </title>';

echo '<style>';
echo '.card-header {';
echo 'background-color: #f8f9fa;';
echo '}';
echo '.card-body {';
echo 'padding: 1rem;';
echo '}';
echo '.card-footer {';
echo 'background-color: #f8f9fa;';
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
echo '.center-card {';
echo 'margin: 0 auto; /* Alinea horizontalmente al centro */';
echo 'text-align: center; /* Alinea el contenido del texto al centro */';
echo '}';
echo '</style>';

echo '</head>';

echo '<body>';

// Menu
displayUserMenu($formLanguage);

// Application Documents content
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
echo '' . $langTexts['titleApplicationDocuments'] . '';
echo '</h4>';
echo '</div>';
echo '</div>';
echo '<br>';
echo '<br>';

// Cards
echo '<div class="container">';

echo '<div class="row">';

// Realizar la consulta para obtener los documentos de la aplicación con el ID $application_id
$query = "SELECT * FROM itin_files WHERE itin_application_id = :id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':id', $application_id);
$stmt->execute();
$itin_files = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!empty($itin_files)) {
    foreach ($itin_files as $file) {
        echo '<div class="col-12 col-md-6 col-lg-3 mb-3">';
        echo '<div class="card mb-3 d-flex" style="min-height: 400px;">';
        echo '<div class="card-header">';
        echo '<h5 class="card-title">' . $file['document_type'] . '</h5>';
        echo '</div>'; // Ends card-header
        echo '<div class="card-body">';
        echo '<strong>' . $langTexts['uploadDate'] . ':</strong> ' . $file['upload_date'] . '<br>';
        echo '<p><strong>' . $langTexts['file'] . ':</strong> ';
        $file_path = $file['file_path'];
        $file_url = URL . str_replace('../', '/', $file_path);
        $extension = pathinfo($file_path, PATHINFO_EXTENSION);
        $extension = strtolower($extension);
        switch ($extension) {
            case 'pdf':
                echo '<a href="' . htmlspecialchars($file_url) . '" target="_blank" style="text-decoration: none;"><i class="bi bi-file-pdf"></i> PDF</a>';
                break;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                echo '<a href="' . htmlspecialchars($file_url) . '" target="_blank" style="text-decoration: none;"><i class="bi bi-image"></i> IMG</a>';
                break;
            case 'xls':
            case 'xlsx':
                echo '<a href="' . htmlspecialchars($file_url) . '" target="_blank" style="text-decoration: none;"><i class="bi bi-file-excel"></i> EXCEL</a>';
                break;
            case 'doc':
            case 'docx':
                echo '<a href="' . htmlspecialchars($file_url) . '" target="_blank" style="text-decoration: none;"><i class="bi bi-file-word"></i> WORD</a>';
                break;
            case 'csv':
                echo '<a href="' . htmlspecialchars($file_url) . '" target="_blank" style="text-decoration: none;"><i class="bi bi-file-csv"></i> CSV</a>';
                break;
            case 'txt':
                echo '<a href="' . htmlspecialchars($file_url) . '" target="_blank" style="text-decoration: none;"><i class="bi bi-file-text"></i> TXT</a>';
                break;
            default:
                echo '-';
                break;
        }
        echo '<br>';
        echo '<strong>' . $langTexts['issuedBy'] . ':</strong> ' . $file['issued_by'] . '<br>';
        echo '<strong>' . $langTexts['dateOfIssue'] . ':</strong> ' . $file['date_of_issue'] . '<br>';
        echo '<strong>' . $langTexts['expiryDate'] . ':</strong> ' . $file['expiry_date'] . '<br>';
        echo '<strong>' . $langTexts['description'] . ':</strong> ' . $file['description'] . '<br>';
        echo '<strong>' . $langTexts['status'] . ':</strong> ' . $file['status'] . '<br>';
        echo '</p>';
        echo '</div>'; // Ends card-body
        echo '<div class="card-footer text-center">';
        echo '<br>';
        echo '</div>'; // Ends card-footer
        echo '</div>'; // Ends card
        echo '</div>'; // Ends col
    }
} else {
    // Card 1: Application Summary
    echo '<div class="col-12 col-md-6 col-lg-3 mb-3 center-card">';
    echo '<div class="card mb-3 d-flex">';
    echo '<div class="card-body text-center">';
    echo '<p class="card-text">' . $langTexts['noDocumentsFound'] . '</p>'; // No applications found
    echo '</div>'; // Ends card-body
    echo '</div>'; // Ends card
    echo '</div>'; // Ends col
}

echo '</div>'; // Ends row
echo '</div>'; // Ends container
echo '<br>';
echo '<br>';

echo '</div>'; // Ends flex-grow-1
echo '</div>'; // Ends Main Content
echo '</div>'; // Ends second row g-0

// Back button
echo '<div style="text-align: center;">';
echo '<a href="' . URL . '/services/itin/application-summary" id="itin-application-documents-back-link">';
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
echo '</div>'; // Ends Application Documents content

// Load Common Scripts
loadCommonScripts();
echo '<script src="' . URL . '/assets/js/itin_application_documents.js"></script>';
// Sweetalert 
echo '<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>';

echo '</body>';
echo '</html>';

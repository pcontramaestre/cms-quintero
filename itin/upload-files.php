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
    $filePath = __DIR__ . '/upload_files.txt';
    $errorFilePath = __DIR__ . '/upload_files_error_log.txt';
    $source = '/services/itin/upload_files.php';
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
$langTexts = !empty($textsITIN_upload_files[$formLanguage]) ? $textsITIN_upload_files[$formLanguage] : $textsITIN_upload_files['en-US'];

//  Query to get service folder
$query = "SELECT folder_path FROM service_records WHERE customer_id = :customer_id AND individual_id = :individual_id AND service_type = 'ITIN Application' AND status != 'Closed'";
$stmt = $conn->prepare($query);
$stmt->bindParam(':customer_id', $customer_id);
$stmt->bindParam(':individual_id', $individual_id);
$stmt->execute();
$serviceFolderPath = $stmt->fetch(PDO::FETCH_ASSOC);
// Check if the service folder was found
if ($serviceFolderPath) {
    // Assign the service folder to the variable
    $serviceFolderPath = $serviceFolderPath['folder_path'];
}

//
$query = "SELECT id FROM itin_summaries WHERE customer_id = :customer_id AND individual_id = :individual_id AND status != 'Closed' AND status != 'Assigned'";
$stmt = $conn->prepare($query);
$stmt->bindParam(':customer_id', $customer_id);
$stmt->bindParam(':individual_id', $individual_id);
$stmt->execute();
$itin_application_id = $stmt->fetch(PDO::FETCH_ASSOC);
// Check if the itin_application_id was found
if ($itin_application_id) {
    // Assign the itin_application_id to the variable
    $itin_application_id = $itin_application_id['id'];
}

// Open HTML
echo '<!DOCTYPE html>';
echo '<html lang="' . $formLanguage . '">';

echo '<head>';

// Load Common Resources
loadCommonResources();
echo '<link rel="stylesheet" href="' . URL . '/assets/css/itin_upload_files.css">';

// Header
displayUserHeader($formLanguage, $user);

// Tab title
echo '<title>' . $langTexts['uploadFilesTabTitle'] . '</title>';

echo '</head>';

echo '<body>';

// Menu
displayUserMenu($formLanguage);

// Upload Files content
echo '<div class="container-fluid p-0">';
// Row content
echo '<div class="row g-0">';
echo '<div class="row g-0">';
// Main content
echo '<div class="col-12 p-0 d-flex flex-column">';
echo '<div class="flex-grow-1">';
// Page title
echo '<div class="container-fluid">';
echo '<div class="col px-0 text-center">';
echo '<h4 class="mt-5" id="greeting">';
echo '' . $langTexts['titleUploadFiles'] . '';
echo '</h4>';
echo '</div>';
echo '</div>';
echo '<br>';
echo '<br>';

echo '<div class="container">';
echo '<div class="row">';
echo '<div class="col-12">';
echo '<div class="card mb-4">';
echo '<div class="card-body">';
echo '<form action="' . URL . '/data/sql_upload_itin_files" class="insert-form" enctype="multipart/form-data" id="insert-form" method="POST">';
echo '<input type="hidden" name="customer_id" id="customer_id" value="' . $customer_id . '">';
echo '<input type="hidden" name="individual_id" id="individual_id" value="' . $individual_id . '">';
echo '<input type="hidden" name="itin_application_id" id="itin_application_id" value="' . $itin_application_id . '">';
echo '<input type="hidden" name="service_folder_path" id="service_folder_path" value="' . $serviceFolderPath . '">';
echo '<input type="hidden" name="itin_upload_files_form_language" id="itin_upload_files_form_language" value="' . $formLanguage . '">';
echo '<div id="file-upload-container">';
echo '<div class="card mb-3">';
echo '<div class="card-header">';
echo '<h5 class="card-title"> ' . $langTexts['file'] . ' #1</h5>';
echo '</div>';
echo '<div class="card-body">';
// Date
echo '<div class="mb-3">';
echo '<label for="itin_upload_date_1" class="form-label"> ' . $langTexts['date'] . '</label>';
// echo '<input type="date" class="form-control" name="itin_upload_date_1[]" id="itin_upload_date_1" value="' . date('Y-m-d') . '" readonly>';
echo '<input type="date" class="form-control" name="itin_upload_date[]" id="itin_upload_date_1" value="' . date('Y-m-d') . '" ' . ($itin_application_id ? '' : 'disabled') . '>';
echo '</div>';
// File 
echo '<div class="mb-3">';
echo '<label for="file_1" class="form-label"> ' . $langTexts['file'] . '</label>';
// echo '<input type="file" class="form-control" name="file[]" id="file_1" required>';
echo '<input type="file" class="form-control" name="file[]" id="file_1" ' . ($itin_application_id ? '' : 'disabled') . ' required>';
// File validation
echo '<div class="invalid-feedback"> ' . $langTexts['pleaseSelectFile'] . '</div>';
echo '</div>';
// Document Type
echo '<div class="mb-3">';
echo '<label for="itin_document_type_1" class="form-label"> ' . $langTexts['documentType'] . '</label>';
// echo '<select class="form-select" name="itin_document_type[]" id="itin_document_type_1" required>';
echo '<select class="form-select" name="itin_document_type[]" id="itin_document_type_1" ' . ($itin_application_id ? '' : 'disabled') . ' required>';
echo '<option disabled selected> ' . $langTexts['pleaseSelectDocumentType'] . '</option>';
// Document Type validation
foreach ($langTexts['documentTypes'] as $key => $value) {
    echo '<option value="' . $key . '">' . $value . '</option>';
}
echo '</select>';
if ($formLanguage == 'en-US') {
    echo '<div class="invalid-feedback"> ' . $langTexts['pleaseSelectDocumentType'] . '</div>';
}
echo '</div>';
// Issued By
echo '<div class="mb-3">';
echo '<label for="issued_by_1" class="form-label"> ' . $langTexts['issuedBy'] . '</label>';
// echo '<input class="form-control" type="text" name="issuedBy_1[]" id="issuedBy_1">';
echo '<input class="form-control" type="text" name="issued_by[]" id="issued_by_1" ' . ($itin_application_id ? '' : 'disabled') . '>';
echo '</div>';
// Date of Issue
echo '<div class="mb-3">';
echo '<label for="itin_date_of_issue_1" class="form-label"> ' . $langTexts['dateOfIssue'] . '</label>';
// echo '<input type="date" class="form-control" name="itin_date_of_issue_1[]" id="itin_date_of_issue_1" value="' . date('Y-m-d') . '" readonly>';
echo '<input type="date" class="form-control" name="itin_date_of_issue[]" id="itin_date_of_issue_1" value="' . date('Y-m-d') . '" ' . ($itin_application_id ? '' : 'disabled') . '>';
echo '</div>';
// Expiry Date
echo '<div class="mb-3">';
echo '<label for="itin_expiry_date_1" class="form-label"> ' . $langTexts['expiryDate'] . '</label>';
// echo '<input type="date" class="form-control" name="itin_expiry_date[]" id="itin_expiry_date_1" value="' . date('Y-m-d') . '" readonly>';
echo '<input type="date" class="form-control" name="itin_expiry_date[]" id="itin_expiry_date_1" value="' . date('Y-m-d') . '"' . ($itin_application_id ? '' : 'disabled') . '>';
echo '</div>';

// Comments
echo '<div class="mb-3">';
echo '<label for="itin_text_comment_1" class="form-label"> ' . $langTexts['description'] . '</label>';
// echo '<input class="form-control" type="text" name="itin_text_comment[]" id="itin_text_comment_1">';
echo '<input class="form-control" type="text" name="itin_text_comment[]" id="itin_text_comment_1" ' . ($itin_application_id ? '' : 'disabled') . '>';
echo '</div>';
echo '</div>';

// Delete
echo '<div class="card-footer text-center">';
echo '<button type="button" class="btn btn-danger remove-card" disabled>' . $langTexts['delete'] . '</button>';
echo '</div>';
echo '</div>';
echo '</div>';
// Add File
echo '<div class="text-center">';
// echo '<button type="button" class="btn btn-warning" id="add-file">' . $langTexts['addFile'] . '</button>';
echo '<button type="button" class="btn btn-warning" id="add-file" ' . ($itin_application_id ? '' : 'disabled') . '>' . $langTexts['addFile'] . '</button>';
echo '<span style="margin: 0 10px;"></span>';
// echo '<button type="submit" class="btn btn-primary">' . $langTexts['save'] . '</button>';
echo '<button type="submit" class="btn btn-primary" ' . ($itin_application_id ? '' : 'disabled') . '>' . $langTexts['save'] . '</button>';
echo '</div>';

echo '</form>';
echo '</div>';
echo '</div>';
echo '</div>';
echo '</div>';
echo '</div>';
echo '<br>';
echo '<br>';

// Back button
echo '<div style="text-align: center;">';
echo '<a href="' . URL . '/services/itin/application-summary" id="itin-upload-files-back-link">';
echo '<i class="bi bi-arrow-left"></i> ' . $langTexts['back'];
echo '</a>';
echo '</div>';
echo '<br>';
echo '<br>';

// Footer
echo '<div>';
displayUserFooter($formLanguage);
echo '</div>';

// Load Common Scripts
loadCommonScripts();
echo '<script src="' . URL . '/assets/js/itinUploadFiles.js"></script>';

echo '</body>';
echo '</html>';
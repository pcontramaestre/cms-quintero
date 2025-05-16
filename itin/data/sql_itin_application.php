<?php
// Start of the session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Get the session language, if available, or set it to 'en-US' by default
$formLanguage = isset($_SESSION['user']['language']) ? htmlspecialchars($_SESSION['user']['language'], ENT_QUOTES, 'UTF-8') : 'en-US';

// Includes configuration file to load global variables and settings
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/includes/includes.php';
require_once __ROOT__ . '/includes/includes_languages.php';
//Load the Composer autoloader
require_once __ROOT__ . '/libraries/vendor/autoload.php';
require_once __ROOT__ . '/services/itin/class/ITINApplication.php';
require_once __ROOT__ . '/services/itin/class/Order.php';
require_once __ROOT__ . '/services/itin/class/Receipt.php';
require_once __ROOT__ . '/services/itin/class/Invoice.php';
require_once __ROOT__ . '/services/itin/DAO/ITINApplicationDAO.php';
require_once __ROOT__ . '/services/itin/DAO/OrderDAO.php';
require_once __ROOT__ . '/services/itin/DAO/ReceiptDAO.php';
require_once __ROOT__ . '/services/itin/DAO/InvoiceDAO.php';
require_once __ROOT__ . '/services/itin/generate-form.php';
// Import Uuid class
use Ramsey\Uuid\Uuid;

// Check if the user is logged in
checkSession($formLanguage);

// Write the log to the log file (SESSION)
if (isset($_SESSION)) {
    $content = print_r($_SESSION, true);
    $filePath = __DIR__ . '/session_sql_itin_application.txt';
    $errorFilePath = __DIR__ . '/session_sql_itin_application_error_log.txt';
    $source = '/data/sql_itin_application.php';
    logData($filePath, $content, $source, $errorFilePath);
}
// Write the log to the log file (POST)
if (isset($_POST)) {
    $content = print_r($_POST, true);
    $filePath = __DIR__ . '/post_sql_itin_application.txt';
    $errorFilePath = __DIR__ . '/post_sql_itin_application_error_log.txt';
    $source = '/data/sql_itin_application.php';
    logData($filePath, $content, $source, $errorFilePath);
}

// Create an instance of the Connection class and establish the connection to the database
$connect = new Connection(); // Create a new Connection object
$conn = $connect->getConnection(); // Get a database connection

function array_some(array $data, callable $callback)
{
    $result = array_filter($data, $callback);
    return count($result) > 0;
}
function checkIfDocumentIsPresent(int $documentValue)
{
    return array_some($_POST['id_document_type'], function ($id_document_type) use ($documentValue) {
        return $id_document_type == $documentValue;
    });
}

function saveitinapplication(bool $temporal)
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';

    // Get selected option from session variable
    $service_id = isset($_SESSION['service_id']) ? htmlspecialchars(trim($_SESSION['service_id']), ENT_QUOTES, 'UTF-8') : '';
    $servicePricing = isset($_SESSION['price']) ? htmlspecialchars(trim($_SESSION['price']), ENT_QUOTES, 'UTF-8') : '';

    // Receiving the data from the itin application form
    $itin_type = isset($_POST['itin_type']) ? htmlspecialchars(trim($_POST['itin_type']), ENT_QUOTES, 'UTF-8') : '';
    if ($itin_type == "Apply for a new ITIN") { // Modify the value if it is "Apply For A New ITIN" or "Renew An Existing ITIN"
        $itin_type = "New";
    } elseif ($itin_type == "Renew an existing ITIN") {
        $itin_type = "Renew";
    }
    $reason = isset($_POST['reason']) ? htmlspecialchars(trim($_POST['reason']), ENT_QUOTES, 'UTF-8') : '';
    if (!empty($reason)) { // Get the first letter and convert it to lowercase
        $first_letter = strtolower($reason[0]);
        $reason = $first_letter;
    }

    $ITINApplication = new ITINApplication(
        isset($_POST['itin_id']) ? $_POST['itin_id'] : null,
        Uuid::uuid4()->toString(),
        true,
        date('Y-m-d'),
        $_POST['itin_type'],
        $_POST['reason'],
        $_POST['treaty_country_for_nonresident'],
        $_POST['treaty_article_for_nonresident'],
        $_POST['relationship_to_us_citizen'],
        $_POST['relative_info'],
        $_POST['spouse_info'],
        $_POST['treaty_country_for_nonresident_spr'],
        $_POST['treaty_article_for_nonresident_spr'],
        $_POST['other_info'],
        $_POST['first_name'],
        $_POST['middle_name'],
        $_POST['last_name'],
        $_POST['first_name_at_birth'],
        $_POST['middle_name_at_birth'],
        $_POST['last_name_at_birth'],
        $_POST['us_address_line1'],
        $_POST['us_city'],
        $_POST['us_state'],
        $_POST['us_zip_code'],
        $_POST['us_phone'],
        $_POST['non_us_address_line1'],
        $_POST['non_us_city'],
        $_POST['non_us_state'],
        $_POST['non_us_country'],
        $_POST['non_us_zip_code'],
        $_POST['non_us_country_phone_code'],
        $_POST['non_us_phone'],
        $_POST['date_of_birth'],
        $_POST['country_of_birth'],
        $_POST['birth_city'],
        $_POST['birth_state'],
        $_POST['gender'],
        isset($_POST['country_of_citizenship']) ? implode(', ', $_POST['country_of_citizenship']) : "",
        $_POST['foreign_tax_id'],
        $_POST['us_visa_type'],
        $_POST['us_visa_number'],
        ($_POST['us_visa_exp_date']) ? $_POST['us_visa_exp_date'] : null,
        isset($_POST['id_document_type']) ? checkIfDocumentIsPresent(0) : null,
        $_POST['passport_issued_by'] ?? null,
        $_POST['passport_number'] ?? null,
        $_POST['passport_exp_date'] ?? null,
        isset($_POST['id_document_type']) ? checkIfDocumentIsPresent(1) : null,
        $_POST['drivers_license_issued_by'] ?? null,
        $_POST['drivers_license_number'] ?? null,
        $_POST['drivers_license_exp_date'] ?? null,
        isset($_POST['id_document_type']) ? checkIfDocumentIsPresent(2) : null,
        $_POST['state_id_issued_by'] ?? null,
        $_POST['state_id_number'] ?? null,
        $_POST['state_id_exp_date'] ?? null,
        isset($_POST['id_document_type']) ? checkIfDocumentIsPresent(3) : null,
        $_POST['uscis_documentation_type'] ?? null,
        $_POST['uscis_documentation_issued_by'] ?? null,
        $_POST['uscis_documentation_number'] ?? null,
        $_POST['uscis_documentation_exp_date'] ?? null,
        isset($_POST['id_document_type']) ? checkIfDocumentIsPresent(4) : null,
        $_POST['other_documentation_type'] ?? null,
        $_POST['other_documentation_issued_by'] ?? null,
        $_POST['other_documentation_number'] ?? null,
        $_POST['other_documentation_exp_date'] ?? null,
        isset($_POST['issued_by']) ? $_POST['issued_by'] : '',

        isset($_POST['id_no']) ? $_POST['id_no'] : '',
        isset($_POST['exp_date']) ? $_POST['exp_date'] : null,
        ($_POST['entry_date']) ? $_POST['entry_date'] : null,
        $_POST['itin_or_irsn'],
        $_POST['itin_or_irsn_no'],
        $_POST['itin_or_irs_first_name'],
        $_POST['itin_or_irs_middle_name'],
        $_POST['itin_or_irs_last_name'],
        $_POST['college_univ_company'],
        $_POST['college_univ_company_city'],
        $_POST['college_univ_company_state'],
        $_POST['length_of_stay'],
        $_POST['email'],
        $_POST['payer_id'],
        isset($_SESSION['price']) ? $_SESSION['price'] : 0, //Test, need to change
        // $_SESSION['price'],
        "Received", //Test, need to change
        date('Y-m-d '),
        "Not disclosure",
        getIpAddress(),
        substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5),
        $_POST['itin_application_form_language'],
        date('Y-m-d H:i:s'),
        date('Y-m-d H:i:s'),
    );

    $id = createITINApplication($ITINApplication, $temporal);

    $ITINApplication->setId($id);
    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : '';

    // Sets full name
    // $full_name = $first_name . ($middle_name ? ' ' . $middle_name . ' ' : ' ') . $last_name; // Sets full name
    $full_name = $_POST['first_name'] . ($_POST['middle_name'] ? ' ' . $_POST['middle_name'] . ' ' : ' ') . $_POST['last_name'];

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    // Activity log 
    $hour = date("H:i:s", strtotime('now'));
    $operation = "{$username} has submitted a new ITIN application (Form W-7) for {$full_name} at {$hour}.";
    addToActivityLog($operation, $user_id);

    // Array of messages in different languages
    $messages = [
        "en-US" => "Thank you for filling out your W-7 form with us. ou will shortly receive an email with your W-7 form duly filled out, which you must send to the IRS with the required documentation.",
        "es-ES" => "Gracias por completar su formulario W-7 con nosotros. En breve recibirás un correo electrónico con tu formulario W-7 debidamente cumplimentado, el cual deberás enviar al IRS con la documentación requerida.",
        "pt-BR" => "Obrigado por preencher seu formulário W-7 conosco. Você receberá em breve um e-mail com seu formulário W-7 devidamente preenchido, que deverá enviar ao IRS com a documentação necessária.",
        "zh-CN" => "感谢您与我们一起填写 W-7 表格。 您很快就会收到一封电子邮件，其中包含您已填妥的 W-7 表格，您必须将其连同所需文件一起发送给 IRS。"
    ];

    // Get the edit message based on the form language
    $message = $messages[$formLanguage] ?? $messages["en-US"];

    // Redirect the user to the corresponding profile page
    $redirectUrls = [
        "en-US" => URL . '/users/dashboard',
        "es-ES" => URL . '/users/dashboard',
        "pt-BR" => URL . '/users/dashboard',
        "zh-CN" => URL . '/users/dashboard'
    ];

    // Get the redirect URL based on the form language
    $redirectUrl = $redirectUrls[$formLanguage] ?? $redirectUrls["en-US"];

    // Escape variables to prevent security issues
    $message = htmlspecialchars($message, ENT_QUOTES);
    $redirectUrl = htmlspecialchars($redirectUrl, ENT_QUOTES);

    // Show the alert message and redirect the user
    // echo '<script language="javascript">
    //     alert("' . $message . '");
    //     window.location.href = "' . $redirectUrl . '";
    //     </script>';

    return array("message" => $message, "redirectUrl" => $redirectUrl, "itin_id" => $ITINApplication->getId());
    //exit();
}

function insertCustomer()
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';

    // Receiving the data from the itin application form
    $first_name = isset($_POST['first_name']) ? htmlspecialchars(trim($_POST['first_name']), ENT_QUOTES, 'UTF-8') : '';
    $middle_name = isset($_POST['middle_name']) ? htmlspecialchars(trim($_POST['middle_name']), ENT_QUOTES, 'UTF-8') : '';
    $last_name = isset($_POST['last_name']) ? htmlspecialchars(trim($_POST['last_name']), ENT_QUOTES, 'UTF-8') : '';
    $date_of_birth = isset($_POST['date_of_birth']) ? htmlspecialchars(trim($_POST['date_of_birth']), ENT_QUOTES, 'UTF-8') : '';
    $gender = isset($_POST['gender']) ? htmlspecialchars(trim($_POST['gender']), ENT_QUOTES, 'UTF-8') : '';

    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : "";

    // Sets full name
    $full_name = $first_name . ($middle_name ? ' ' . $middle_name . ' ' : ' ') . $last_name;

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    // Check if the user already has a record in the customers table
    $query = "SELECT id FROM customers WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) { // If the user does not have a record, proceed with inserting the new customer

        // Generate a UUID version 4 (random)
        $uuid = Uuid::uuid4()->toString();

        // SQL statement to insert a new record
        $query = "INSERT INTO customers (id_code, is_active, user_id, first_name, middle_name, last_name, date_of_birth, gender, marital_status, occupation, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, 1, :user_id, :first_name, :middle_name, :last_name, :date_of_birth, :gender, 'Not Disclosed', 'Not Disclosed', 'Active', :status_date, NULL, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id_code', $uuid);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':middle_name', $middle_name);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':date_of_birth', $date_of_birth);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':status_date', $date);
        $stmt->bindParam(':ip_address', $ipAddress);
        $stmt->bindParam(':server_language', $serverLanguage);
        $stmt->bindParam(':form_language', $formLanguage);
        $stmt->bindParam(':created_at', $createdAt);
        $stmt->bindParam(':updated_at', $updatedAt);
        $stmt->execute();

        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} has created a new customer profile for {$full_name} at {$hour}.";
        addToActivityLog($operation, $user_id);
    } else { // Customer already exists
        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} is using an existing customer profile for your ITIN application.";
        addToActivityLog($operation, $user_id);
    }
}

function insertIndividual()
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';

    // Get customer_id
    $query = "SELECT id FROM customers WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $customer_id = $result['id'];

    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : '';

    // Sets full name
    $first_name = isset($_POST['first_name']) ? htmlspecialchars(trim($_POST['first_name']), ENT_QUOTES, 'UTF-8') : '';
    $middle_name = isset($_POST['middle_name']) ? htmlspecialchars(trim($_POST['middle_name']), ENT_QUOTES, 'UTF-8') : '';
    $last_name = isset($_POST['last_name']) ? htmlspecialchars(trim($_POST['last_name']), ENT_QUOTES, 'UTF-8') : '';
    $full_name = $first_name . ($middle_name ? ' ' . $middle_name . ' ' : ' ') . $last_name;

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    // Check if the customer already has a record in the individuals table
    $query = "SELECT id FROM individuals WHERE customer_id = :customer_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) { // If the customer does not have a record, proceed with the insertion of the new individual

        // To build the individual folder path
        $query = "SELECT folder_path FROM users WHERE id = :user_id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $folderPath = $result['folder_path'];

        // Set folder for individual
        $individualFolderPath = $folderPath . '/01_Individual'; // Individual folder path
        $individualProfilePicture = $individualFolderPath . '/ProfilePicture'; // Profile picture folder path
        $billingFolder = $individualFolderPath . '/Billing'; // Billing folder path
        $documentsFolder = $individualFolderPath . '/Documents'; // Documents folder path
        $logFolder = $individualFolderPath . '/Log'; // Log folder path

        // Generate a UUID version 4 (random)
        $uuid = Uuid::uuid4()->toString();

        // SQL statement to insert a new record
        $query = "INSERT INTO individuals (id_code, is_active, customer_id, name, industry, tax_id, folder_path, profile_picture, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, 1, :customer_id, :name, 'Not Disclosed', 'Not Disclosed', :folder_path, 'Avatar', 'Active', :status_date, NULL, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id_code', $uuid);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':name', $full_name);
        $stmt->bindParam(':folder_path', $individualFolderPath);
        $stmt->bindParam(':status_date', $date);
        $stmt->bindParam(':ip_address', $ipAddress);
        $stmt->bindParam(':server_language', $serverLanguage);
        $stmt->bindParam(':form_language', $formLanguage);
        $stmt->bindParam(':created_at', $createdAt);
        $stmt->bindParam(':updated_at', $updatedAt);
        $stmt->execute();

        $folderPath = '../../' . $folderPath;
        $individualFolderPath = '../../' . $individualFolderPath;
        $individualProfilePicture = '../../' . $individualProfilePicture;
        $billingFolder = '../../' . $billingFolder;
        $documentsFolder = '../../' . $documentsFolder;
        $logFolder = '../../' . $logFolder;

        if ($stmt->rowCount() > 0) {
            try {
                // Creates the individual folder
                if (!is_dir($individualFolderPath)) {
                    mkdir($individualFolderPath, 0777, true);
                    createIndexFile($individualFolderPath);
                }
                // Creates the profile pictures subfolder inside the individual folder
                if (!is_dir($individualProfilePicture)) {
                    mkdir($individualProfilePicture, 0777, true);
                    createIndexFile($individualProfilePicture);
                }
                // Creates the billing subfolder inside the user folder
                if (!is_dir($billingFolder)) {
                    mkdir($billingFolder, 0777, true);
                    createIndexFile($billingFolder);
                }
                // Creates the documents subfolder inside the user folder
                if (!is_dir($documentsFolder)) {
                    mkdir($documentsFolder, 0777, true);
                    createIndexFile($documentsFolder);
                }
                // Creates the documents subfolder inside the user folder
                if (!is_dir($logFolder)) {
                    mkdir($logFolder, 0777, true);
                    createIndexFile($logFolder);
                }

                createIndexFile($folderPath);
            } catch (Exception $e) {
                // Manejar error   
                echo "Error: " . $e->getMessage();
                error_log("Error creando carpetas de usuario: " . $e->getMessage());
            }
        }

        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} has created a new individual profile for {$full_name} at {$hour}.";
        addToActivityLog($operation, $user_id);
    } else { // Individual already exists
        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} is using an existing individual profile for your ITIN application.";
        addToActivityLog($operation, $user_id);
    }
}

function insertUSAddress()
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';

    // Get customer_id
    $query = "SELECT id FROM customers WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $customer_id = $result['id'];

    // Get individual_id
    $query = "SELECT id FROM individuals WHERE customer_id = :customer_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $individual_id = $result['id'];

    // Get address
    $usAddressLine1 = isset($_POST['us_address_line1']) ? htmlspecialchars(trim($_POST['us_address_line1']), ENT_QUOTES, 'UTF-8') : '';
    $usAddressLine2 = isset($_POST['us_address_line2']) ? htmlspecialchars(trim($_POST['us_address_line2']), ENT_QUOTES, 'UTF-8') : NULL;
    $usAddressCity = isset($_POST['us_city']) ? htmlspecialchars(trim($_POST['us_city']), ENT_QUOTES, 'UTF-8') : '';
    $usAddressZipCode = isset($_POST['us_zip_code']) ? htmlspecialchars(trim($_POST['us_zip_code']), ENT_QUOTES, 'UTF-8') : '';
    $usAddressState = isset($_POST['us_state']) ? htmlspecialchars(trim($_POST['us_state']), ENT_QUOTES, 'UTF-8') : '';
    $usAddressCountry = "US";

    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : '';

    // Sets full name
    $first_name = isset($_POST['first_name']) ? htmlspecialchars(trim($_POST['first_name']), ENT_QUOTES, 'UTF-8') : '';
    $middle_name = isset($_POST['middle_name']) ? htmlspecialchars(trim($_POST['middle_name']), ENT_QUOTES, 'UTF-8') : '';
    $last_name = isset($_POST['last_name']) ? htmlspecialchars(trim($_POST['last_name']), ENT_QUOTES, 'UTF-8') : '';
    $full_name = $first_name . ($middle_name ? ' ' . $middle_name . ' ' : ' ') . $last_name;

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    // Check if the address already exists
    $query = "SELECT id FROM addresses WHERE individual_id = :individual_id AND line1 = :line1 AND city = :city AND zip_code = :zip_code";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':individual_id', $individual_id);
    $stmt->bindParam(':line1', $usAddressLine1);
    $stmt->bindParam(':city', $usAddressCity);
    $stmt->bindParam(':zip_code', $usAddressZipCode);
    $stmt->execute();
    $addressExists = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$addressExists) { // If the address does not exist, proceed with the insertion

        // Generate a UUID version 4 (random)
        $uuid = Uuid::uuid4()->toString();

        // SQL statement to insert a new record
        $query = "INSERT INTO addresses (id_code, is_active, is_user, user_id, is_customer, customer_id, is_individual, individual_id, name, line1, line2, city, zip_code, country, state, is_default, is_billing, is_shipping, type, is_verified, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, 1, 1, :user_id, 1, :customer_id, 1, :individual_id, 'Address Default Name', :line1, :line2, :city, :zip_code, :country, :state, 1, 1, 1, 'NA', 0, 'Active', :status_date, NULL, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id_code', $uuid);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':individual_id', $individual_id);
        $stmt->bindParam(':line1', $usAddressLine1);
        $stmt->bindParam(':line2', $usAddressLine2);
        $stmt->bindParam(':city', $usAddressCity);
        $stmt->bindParam(':zip_code', $usAddressZipCode);
        $stmt->bindParam(':country', $usAddressCountry);
        $stmt->bindParam(':state', $usAddressState);
        $stmt->bindParam(':status_date', $date);
        $stmt->bindParam(':ip_address', $ipAddress);
        $stmt->bindParam(':server_language', $serverLanguage);
        $stmt->bindParam(':form_language', $formLanguage);
        $stmt->bindParam(':created_at', $createdAt);
        $stmt->bindParam(':updated_at', $updatedAt);
        $stmt->execute();

        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} has added a new US address for {$full_name} at {$hour}";
        addToActivityLog($operation, $user_id);
    } else { // Address already exists
        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} is using an existing US address for your ITIN application.";
        addToActivityLog($operation, $user_id);
    }
}

function insertNonUSAddress()
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';

    // Get customer_id
    $query = "SELECT id FROM customers WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $customer_id = $result['id'];

    // Get individual_id
    $query = "SELECT id FROM individuals WHERE customer_id = :customer_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $individual_id = $result['id'];

    // Get address
    $nonUSAddressLine1 = isset($_POST['non_us_address_line1']) ? htmlspecialchars(trim($_POST['non_us_address_line1']), ENT_QUOTES, 'UTF-8') : "";
    $nonUSAddressLine2 = isset($_POST['non_us_address_line2']) ? htmlspecialchars(trim($_POST['non_us_address_line2']), ENT_QUOTES, 'UTF-8') : NULL;
    $nonUSAddressCity = isset($_POST['non_us_city']) ? htmlspecialchars(trim($_POST['non_us_city']), ENT_QUOTES, 'UTF-8') : "";
    $nonUSAddressZipCode = isset($_POST['non_us_zip_code']) ? htmlspecialchars(trim($_POST['non_us_zip_code']), ENT_QUOTES, 'UTF-8') : "";
    $nonUSAddressCountry = isset($_POST['non_us_country']) ? htmlspecialchars(trim($_POST['non_us_country']), ENT_QUOTES, 'UTF-8') : "";
    $nonUSAddressState = isset($_POST['non_us_state']) ? htmlspecialchars(trim($_POST['non_us_state']), ENT_QUOTES, 'UTF-8') : "";

    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : "";

    // Sets full name
    $first_name = isset($_POST['first_name']) ? htmlspecialchars(trim($_POST['first_name']), ENT_QUOTES, 'UTF-8') : '';
    $middle_name = isset($_POST['middle_name']) ? htmlspecialchars(trim($_POST['middle_name']), ENT_QUOTES, 'UTF-8') : '';
    $last_name = isset($_POST['last_name']) ? htmlspecialchars(trim($_POST['last_name']), ENT_QUOTES, 'UTF-8') : '';
    $full_name = $first_name . ($middle_name ? ' ' . $middle_name . ' ' : ' ') . $last_name;

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    // Check if the address already exists
    $query = "SELECT id FROM addresses WHERE individual_id = :individual_id AND line1 = :line1 AND city = :city AND zip_code = :zip_code";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':individual_id', $individual_id);
    $stmt->bindParam(':line1', $nonUSAddressLine1);
    $stmt->bindParam(':city', $nonUSAddressCity);
    $stmt->bindParam(':zip_code', $nonUSAddressZipCode);
    $stmt->execute();
    $addressExists = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$addressExists) { // If the address does not exist, proceed with the insertion

        // Generate a UUID version 4 (random)
        $uuid = Uuid::uuid4()->toString();

        // SQL statement to insert a new record
        $query = "INSERT INTO addresses (id_code, is_active, is_user, user_id, is_customer, customer_id, is_individual, individual_id, name, line1, line2, city, zip_code, country, state, is_default, is_billing, is_shipping, type, is_verified, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, 1, 1, :user_id, 1, :customer_id, 1, :individual_id, 'Address Default Name', :line1, :line2, :city, :zip_code, :country, :state, 0, 0, 0, 'NA', 0, 'Active', :status_date, NULL, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id_code', $uuid);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':individual_id', $individual_id);
        $stmt->bindParam(':line1', $nonUSAddressLine1);
        $stmt->bindParam(':line2', $nonUSAddressLine2);
        $stmt->bindParam(':city', $nonUSAddressCity);
        $stmt->bindParam(':zip_code', $nonUSAddressZipCode);
        $stmt->bindParam(':country', $nonUSAddressCountry);
        $stmt->bindParam(':state', $nonUSAddressState);
        $stmt->bindParam(':status_date', $date);
        $stmt->bindParam(':ip_address', $ipAddress);
        $stmt->bindParam(':server_language', $serverLanguage);
        $stmt->bindParam(':form_language', $formLanguage);
        $stmt->bindParam(':created_at', $createdAt);
        $stmt->bindParam(':updated_at', $updatedAt);
        $stmt->execute();

        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} has added a new Non US address for {$full_name} at {$hour}";
        addToActivityLog($operation, $user_id);
    } else { // Address already exists
        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} is using an existing Non US address for your ITIN application.";
        addToActivityLog($operation, $user_id);
    }
}

function updateEmail()
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';

    // Get customer_id
    $query = "SELECT id FROM customers WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $customer_id = $result['id'];

    // Get individual_id
    $query = "SELECT id FROM individuals WHERE customer_id = :customer_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $individual_id = $result['id'];

    // Get email
    $emailAddress = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email']), ENT_QUOTES, 'UTF-8') : '';

    // Sets full name
    $first_name = isset($_POST['first_name']) ? htmlspecialchars(trim($_POST['first_name']), ENT_QUOTES, 'UTF-8') : '';
    $middle_name = isset($_POST['middle_name']) ? htmlspecialchars(trim($_POST['middle_name']), ENT_QUOTES, 'UTF-8') : '';
    $last_name = isset($_POST['last_name']) ? htmlspecialchars(trim($_POST['last_name']), ENT_QUOTES, 'UTF-8') : '';
    $full_name = $first_name . ($middle_name ? ' ' . $middle_name . ' ' : ' ') . $last_name;

    // Check if the phone already exists
    $query = "SELECT id, is_customer, is_individual FROM emails WHERE user_id = :user_id AND address = :address";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':address', $emailAddress);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // The email already exists
        $email_id = $result['id'];
        $is_customer = $result['is_customer'];
        $is_individual = $result['is_individual'];

        // Logic to update the email
        if ($is_customer && $is_individual) {
            // Activity log
            $hour = date("H:i:s", strtotime('now'));
            $operation = "{$username} is using an existing email for your ITIN application: {$emailAddress}.";
            addToActivityLog($operation, $user_id);
        } else {
            // SQL statement to update a record
            $query = "UPDATE emails SET is_customer = 1, customer_id = :customer_id, is_individual = 1, individual_id = :individual_id WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id', $email_id);
            $stmt->bindParam(':customer_id', $customer_id);
            $stmt->bindParam(':individual_id', $individual_id);
            $stmt->execute();

            // Activity log 
            $hour = date("H:i:s", strtotime('now'));
            $operation = "{$username} has updated the email {$emailAddress} as your customer email and individual email at {$hour}.";
            addToActivityLog($operation, $user_id);
        }
    }
}

function insertUSPhone()
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';

    // Get customer_id
    $sql = "SELECT id FROM customers WHERE user_id = :user_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $customer_id = $result['id'];

    // Get individual_id
    $query = "SELECT id FROM individuals WHERE customer_id = :customer_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $individual_id = $result['id'];

    // Get phone
    $usPhoneNumber = isset($_POST['us_phone']) ? htmlspecialchars(trim($_POST['us_phone']), ENT_QUOTES, 'UTF-8') : '';

    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : "";

    // Sets full name
    $first_name = (isset($_POST['first_name'])) ? $_POST['first_name'] : "";
    $middle_name = (isset($_POST['middle_name'])) ? $_POST['middle_name'] : "";
    $last_name = (isset($_POST['last_name'])) ? $_POST['last_name'] : "";
    $full_name = $first_name . ($middle_name ? ' ' . $middle_name . ' ' : ' ') . $last_name;

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    // Check if the phone already exists
    $query = "SELECT id, is_customer, is_individual FROM phones WHERE user_id = :user_id AND number = :number";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':number', $usPhoneNumber);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // The phone already exists
        $phone_id = $result['id'];
        $is_customer = $result['is_customer'];
        $is_individual = $result['is_individual'];

        // Logic to update the phone
        if ($is_customer && $is_individual) {
            // Activity log
            $hour = date("H:i:s", strtotime('now'));
            $operation = "{$username} is using an existing US phone for your ITIN application: +1 {$usPhoneNumber}.";
            addToActivityLog($operation, $user_id);
        } else {
            // SQL statement to update a record
            $query = "UPDATE phones SET is_customer = 1, is_individual = 1, is_default = 1, is_mobile = 1, customer_id = :customer_id, individual_id = :individual_id WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id', $phone_id);
            $stmt->bindParam(':customer_id', $customer_id);
            $stmt->bindParam(':individual_id', $individual_id);
            $stmt->execute();

            // Activity log
            $hour = date("H:i:s", strtotime('now'));
            $operation = "{$username} has updated the existing US phone: +1 {$usPhoneNumber} as your customer phone and individual phone at {$hour}.";
            addToActivityLog($operation, $user_id);
        }
    } else {
        // Generate a UUID version 4 (random)
        $uuid = Uuid::uuid4()->toString();

        // SQL statement to insert a new record
        $query = "INSERT INTO phones (id_code, is_active, is_user, user_id, is_customer, customer_id, is_individual, individual_id, name, country_code, country_phone_code, number, is_default, is_mobile, type, is_verified, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, 1, 1, :user_id, 1, :customer_id, 1, :individual_id, 'Phone Default Name', 'US', 1, :number, 1, 1, 'NA', 0, 'Active', :status_date, NULL, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
        // Prepare the sentence
        $stmt = $conn->prepare($query);
        // Bind parameters
        $stmt->bindParam(':id_code', $uuid);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':individual_id', $individual_id);
        $stmt->bindParam(':number', $usPhoneNumber);
        $stmt->bindParam(':status_date', $date);
        $stmt->bindParam(':ip_address', $ipAddress);
        $stmt->bindParam(':server_language', $serverLanguage);
        $stmt->bindParam(':form_language', $formLanguage);
        $stmt->bindParam(':created_at', $createdAt);
        $stmt->bindParam(':updated_at', $updatedAt);
        // Execute the statement
        $stmt->execute();

        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} has added a new US phone: +1 {$usPhoneNumber} as your customer phone and individual phone at {$hour}.";
        addToActivityLog($operation, $user_id);
    }
}

function insertNonUSPhone()
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';

    // Get customer_id
    $sql = "SELECT id FROM customers WHERE user_id = :user_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $customer_id = $result['id'];

    // Get individual_id
    $query = "SELECT id FROM individuals WHERE customer_id = :customer_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $individual_id = $result['id'];

    // Get phone
    $nonUSCountry = isset($_POST['non_us_country']) ? htmlspecialchars(trim($_POST['non_us_country']), ENT_QUOTES, 'UTF-8') : NULL;
    $countryPhoneCode = isset($_POST['non_us_country_phone_code']) ? htmlspecialchars(trim($_POST['non_us_country_phone_code']), ENT_QUOTES, 'UTF-8') : '';
    $nonUSPhoneNumber = isset($_POST['non_us_phone']) ? htmlspecialchars(trim($_POST['non_us_phone']), ENT_QUOTES, 'UTF-8') : '';

    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : "";

    // Sets full name
    $first_name = isset($_POST['first_name']) ? htmlspecialchars(trim($_POST['first_name']), ENT_QUOTES, 'UTF-8') : '';
    $middle_name = isset($_POST['middle_name']) ? htmlspecialchars(trim($_POST['middle_name']), ENT_QUOTES, 'UTF-8') : '';
    $last_name = isset($_POST['last_name']) ? htmlspecialchars(trim($_POST['last_name']), ENT_QUOTES, 'UTF-8') : '';
    $full_name = $first_name . ($middle_name ? ' ' . $middle_name . ' ' : ' ') . $last_name;

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    // Check if the phone already exists
    $query = "SELECT id, is_customer, is_individual FROM phones WHERE user_id = :user_id AND country_phone_code = :country_phone_code AND number = :number";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':country_phone_code', $countryPhoneCode);
    $stmt->bindParam(':number', $nonUSPhoneNumber);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // The phone already exists
        $phone_id = $result['id'];
        $is_customer = $result['is_customer'];
        $is_individual = $result['is_individual'];

        // Logic to update the phone
        if ($is_customer && $is_individual) {
            // Activity log
            $hour = date("H:i:s", strtotime('now'));
            $operation = "{$username} is using an existing Non US phone for your ITIN application: {$nonUSCountry} {$countryPhoneCode} {$nonUSPhoneNumber}.";
            addToActivityLog($operation, $user_id);
        } else {
            // SQL statement to update a record
            $query = "UPDATE phones SET is_customer = 1, is_individual = 1, customer_id = :customer_id, individual_id = :individual_id WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id', $phone_id);
            $stmt->bindParam(':customer_id', $customer_id);
            $stmt->bindParam(':individual_id', $individual_id);
            $stmt->execute();

            // Activity log
            $hour = date("H:i:s", strtotime('now'));
            $operation = "{$username} has updated the existing Non US phone: {$nonUSCountry} {$countryPhoneCode} {$nonUSPhoneNumber} as your customer phone and individual phone at {$hour}.";
            addToActivityLog($operation, $user_id);
        }
    } else {
        // Generate a UUID version 4 (random)
        $uuid = Uuid::uuid4()->toString();

        // SQL statement to insert a new record
        $query = "INSERT INTO phones (id_code, is_active, is_user, user_id, is_customer, customer_id, is_individual, individual_id, name, country_code, country_phone_code, number, is_default, is_mobile, type, is_verified, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, 1, 1, :user_id, 1, :customer_id, 1, :individual_id, 'Phone Default Name', :country_code, :country_phone_code, :number, 0, 0, 'NA', 0, 'Active', :status_date, NULL, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
        // Prepare the sentence
        $stmt = $conn->prepare($query);
        // Bind parameters
        $stmt->bindParam(':id_code', $uuid);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':individual_id', $individual_id);
        $stmt->bindParam(':country_code', $nonUSCountry);
        $stmt->bindParam(':country_phone_code', $countryPhoneCode);
        $stmt->bindParam(':number', $nonUSPhoneNumber);
        $stmt->bindParam(':status_date', $date);
        $stmt->bindParam(':ip_address', $ipAddress);
        $stmt->bindParam(':server_language', $serverLanguage);
        $stmt->bindParam(':form_language', $formLanguage);
        $stmt->bindParam(':created_at', $createdAt);
        $stmt->bindParam(':updated_at', $updatedAt);
        // Execute the statement
        $stmt->execute();

        // Activity log
        $hour = date("H:i:s", strtotime('now'));
        $operation = "{$username} has added a new Non-US phone: {$nonUSCountry} {$countryPhoneCode} {$nonUSPhoneNumber} as your customer phone and individual phone at {$hour}.";
        addToActivityLog($operation, $user_id);
    }
}

function insertEmailToNewsletterSuscription()
{
    global $conn;

    // get email
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email']), ENT_QUOTES, 'UTF-8') : '';

    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : "";

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    // Check if the user is already subscribed
    $query_check = "SELECT email, status FROM newsletter_subscriptions WHERE email = :email";
    $stmt_check = $conn->prepare($query_check);
    $stmt_check->bindParam(':email', $email);
    $stmt_check->execute();
    $result_check = $stmt_check->fetchAll(PDO::FETCH_ASSOC);

    if (count($result_check) > 0) {
        // Email already exists
        $row = $result_check[0];
        if ($row['status'] == 'Active') {
        }

        // User has unsubscribed
        $row = $result_check[0];
        if ($row['status'] == 'Inactive') {
            // Generate a UUID version 4 (random)
            $uuid = Uuid::uuid4()->toString();

            // SQL statement to insert a new record
            $query = "INSERT INTO newsletter_subscriptions (id_code, is_active, subscription_date, email, unsubscription_date, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, 1, :subscription_date, :email, NULL, 'Active', :status_date, NULL, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
            // Prepare the sentence
            $stmt = $conn->prepare($query);
            // Associate parameters
            $stmt->bindParam(':id_code', $uuid);
            $stmt->bindParam(':subscription_date', $date);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':status_date', $date);
            $stmt->bindParam(':ip_address', $ipAddress);
            $stmt->bindParam(':server_language', $serverLanguage);
            $stmt->bindParam(':form_language', $formLanguage);
            $stmt->bindParam(':created_at', $createdAt);
            $stmt->bindParam(':updated_at', $updatedAt);
            // Execute the statement
            $stmt->execute();
        }
    } else {
        // Generate a UUID version 4 (random)
        $uuid = Uuid::uuid4()->toString();

        // SQL statement to insert a new record
        $query = "INSERT INTO newsletter_subscriptions (id_code, is_active, subscription_date, email, unsubscription_date, status, status_date, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, 1, :subscription_date, :email, NULL, 'Active', :status_date, NULL, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
        // Prepare the sentence
        $stmt = $conn->prepare($query);
        // Associate parameters
        $stmt->bindParam(':id_code', $uuid);
        $stmt->bindParam(':subscription_date', $date);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':status_date', $date);
        $stmt->bindParam(':ip_address', $ipAddress);
        $stmt->bindParam(':server_language', $serverLanguage);
        $stmt->bindParam(':form_language', $formLanguage);
        $stmt->bindParam(':created_at', $createdAt);
        $stmt->bindParam(':updated_at', $updatedAt);
        // Execute the statement
        $stmt->execute();
    }
}

function insertOrder(int $customer_id, int $service_record_id, float $amount)
{
    global $conn;

    $uuid = Uuid::uuid4()->toString();
    $order = new Order(
        null,
        $uuid,
        true,
        $customer_id,
        null,
        $service_record_id,
        $amount,
        'Received',
        date('Y-m-d H:i:s'),
        getIpAddress(),
        substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5),
        $_POST['itin_application_form_language'],
        date('Y-m-d H:i:s'),
        date('Y-m-d H:i:s')
    );

    $insertedOrder = createOrder($order);

    return $insertedOrder;
}

function insertInvoice(Order $order)
{
    global $conn;

    $uuid = Uuid::uuid4()->toString();
    $invoice = new Invoice(
        null,
        $uuid,
        true,
        $order->getId(),
        date('Y-m-d H:i:s'),
        $order->getAmount(),
        0,
        $order->getAmount(),
        'Received',
        date('Y-m-d H:i:s'),
        null,
        getIpAddress(),
        substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5),
        $_POST['itin_application_form_language'],
        date('Y-m-d H:i:s'),
        date('Y-m-d H:i:s')
    );

    $insertedInvoice = createInvoice($invoice);

    return $insertedInvoice;
}

function insertReceipt(Order $order)
{
    global $conn;

    $uuid = Uuid::uuid4()->toString();
    $receipt = new Receipt(
        null,
        $uuid,
        true,
        $order->getId(),
        date('Y-m-d H:i:s'),
        $order->getAmount(),
        null,
        null,
        'Received',
        date('Y-m-d H:i:s'),
        null,
        getIpAddress(),
        substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5),
        $_POST['itin_application_form_language'],
        date('Y-m-d H:i:s'),
        date('Y-m-d H:i:s')
    );

    $insertedReceipt = createReceipt($receipt);

    return $insertedReceipt;
}

function insertServiceRecord()
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';

    // Get service information from the session
    $service_id = isset($_SESSION['service_id']) ? htmlspecialchars(trim($_SESSION['service_id']), ENT_QUOTES, 'UTF-8') : '';
    $serviceType = isset($_SESSION['service_type']) ? htmlspecialchars(trim($_SESSION['service_type']), ENT_QUOTES, 'UTF-8') : '';
    $serviceFor = isset($_SESSION['service_for']) ? htmlspecialchars(trim($_SESSION['service_for']), ENT_QUOTES, 'UTF-8') : '';
    $offer = isset($_SESSION['offer']) ? htmlspecialchars(trim($_SESSION['offer']), ENT_QUOTES, 'UTF-8') : '';
    $price = isset($_SESSION['price']) ? htmlspecialchars(trim($_SESSION['price']), ENT_QUOTES, 'UTF-8') : '';

    // Get customer_id
    $sql = "SELECT id FROM customers WHERE user_id = :user_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $customer_id = $result['id'];

    // Get individual_id
    $sql = "SELECT id FROM individuals WHERE customer_id = :customer_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $individual_id = $result['id'];

    // To build the service folder path
    $sql = "SELECT folder_path FROM individuals WHERE id = :individual_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':individual_id', $individual_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $folderPath = $result['folder_path'];

    // $serviceFolderPath = $folderPath . '/IRS' . '/' . date('Ymd') . '_ITIN'; // Sets the Individual Folder Path
    $serviceFolderPath = $folderPath . '/' . date('Ymd') . '_ITIN'; // Sets the Individual Folder Path

    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : '';

    // Sets full name
    $first_name = isset($_POST['first_name']) ? htmlspecialchars(trim($_POST['first_name']), ENT_QUOTES, 'UTF-8') : '';
    $middle_name = isset($_POST['middle_name']) ? htmlspecialchars(trim($_POST['middle_name']), ENT_QUOTES, 'UTF-8') : '';
    $last_name = isset($_POST['last_name']) ? htmlspecialchars(trim($_POST['last_name']), ENT_QUOTES, 'UTF-8') : '';
    $full_name = $first_name . ($middle_name ? ' ' . $middle_name . ' ' : ' ') . $last_name;

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    // Generate a UUID version 4 (random)
    $uuid = Uuid::uuid4()->toString();

    // SQL statement to insert a new record
    $query = "INSERT INTO service_records (id_code, is_active, service_id, purchase_date, price, customer_id, service_type, service_for, individual_id, business_id, recipient_id, start_date, estimate_completion_date, folder_path, status, status_date, notes, is_subscription, plan, expiry_date, renewal_period, last_renewal, autorenew, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, 1, :service_id, :purchase_date, :price, :customer_id, :service_type, :service_for, :individual_id, 0, 0, :start_date, DATE_ADD(:start_date, INTERVAL 90 DAY), :folder_path, 'Active', :status_date, NULL, 0, NULL, NULL, NULL, NULL, 0, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
    // Prepare the statement
    $stmt = $conn->prepare($query);
    // Bind parameters
    $stmt->bindParam(':id_code', $uuid);
    $stmt->bindParam(':service_id', $service_id);
    $stmt->bindParam(':purchase_date', $date);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->bindParam(':service_type', $serviceType);
    $stmt->bindParam(':service_for', $serviceFor);
    $stmt->bindParam(':individual_id', $individual_id);
    $stmt->bindParam(':start_date', $date);
    $stmt->bindParam(':folder_path', $serviceFolderPath);
    $stmt->bindParam(':status_date', $date);
    $stmt->bindParam(':ip_address', $ipAddress);
    $stmt->bindParam(':server_language', $serverLanguage);
    $stmt->bindParam(':form_language', $formLanguage);
    $stmt->bindParam(':created_at', $createdAt);
    $stmt->bindParam(':updated_at', $updatedAt);
    // Execute the statement
    $stmt->execute();

    $service_record_id = $conn->lastInsertId();

    $folderPath = '../../' . $folderPath;
    $serviceFolderPath = '../../' . $serviceFolderPath;

    if ($stmt->rowCount() > 0) {
        // Creates the service folder
        /*
        if (!is_dir($folderPath . '/IRS')) {
            mkdir($folderPath . '/IRS', 0777, true);
            createIndexFile($folderPath . '/IRS');
        }
        */

        // Creates the service folder
        if (!is_dir($serviceFolderPath)) {
            mkdir($serviceFolderPath, 0777, true);
            createIndexFile($serviceFolderPath);
        }
    }

    // Activity log
    $hour = date("H:i:s", strtotime('now'));
    $operation = "{$username} has acquired the service {$serviceType} - {$offer} - {$price} at {$hour}";
    addToActivityLog($operation, $user_id);

    saveITINToPDF($serviceFolderPath . '/');

    return ['customer_id' => $customer_id, 'service_record_id' => $service_record_id, 'amount' => $price, 'service_type' => $serviceType, 'folder_path' => $serviceFolderPath];
}

function insertITINSummary()
{
    global $conn;

    // Get user information from the session
    $user_id = isset($_SESSION['user']['id']) ? htmlspecialchars(trim($_SESSION['user']['id']), ENT_QUOTES, 'UTF-8') : '';
    $username = isset($_SESSION['user']['username']) ? htmlspecialchars(trim($_SESSION['user']['username']), ENT_QUOTES, 'UTF-8') : '';
    $email = isset($_SESSION['user']['email']) ? htmlspecialchars(trim($_SESSION['user']['email']), ENT_QUOTES, 'UTF-8') : '';

    // Get service information from the session
    $service_id = isset($_SESSION['service_id']) ? htmlspecialchars(trim($_SESSION['service_id']), ENT_QUOTES, 'UTF-8') : '';
    $serviceType = isset($_SESSION['service_type']) ? htmlspecialchars(trim($_SESSION['service_type']), ENT_QUOTES, 'UTF-8') : '';
    $serviceFor = isset($_SESSION['service_for']) ? htmlspecialchars(trim($_SESSION['service_for']), ENT_QUOTES, 'UTF-8') : '';
    $offer = isset($_SESSION['offer']) ? htmlspecialchars(trim($_SESSION['offer']), ENT_QUOTES, 'UTF-8') : '';
    $price = isset($_SESSION['price']) ? htmlspecialchars(trim($_SESSION['price']), ENT_QUOTES, 'UTF-8') : '';

    // $sql = "SELECT id FROM itin_applications WHERE email = :email";
    $sql = "SELECT id FROM itin_applications WHERE email = :email AND DATE(application_date) = CURDATE() AND status = 'Received' ORDER BY id DESC LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $itin_application_id = $result['id'];

    $sql = "SELECT id FROM customers WHERE user_id = :user_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $customer_id = $result['id'];

    $sql = "SELECT id FROM individuals WHERE customer_id = :customer_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $individual_id = $result['id'];

    $sql = "SELECT id FROM service_records WHERE customer_id = :customer_id AND service_type = 'ITIN Application' AND DATE(purchase_date) = CURDATE() AND status = 'Active' ORDER BY id DESC LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $service_record_id = $result['id'];

    $itin_type = isset($_POST['itin_type']) ? htmlspecialchars(trim($_POST['itin_type']), ENT_QUOTES, 'UTF-8') : '';
    if ($itin_type == "Apply for a new ITIN") { // Modify the value if it is "Apply For A New ITIN" or "Renew An Existing ITIN"
        $itin_type = "New";
    } elseif ($itin_type == "Renew an existing ITIN") {
        $itin_type = "Renew";
    }
    $reason = isset($_POST['reason']) ? htmlspecialchars(trim($_POST['reason']), ENT_QUOTES, 'UTF-8') : '';
    if (!empty($reason)) { // Get the first letter and convert it to lowercase
        $first_letter = strtolower($reason[0]);
        $reason = $first_letter;
    }

    $documents = date('Ymd') . '_ITIN';

    // Form language
    $formLanguage = isset($_POST['itin_application_form_language']) ? htmlspecialchars($_POST['itin_application_form_language'], ENT_QUOTES, 'UTF-8') : '';

    // Important info needed
    $ipAddress = getIpAddress();
    $serverLanguage = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 5);
    $createdAt = date("Y-m-d H:i:s", strtotime('now'));
    $updatedAt = date("Y-m-d H:i:s", strtotime('now'));
    $date = date("Y-m-d");
    $time = date("H:i:s");

    if ($price == 20) {
        $w7 = 1;
        $caa = 0;
        $tax_return = 0;
        $form_a_company = 0;
        $shipping = 0;
    } elseif ($price == 100) {
        $w7 = 1;
        $caa = 1;
        $tax_return = 0;
        $form_a_company = 0;
        $shipping = 1;
    } elseif ($price == 150) {
        $w7 = 1;
        $caa = 1;
        $tax_return = 1;
        $form_a_company = 0;
        $shipping = 1;
    } elseif ($price == 400) {
        $w7 = 1;
        $caa = 1;
        $tax_return = 0;
        $form_a_company = 1;
        $shipping = 1;
    }

    /*
    $w7 = ($price == 20) ? 1 : ($price == 100 || $price == 150 || $price == 400) ? 1 : 0;
    $caa = ($price == 100 || $price == 150 || $price == 400) ? 1 : 0;
    $tax_return = ($price == 150 || $price == 400) ? 1 : 0;
    $formation_of_company = ($price == 400) ? 1 : 0;
    $includes_shipping = ($price == 100 || $price == 150 || $price == 400) ? 1 : 0;
    */

    // Generate a UUID version 4 (random)
    $uuid = Uuid::uuid4()->toString();

    // SQL statement to insert a new record
    $sql = "INSERT INTO itin_summaries (id, id_code, is_active, itin_application_id, customer_id, individual_id, service_record_id, application_date, w7, caa, tax_return, form_a_company, itin_type, reason, shipping, shipping_date, carrier, tracking, status, status_date, documents, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (NULL, :id_code, 1, :itin_application_id, :customer_id, :individual_id, :service_record_id, CURDATE(), :w7, :caa, :tax_return, :form_a_company, :itin_type, :reason, :shipping, NULL, NULL, NULL, 'Received', CURDATE(), :documents, NULL, :ip_address, :server_language, :form_language, :created_at, :updated_at)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_code', $uuid);
    $stmt->bindParam(':itin_application_id', $itin_application_id);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->bindParam(':individual_id', $individual_id);
    $stmt->bindParam(':service_record_id', $service_record_id);
    $stmt->bindParam(':w7', $w7);
    $stmt->bindParam(':caa', $caa);
    $stmt->bindParam(':tax_return', $tax_return);
    $stmt->bindParam(':form_a_company', $form_a_company);
    $stmt->bindParam(':itin_type', $itin_type);
    $stmt->bindParam(':reason', $reason);
    $stmt->bindParam(':shipping', $shipping);
    $stmt->bindParam(':documents', $documents);
    $stmt->bindParam(':ip_address', $ipAddress);
    $stmt->bindParam(':server_language', $serverLanguage);
    $stmt->bindParam(':form_language', $formLanguage);
    $stmt->bindParam(':created_at', $createdAt);
    $stmt->bindParam(':updated_at', $updatedAt);
    $stmt->execute();

    // Activity log
    $hour = date("H:i:s", strtotime('now'));
    $operation = "An ITIN Summary has been created for the application with ID {$itin_application_id} at {$hour}.";
    addToActivityLog($operation, $user_id);
}

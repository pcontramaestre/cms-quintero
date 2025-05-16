<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/services/itin/class/ITINSummary.php';

function createITINSummary(ITINSummary $itinSummary)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $id_code = $itinSummary->getIdCode();
    $is_active = $itinSummary->getIsActive();
    $itin_application_id = $itinSummary->getITINApplicationId();
    $customer_id = $itinSummary->getCustomerId();
    $individual_id = $itinSummary->getIndividualId();
    $service_record_id = $itinSummary->getServiceRecordId();
    $application_date = $itinSummary->getApplicationDate();
    $w7 = $itinSummary->getW7();
    $caa = $itinSummary->getCaa();
    $tax_return = $itinSummary->getTaxReturn();
    $form_a_company = $itinSummary->getFormACompany();
    $itin_type = $itinSummary->getITINType();
    $reason = $itinSummary->getReason();
    $shipping = $itinSummary->getShipping();
    $shipping_date = $itinSummary->getShippingDate();
    $carrier = $itinSummary->getCarrier();
    $tracking = $itinSummary->getTracking();
    $status = $itinSummary->getStatus();
    $status_date = $itinSummary->getStatusDate();
    $documents = $itinSummary->getDocuments();
    $notes = $itinSummary->getNotes();
    $ip_address = $itinSummary->getIpAddress();
    $server_language = $itinSummary->getServerLanguage();
    $form_language = $itinSummary->getFormLanguage();
    $created_at = $itinSummary->getCreatedAt();
    $updated_at = $itinSummary->getUpdatedAt();

    $stmt = $conn->prepare("INSERT INTO itin_summaries (id_code, is_active, itin_application_id, customer_id, individual_id, service_record_id, application_date, w7, caa, tax_return, form_a_company, itin_type, reason, shipping, shipping_date, carrier, tracking, status, status_date, documents, notes, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, :is_active, :itin_application_id, :customer_id, :individual_id, :service_record_id, :application_date, :w7, :caa, :tax_return, :form_a_company, :itin_type, :reason, :shipping, :shipping_date, :carrier, :tracking, :status, :status_date, :documents, :notes, :ip_address, :server_language, :form_language, :created_at, :updated_at)");
    $stmt->bindParam(':id_code', $id_code);
    $stmt->bindParam(':is_active', $is_active);
    $stmt->bindParam(':itin_application_id', $itin_application_id);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->bindParam(':individual_id', $individual_id);
    $stmt->bindParam(':service_record_id', $service_record_id);
    $stmt->bindParam(':application_date', $application_date);
    $stmt->bindParam(':w7', $w7);
    $stmt->bindParam(':caa', $caa);
    $stmt->bindParam(':tax_return', $tax_return);
    $stmt->bindParam(':form_a_company', $form_a_company);
    $stmt->bindParam(':itin_type', $itin_type);
    $stmt->bindParam(':reason', $reason);
    $stmt->bindParam(':shipping', $shipping);
    $stmt->bindParam(':shipping_date', $shipping_date);
    $stmt->bindParam(':carrier', $carrier);
    $stmt->bindParam(':tracking', $tracking);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':status_date', $status_date);
    $stmt->bindParam(':documents', $documents);
    $stmt->bindParam(':notes', $notes);
    $stmt->bindParam(':ip_address', $ip_address);
    $stmt->bindParam(':server_language', $server_language);
    $stmt->bindParam(':form_language', $form_language);
    $stmt->bindParam(':created_at', $created_at);
    $stmt->bindParam(':updated_at', $updated_at);

    $stmt->execute();

    $itinSummary->setId($conn->lastInsertId());
    return $itinSummary;
}

function getITINSummaryById($id): ITINSummary
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM itin_summaries WHERE id = ?");
    $stmt->execute([$id]);
    $itinSummary = $stmt->fetch(PDO::FETCH_ASSOC);

    $itinSummary = new ITINSummary(
        $itinSummary['id'],
        $itinSummary['id_code'],
        $itinSummary['is_active'],
        $itinSummary['itin_application_id'],
        $itinSummary['customer_id'],
        $itinSummary['individual_id'],
        $itinSummary['service_record_id'],
        $itinSummary['application_date'],
        $itinSummary['w7'],
        $itinSummary['caa'],
        $itinSummary['tax_return'],
        $itinSummary['form_a_company'],
        $itinSummary['itin_type'],
        $itinSummary['reason'],
        $itinSummary['shipping'],
        $itinSummary['shipping_date'],
        $itinSummary['carrier'],
        $itinSummary['tracking'],
        $itinSummary['status'],
        $itinSummary['status_date'],
        $itinSummary['documents'],
        $itinSummary['notes'],
        $itinSummary['ip_address'],
        $itinSummary['server_language'],
        $itinSummary['form_language'],
        $itinSummary['created_at'],
        $itinSummary['updated_at']
    );
    return $itinSummary;
}

function getITINSummaryByServiceRecordId(int $service_record_id): ITINSummary
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM itin_summaries WHERE service_record_id = ?");
    $stmt->execute([$service_record_id]);
    $itinSummary = $stmt->fetch(PDO::FETCH_ASSOC);

    $itinSummary = new ITINSummary(
        $itinSummary['id'],
        $itinSummary['id_code'],
        $itinSummary['is_active'],
        $itinSummary['itin_application_id'],
        $itinSummary['customer_id'],
        $itinSummary['individual_id'],
        $itinSummary['service_record_id'],
        $itinSummary['application_date'],
        $itinSummary['w7'],
        $itinSummary['caa'],
        $itinSummary['tax_return'],
        $itinSummary['form_a_company'],
        $itinSummary['itin_type'],
        $itinSummary['reason'],
        $itinSummary['shipping'],
        $itinSummary['shipping_date'],
        $itinSummary['carrier'],
        $itinSummary['tracking'],
        $itinSummary['status'],
        $itinSummary['status_date'],
        $itinSummary['documents'],
        $itinSummary['notes'],
        $itinSummary['ip_address'],
        $itinSummary['server_language'],
        $itinSummary['form_language'],
        $itinSummary['created_at'],
        $itinSummary['updated_at']
    );
    return $itinSummary;
}
?>
<?php
require_once __DIR__ . '/../../../config/config.php';
require_once __ROOT__ . '/services/itin/class/Order.php';
require_once __ROOT__ . '/Connection/Connection.php';
function createOrder(Order $order)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $id_code = $order->getIdCode();
    $is_active = $order->getIsActive();
    $customer_id = $order->getCustomerId();
    $provider_id = $order->getProviderId();
    $service_record_id = $order->getServiceRecordId();
    $amount = $order->getAmount();
    $status = $order->getStatus();
    $status_date = $order->getStatusDate();
    $ip_address = $order->getIpAddress();
    $server_language = $order->getServerLanguage();
    $form_language = $order->getFormLanguage();
    $created_at = $order->getCreatedAt();
    $updated_at = $order->getUpdatedAt();

    $stmt = $conn->prepare("INSERT INTO orders_itin (id_code, is_active, customer_id, provider_id, service_record_id, amount, status, status_date, ip_address, server_language, form_language, created_at, updated_at) VALUES (:id_code, :is_active, :customer_id, :provider_id, :service_record_id, :amount, :status, :status_date, :ip_address, :server_language, :form_language, :created_at, :updated_at)");
    $stmt->bindParam(':id_code', $id_code);
    $stmt->bindParam(':is_active', $is_active);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->bindParam(':provider_id', $provider_id);
    $stmt->bindParam(':service_record_id', $service_record_id);
    $stmt->bindParam(':amount', $amount);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':status_date', $status_date);
    $stmt->bindParam(':ip_address', $ip_address);
    $stmt->bindParam(':server_language', $server_language);
    $stmt->bindParam(':form_language', $form_language);
    $stmt->bindParam(':created_at', $created_at);
    $stmt->bindParam(':updated_at', $updated_at);

    $stmt->execute();

    $order->setId($conn->lastInsertId());
    return $order;
}

function getOrderById($id): Order
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM orders_itin WHERE id = ?");
    $stmt->execute([$id]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);

    $order = new Order($order['id'], $order['id_code'], $order['is_active'], $order['customer_id'], $order['provider_id'], $order['service_record_id'], $order['amount'], $order['status'], $order['status_date'], $order['ip_address'], $order['server_language'], $order['form_language'], $order['created_at'], $order['updated_at']);
    return $order;
}

function getAllOrders()
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM orders_itin");
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $orders = array_map(function ($order) {
        return new Order($order['id'], $order['id_code'], $order['is_active'], $order['customer_id'], $order['provider_id'], $order['service_record_id'], $order['amount'], $order['status'], $order['status_date'], $order['ip_address'], $order['server_language'], $order['form_language'], $order['created_at'], $order['updated_at']);
    }, $orders);

    return $orders;
}

function getOrdersByStatus(string $status)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $stmt = $conn->prepare("SELECT * FROM orders_itin WHERE status = ?");
    $stmt->execute([$status]);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $orders = array_map(function ($order) {
        return new Order($order['id'], $order['id_code'], $order['is_active'], $order['customer_id'], $order['provider_id'], $order['service_record_id'], $order['amount'], $order['status'], $order['status_date'], $order['ip_address'], $order['server_language'], $order['form_language'], $order['created_at'], $order['updated_at']);
    }, $orders);

    return $orders;
}

function updateOrder(Order $order)
{
    $conn = new Connection();
    $conn = $conn->getConnection();

    $id = $order->getId();
    $id_code = $order->getIdCode();
    $is_active = $order->getIsActive();
    $customer_id = $order->getCustomerId();
    $provider_id = $order->getProviderId();
    $service_record_id = $order->getServiceRecordId();
    $amount = $order->getAmount();
    $status = $order->getStatus();
    $status_date = $order->getStatusDate();
    $ip_address = $order->getIpAddress();
    $server_language = $order->getServerLanguage();
    $form_language = $order->getFormLanguage();
    $created_at = $order->getCreatedAt();
    $updated_at = $order->getUpdatedAt();

    $stmt = $conn->prepare("UPDATE orders_itin SET id_code = :id_code, is_active = :is_active, customer_id = :customer_id, provider_id = :provider_id, service_record_id = :service_record_id, amount = :amount, status = :status, status_date = :status_date, ip_address = :ip_address, server_language = :server_language, form_language = :form_language, created_at = :created_at, updated_at = :updated_at WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':id_code', $id_code);
    $stmt->bindParam(':is_active', $is_active);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->bindParam(':provider_id', $provider_id);
    $stmt->bindParam(':service_record_id', $service_record_id);
    $stmt->bindParam(':amount', $amount);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':status_date', $status_date);
    $stmt->bindParam(':ip_address', $ip_address);
    $stmt->bindParam(':server_language', $server_language);
    $stmt->bindParam(':form_language', $form_language);
    $stmt->bindParam(':created_at', $created_at);
    $stmt->bindParam(':updated_at', $updated_at);

    $stmt->execute();

    return $order;
}
?>
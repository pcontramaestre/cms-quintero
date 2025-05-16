<?php
// Includes configuration file to load global variables and settings
require_once __DIR__ . '/../../config/config.php';

// Get the session language, if available, or set it to 'en-US' by default
$formLanguage = isset($_SESSION['user']['language']) ? htmlspecialchars($_SESSION['user']['language'], ENT_QUOTES, 'UTF-8') : 'en-US';

// Includes other necessary files
// require_once __ROOT__ . '/includes/includes.php';
// require_once __ROOT__ . '/includes/includes_layouts.php';
require_once __ROOT__ . '/includes/includes_functions.php';
// require_once __ROOT__ . '/includes/includes_messages.php';
// require_once __ROOT__ . '/includes/includes_languages.php';
// require_once __ROOT__ . '/includes/includesDAO.php';

require_once __ROOT__ . '/services/itin/DAO/OrderDAO.php';
require_once __ROOT__ . '/services/itin/DAO/ServiceRecordDAO.php';

// Check if the user is logged in
// checkSession($formLanguage);

// Crear conexión a la base de datos
$connect = new Connection();
$conn = $connect->getConnection();

$order_id = $_POST['order_id'] ?? null;
if (!$order_id) {
    header('Location: error.php');
    exit;
}

$order = getOrderById($order_id);
$serviceRecord = getServiceRecordById($order->getServiceRecordId());

// Open HTML
echo '<!DOCTYPE html>';
echo '<html lang="' . $formLanguage . '">';

echo '<head>';

// Load Common Resources
loadCommonResources();

echo '<title>Gracias por tu pedido</title>';
echo "<link rel='stylesheet' href='" . URL . "/services/itin/assets/css/thank_you.css'>";

echo '</head>';

echo '<body>';
echo '    <div id="thank-you" class="container">';
echo '        <div class="order">';
echo '          <div class="order-header">';
echo '              <h1 class="order-header__title">Thank You</h1>';
echo '              <h2 class="order-header__subtitle">For your purchase</h2>';
echo '          </div>';
// echo '        <p>Tu pedido ha sido procesado con éxito.</p>';
echo '          <div class="order-body">';
echo '            <div class="order-part">';
echo '              <div class="order-part__header">';
echo '                <h3 class="order-part__title">ORDER #' . htmlspecialchars($order->getId()) . '</h3>';
echo '                <h4 class="order-part__subtitle">Your order has been received. It will be processed shortly and you will be notified of any updates via email.</h4>';
echo '              </div>';
echo '                <div class="detail">';
echo '                   <div class="detail__item">';
echo '                       <p>Order Number:</p>';
echo '                       <a href="#" class="detail__link">#' . htmlspecialchars($order->getId()) . '</a>';
echo '                   </div>';
echo '                   <div class="detail__item">';
echo '                       <p>Order Date:</p>';
echo '                       <p>' . htmlspecialchars(explode(' ', $order->getCreatedAt())[0]) . '</p>';
echo '                   </div>';
echo '                   <div class="detail__item">';
echo '                       <p>Order Status:</p>';
echo '                       <p>' . htmlspecialchars($order->getStatus()) . '</p>';
echo '                   </div>';
echo '                </div>';
echo '             </div>';

echo '             <div class="order-part">';
echo '                <h3 class="order-part__title order-part__title--small">Order Details</h3>';
echo '                <div class="detail">';
echo '                   <div class="detail__item">';
echo '                       <p>Product:</p>';
echo '                       <p>' . htmlspecialchars($serviceRecord->getServiceType()) . '</a>';
echo '                   </div>';
echo '                   <div class="detail__item">';
echo '                       <p>Subtotal:</p>';
echo '                       <p>$' . htmlspecialchars($order->getAmount()) . '</p>';
echo '                   </div>';
echo '                   <div class="detail__item">';
echo '                       <p>Total:</p>';
echo '                       <p>$' . htmlspecialchars($order->getAmount()) . '</p>';
echo '                   </div>';
echo '                </div>';
echo '             </div>';

echo '             <div class="order-part">';
echo '                <h3 class="order-part__title order-part__title--small">Order Documents</h3>';
echo '                <div class="detail">';
echo '                   <div class="detail__item">';
echo '                       <p>Invoice:</p>';
echo '                       <a href="' . URL . '/billing/invoices/invoice' . $order_id . '.pdf" target="_blank" class="order-part__button button" type="button">' . 'Open PDF' . '</a>';
echo '                   </div>';
echo '                   <div class="detail__item">';
echo '                       <p>Receipt:</p>';
echo '                       <button class="order-part__button button" type="button">' . 'Open PDF' . '</button>';
echo '                   </div>';
echo '                </div>';
echo '             </div>';
echo '          </div>';
echo '          <div class="order-footer">';
echo '              <a href="' . URL . '/services/dashboard.php' . '" class="order-footer__button button button--gray" type="button">Go to Dashboard</a>';
echo '          </div>';
echo '        </div>';
echo '    </div>';
echo '</body>';
echo '</html>';

// COLOCAR UN BOTON ACEPTAR QUE REDIRECCIONE AL DASHBOARD, MEJORAR COMO SE VISUALIZA, UNA CARD CENTRADA Y QUE LA REDIRECCION FUNCIONE. VERIFICAR PORQUE NO SE PUEDE DESCARGAR LA ORDEN, NI LA FACTURA, NI E PAYMENT, COLOCAR CADA ENLACE EN LA RESPECTIVA TABLA.
// COLOCAR ALGO ASI COMO TU PEDIDO SE HA RECIBIDO Y ENBREVE SERA PROCESADO, CADA AVANCE APARECERA EN EL DASHBOARD Y TE SERA INFORMADO VIA EMAIL

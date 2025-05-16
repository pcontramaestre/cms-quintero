/**
 * Varios
 */

function convertToUpperCase(str) {
  return str.toUpperCase();
}

function capitalizeEveryWord(str) {
  return str.replace(/\b\w/g, function(char) {
      return char.toUpperCase();
  });
}

function capitalizeFirstLetter(str) {
  return str.replace(/[^a-zA-Z' ]+/g, '').toLowerCase().replace(/\b\w/g, function(char) {
      return char.toUpperCase();
  });
}

/*
function capitalizeFirstLetter(str) {
  return str.toLowerCase().replace(/\b\w/g, function(char) {
      return char.toUpperCase();
  });
}
*/

/*
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
*/

/**
 * contactenos.php
 */

// Definiciones de funciones para validar email y teléfono
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  var re = /^\d{10,15}$/;
  return re.test(String(phone));
}

// Función para enviar datos del formulario de contacto
function sendDataContactFormEs() {
  var email = document.getElementById('contact-email-lang-es').value;
  var phone = document.getElementById('contact-phone-lang-es').value;

  if (!validateEmail(email)) {
    alert('El correo electrónico ingresado no es válido.');
    return;
  }

  if (!validatePhone(phone)) {
    alert('El número de teléfono ingresado no es válido.');
    return;
  }

  // Validar reCAPTCHA
  if (!recaptchaResponse) {
    alert('Por favor, marque el reCAPTCHA antes de enviar el formulario.');
    return;
  }

  console.log('Intentando enviar datos del formulario de contacto...'); // Depuración
  var formData = {
    contact_name: document.getElementById('contact-name-lang-es').value.toUpperCase(),
    contact_email: document.getElementById('contact-email-lang-es').value,
    contact_phone: document.getElementById('contact-phone-lang-es').value,
    contact_subject: document.getElementById('contact-subject-lang-es').value,
    contact_message: document.getElementById('contact-message-lang-es').value,
    contact_language: document.getElementById('contact-language-lang-es').value
  };

  $.ajax({
    type: 'POST',
    url: baseURL + '/data/sql_contact', // Asegúrate de que esta ruta es accesible y correcta
    data: formData,
    success: function (response) {
      document.getElementById('contactFormES').reset(); // Limpia el formulario
      alert('Datos del formulario de contacto enviados exitosamente.'); // Mensaje de éxito
    },
    error: function (xhr, status, error) {
      console.error('Error al enviar los datos del formulario de contacto: ', error); // Depuración
      alert('Error al enviar los datos del formulario de contacto.'); // Mensaje de error
    }
  });
}

// Controlador de eventos para cargar el DOM y el evento submit del formulario
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactFormES');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Previene el envío por defecto del formulario
      sendDataContactFormEs(); // Invoca la función de envío de datos
    });
  }
});

/**
 *
 */

function valideKey(evt) {
  // code es la representación ASCII decimal de la tecla presionada.
  var code = evt.which ? evt.which : evt.keyCode;
  if (code == 8) {
    // retroceso
    return true;
  } else if (code >= 48 && code <= 57) {
    // es un número.
    return true;
  } else {
    // otras teclas.
    return false;
  }
}

/**
 *
 */

function Text(string) {
  //solo letras y numeros
  var out = '';
  //Se añaden las letras validas
  var filtro = 'abcdefghijklmnñopqrstuvwxyz ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'; //Caracteres validos

  // Convertir el texto a mayúsculas
  string = string.toUpperCase();

  for (var i = 0; i < string.length; i++) if (filtro.indexOf(string.charAt(i)) != -1) out += string.charAt(i);
  return out;
}

/**
 *
 */

/*
function TextAndNumbers(string) {
  var out = '';
  // Se añaden los caracteres válidos
  var filtro = 'abcdefghijklmnñopqrstuvwxyz ABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890#'; // Caracteres válidos (letras mayúsculas, números, # y espacio)

  // Convertir el texto a mayúsculas
  string = string.toUpperCase();

  for (var i = 0; i < string.length; i++) {
    if (filtro.indexOf(string.charAt(i)) != -1) {
      out += string.charAt(i);
    }
  }
  return out;
}
*/

/**
 * 
 */

function TextAndNumbers(string) {
  var out = '';
  // Se añaden los caracteres válidos
  var filtro = 'abcdefghijklmnñopqrstuvwxyz ABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890#'; // Caracteres válidos (letras mayúsculas, números, # y espacio)

  // Convertir el texto a minúsculas
  string = string.toLowerCase();

  var capitalizeNext = true; // Bandera para indicar que la próxima letra debe ser mayúscula

  for (var i = 0; i < string.length; i++) {
    if (filtro.indexOf(string.charAt(i)) != -1) {
      if (capitalizeNext) {
        out += string.charAt(i).toUpperCase();
        capitalizeNext = false; // Desactivar la capitalización de la próxima letra
      } else {
        out += string.charAt(i);
      }

      // Activar la capitalización de la próxima letra si el carácter actual es un espacio
      if (string.charAt(i) === ' ') {
        capitalizeNext = true;
      }
    }
  }
  return out;
}
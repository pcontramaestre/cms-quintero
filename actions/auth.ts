// src/actions/auth.ts
'use server';

import { signOut, signIn } from "@/auth"; // Importamos signIn también
import { prisma } from '@/lib/prisma'; // Importamos el cliente centralizado
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // Importamos el módulo crypto
import { redirect } from 'next/navigation'; // Para redirigir después del registro

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string; // Opcional, si lo pides en el formulario
  const image = '/user.webp';

  if (!email || !password) {
    // Manejar error de campos faltantes
    return { error: 'Faltan email o contraseña' }; // Devolver un objeto con error
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: 'El email ya está registrado' };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rounds de salt

    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        id: crypto.randomUUID(), // Generamos un UUID para el id
        email,
        password_hash: hashedPassword,
        name: name || null,
        image,
        updated_at: new Date(), // Establecemos la fecha actual para updated_at
      },
    });

    // --- Aquí podrías crear automáticamente una Account por defecto para el nuevo usuario ---
    // Esto depende de tu flujo. ¿Cada usuario registrado SIEMPRE tiene una cuenta asociada?
    // Si es así, créala aquí y vinculala al usuario.
    const newAccount = await prisma.account.create({
      data: {
        legal_name: name || `Cuenta de ${email}`, // Nombre legal por defecto de la cuenta
        users: {
          create: {
            user_id: newUser.id,
            role: 'ADMIN', // Rol inicial en la cuenta (ADMIN en lugar de owner para mantener consistencia)
          }
        },
      }
    });

    const newAccountGeneralInfo = await prisma.accountGeneralInfo.create({
      data: {
        account_id: newAccount.id,
        type: 'natural_person', // O el tipo por defecto que decidas
        status: 'active', // Estado activo por defecto
      }
    });
    // --- Fin: Crear Account por defecto ---

    // En lugar de redirigir directamente, devolvemos un indicador de éxito
    // La redirección se manejará en el componente cliente
    return { success: true, error: '' };

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return { error: 'Ocurrió un error al registrar el usuario' };
  }
}

export async function logout() {
  // Llama a la función signOut del lado del servidor
  await signOut();
  // Redirigir manualmente después de cerrar sesión
  redirect('/auth/signin');
}

// Función para manejar el inicio de sesión del lado del servidor
export async function login(email: string, password: string) {
  try {
    console.log('Iniciando sesión con:', { email });
    
    // Intentamos iniciar sesión con las credenciales proporcionadas
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    }).catch(error => {
      // Capturamos cualquier error que pueda ocurrir durante signIn
      console.error('Error en signIn:', error);
      
      // Si el error es CredentialsSignin, lo manejamos como credenciales inválidas
      if (error.type === 'CredentialsSignin' || 
          (typeof error === 'string' && error.includes('CredentialsSignin'))) {
        return { error: 'CredentialsSignin' };
      }
      
      // Para otros errores, devolvemos un mensaje genérico
      throw error; // Re-lanzamos el error para que sea manejado en el catch externo
    });
    
    console.log('Resultado de signIn:', result);
    
    // Si no hay resultado o es undefined, algo salió mal
    if (!result) {
      return { success: false, error: 'Error inesperado durante la autenticación' };
    }
    
    // Si no hay error, consideramos que fue exitoso
    if (!result.error) {
      return { success: true, error: '' };
    }
    
    // Mapear errores específicos a mensajes más amigables
    let errorMessage = 'Error al iniciar sesión';
    if (result.error === 'CredentialsSignin') {
      errorMessage = 'Email o contraseña incorrectos';
    }
    
    return { success: false, error: errorMessage };
  } catch (error: any) {
    console.error('Excepción al iniciar sesión:', error);
    
    // Intentamos extraer un mensaje de error más amigable
    let errorMessage = 'Ocurrió un error inesperado al iniciar sesión';
    
    if (error.message) {
      console.error('Mensaje de error:', error.message);
      
      // Si el mensaje contiene CredentialsSignin, es un error de credenciales
      if (error.message.includes('CredentialsSignin')) {
        errorMessage = 'Email o contraseña incorrectos';
      }
    }
    
    return { success: false, error: errorMessage };
  }
}

// Función para solicitar restablecimiento de contraseña
export async function requestPasswordReset(email: string) {
  try {
    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      // No indicamos si el usuario existe o no por razones de seguridad
      // Simplemente devolvemos éxito para no revelar información
      return { success: true, error: '' };
    }
    
    // Generar token de restablecimiento
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora de validez
    
    // Guardar token en la base de datos
    await prisma.user.update({
      where: { id: user.id },
      data: {
        reset_token: resetToken,
        reset_token_expires: resetTokenExpiry,
      },
    });
    
    // En un entorno real, aquí enviarías un email con el enlace de restablecimiento
    // Por ahora, simplemente registramos la información en la consola
    console.log(`Reset token for ${email}: ${resetToken}`);
    console.log(`Reset link would be: /auth/reset-password?token=${resetToken}`);
    
    // Devolver éxito
    return { success: true, error: '' };
  } catch (error) {
    console.error('Error al solicitar restablecimiento de contraseña:', error);
    return { success: false, error: 'Ocurrió un error al procesar la solicitud' };
  }
}

// Función para validar token y restablecer contraseña
export async function resetPassword(token: string, newPassword: string) {
  try {
    // Buscar usuario con token válido
    const user = await prisma.user.findFirst({
      where: {
        reset_token: token,
        reset_token_expires: {
          gt: new Date(), // Token no ha expirado
        },
      },
    });
    
    if (!user) {
      return { success: false, error: 'Token inválido o expirado' };
    }
    
    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Actualizar contraseña y limpiar token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password_hash: hashedPassword,
        reset_token: null,
        reset_token_expires: null,
        updated_at: new Date(),
      },
    });
    
    return { success: true, error: '' };
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    return { success: false, error: 'Ocurrió un error al restablecer la contraseña' };
  }
}
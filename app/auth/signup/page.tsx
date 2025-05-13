'use client';

import { signup } from '@/actions/auth'; // Importa la Server Action
import { useActionState, useEffect, useState } from 'react'; // Añadimos useState
import { useFormStatus } from 'react-dom'; // useFormStatus sigue en react-dom
import { useRouter } from 'next/navigation'; // Para redirigir después del registro exitoso
import { Dialog } from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react'; // Importamos iconos para mostrar/ocultar contraseña

// Definir un tipo para el estado del formulario
type FormState = {
  error: string;
  success?: boolean;
};

// Estado inicial para el formulario
const initialState: FormState = { error: '', success: false };

// Adaptador para la función signup que la hace compatible con useFormState
const signupWithFormState = async (prevState: FormState, formData: FormData) => {
  // Verificar que las contraseñas coincidan antes de enviar
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match', success: false };
  }
  
  const result = await signup(formData);
  return result || { error: '', success: false };
};

// Componente para el botón de envío que muestra estado de carga
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
    >
      {pending ? 'Registering...' : 'Register'}
    </button>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  // Usar useActionState para manejar el estado del formulario y los errores
  const [state, formAction] = useActionState(signupWithFormState, initialState);
  
  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Efecto para redirigir cuando el registro es exitoso
  useEffect(() => {
    if (state.success) {
      //Crear un dialogo de avisando que se registro exitosamente
      toast.success('Registration successful');
      
      router.push('/auth/signin?message=Registration successful, sign in to continue');
    }
  }, [state.success, router]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 17v-4" />
                <path d="M12 17v-2" />
                <path d="M15 17v-6" />
              </svg>
            </div>
            Quintero & Associates
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
            
            {/* Mostrar mensaje de error si existe */}
            {state.error && (
              <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-md">
                {state.error}
              </div>
            )}
            
            <form action={formAction} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name (Optional):
                  </label>
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password:
                  </label>
                  <div className="relative">
                    <input 
                      id="password" 
                      name="password" 
                      type={showPassword ? "text" : "password"} 
                      required 
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password:
                  </label>
                  <div className="relative">
                    <input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type={showConfirmPassword ? "text" : "password"} 
                      required 
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
              <SubmitButton />
              <div className="text-center text-sm mt-4">
                Already have an account?{" "}
                <a href="/auth/signin" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4">
                  Sign In
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* Fondo negro */}
        <div className="absolute inset-0 h-full w-full bg-black">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold text-white">Quintero & Associates</h1>
            <p className="text-white">Solutions for your business</p>
          </div>
        </div>
      </div>
    </div>
  );
}
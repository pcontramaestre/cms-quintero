'use client';

import { signup } from '@/actions/auth'; // Importa la Server Action
import { useActionState, useEffect } from 'react'; // Importamos useActionState y useEffect
import { useFormStatus } from 'react-dom'; // useFormStatus sigue en react-dom
import { useRouter } from 'next/navigation'; // Para redirigir después del registro exitoso
import { Dialog } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

// Definir un tipo para el estado del formulario
type FormState = {
  error: string;
  success?: boolean;
};

// Estado inicial para el formulario
const initialState: FormState = { error: '' };

// Adaptador para la función signup que la hace compatible con useFormState
const signupWithFormState = async (prevState: FormState, formData: FormData) => {
  const result = await signup(formData);
  return result || { error: '' };
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
  
  // Efecto para redirigir cuando el registro es exitoso
  useEffect(() => {
    if (state.success) {
      //Crear un dialogo de avisando que se registro exitosamente
      toast.success('Registration successful');
      
      router.push('/auth/signin?message=Registration successful, sign in to continue');
    }
  }, [state.success, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        
        {/* Mostrar mensaje de error si existe */}
        {state.error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
            {state.error}
          </div>
        )}
        
        <form action={formAction} className="mt-8 space-y-6">
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
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <SubmitButton />
        </form>
        <p>Already have an account? <a href="/auth/signin">Sign In</a></p>
      </div>
    </div>
  );
}
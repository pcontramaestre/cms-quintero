// src/app/auth/signin/page.tsx
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from '@/components/auth/login-form'
import { toast } from 'sonner';

export default function SignInPage(props : {searchParams: {message?: string}}) {
  const { searchParams } = props;

  // Convertimos searchParams a async/await para evitar el error
  const message = searchParams?.message;

  return (

    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Quintero & Associates
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {message && (
              <div className="p-3 text-sm text-green-800 bg-green-100 rounded-md">
                {message}
              </div>
            )}
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
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
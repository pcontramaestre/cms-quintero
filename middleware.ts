import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Solo verificar autenticación para rutas de dashboard
  if (pathname.startsWith("/dashboard")) {
    // Verificar si el usuario está autenticado
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // Si no está autenticado, redirigir a signin
    if (!token) {
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    // Solo aplicar el middleware a rutas de dashboard
    "/dashboard/:path*"
  ],
};

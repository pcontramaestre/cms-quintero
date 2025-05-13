// src/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'
import Credentials from "next-auth/providers/credentials"
import { NextAuthConfig } from "next-auth"

// Extender los tipos de NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    }
  }
  
  interface User {
    id: string;
    email: string; // email es requerido y no puede ser null
    name?: string | null;
    image?: string | null;
  }
}

// No necesitamos extender next-auth/jwt en la versión beta
// La extensión de tipos se hace directamente en el módulo next-auth

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: '/auth/signin',
  },
  // Configuración de hosts confiables
  trustHost: true, // Confiar en el host de la aplicación
  // También puedes especificar dominios específicos así:
  // basePath: "/auth",
  // cookies: {
  //   sessionToken: {
  //     name: `next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },
  callbacks: {
    async jwt({ token, user }) {
      // Si tenemos datos del usuario (generalmente durante el inicio de sesión)
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        // Asignar explícitamente la imagen del usuario al token
        token.picture = user.image || '/user.webp'
      }
      
      // Imprimir el token para depuración
      // console.log('JWT Token:', token)
      return token
    },
    async session({ session, token }) {
      // Transferir datos del token a la sesión
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string | null
        // Asegurarnos de que la imagen siempre tenga un valor
        session.user.image = (token.picture as string) || '/user.webp'
      }
      
      // Imprimir la sesión para depuración
      // console.log('Session:', session)
      return session
    },
    async redirect({ url, baseUrl }) {
      // Si la URL comienza con baseUrl, permitir la redirección
      if (url.startsWith(baseUrl)) return url;
      // Si es una URL relativa, añadir baseUrl
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      // De lo contrario, redirigir a la página de inicio
      return baseUrl;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          })

          if (!user || !user.password_hash) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password_hash
          )

          if (!isPasswordValid) {
            return null
          }

          // Asegurarnos de que el email nunca sea null para cumplir con la interfaz User
          if (!user.email) {
            console.error("Error: El usuario no tiene email")
            return null
          }
          
          return {
            id: user.id,
            email: user.email, // Ahora sabemos que no es null
            name: user.name,
            image: user.image
          }
        } catch (error) {
          console.error("Error en autenticación:", error)
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

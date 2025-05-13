import type React from "react"
import { Roboto } from "next/font/google"
import "@/app/globals.css"
import type { Metadata } from "next"

const roboto = Roboto({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Autenticación | Quintero and Associates",
  description: "Acceso a servicios profesionales de contabilidad, impuestos y negocios",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}

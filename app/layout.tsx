
import type React from "react"
import { Roboto } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"

const roboto = Roboto({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quintero and Associates",
  description: "Professional accounting, tax, and business services",
  generator: 'Pablo Contramaestre'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}

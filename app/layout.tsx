import type React from "react"
import { Roboto } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"
import type { Metadata } from "next"

const roboto = Roboto({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quintero and Associates",
  description: "Professional accounting, tax, and business services",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  )
}

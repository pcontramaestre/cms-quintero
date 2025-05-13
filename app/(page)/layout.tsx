
import type React from "react"
import { Roboto } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "../globals.css"
import type { Metadata } from "next"

const roboto = Roboto({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quintero and Associates",
  description: "Professional accounting, tax, and business services",
  generator: 'Pablo Contramaestre'
}

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Header />
        {children}
        <Footer />
    </>
  )
}

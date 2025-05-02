import type React from "react"
import type { Metadata } from "next"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Book Your Appointment | Quintero and Associates",
  description: "Schedule your visit with our professional team. Complete the form below and we'll confirm your appointment within the next few hours.",
}

export default function AppoimentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white bg-[url('/bg-internals.webp')] bg-cover bg-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight">Book Your Appointment</h1>
            <p className="mt-4 text-xl">Schedule your visit with our professional team. Complete the form below and we'll confirm your appointment within the next few hours.</p>
          </div>
        </div>
      </section>
      {children}
      <Toaster richColors position="top-center" />
    </div>
  )
}

import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Quintero and Associates",
  description: "We'd love to hear from you. Get in touch with us.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white bg-[url('/bg-internals.webp')] bg-cover bg-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="mt-4 text-xl">We'd love to hear from you. Get in touch with us.</p>
          </div>
        </div>
      </section>
      {children}
    </div>
  )
}

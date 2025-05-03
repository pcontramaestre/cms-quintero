import type React from "react"
import type { Metadata } from "next"
import { Phone, Mail } from "lucide-react"

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
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white bg-[url('/bg-internals.webp')] bg-cover bg-center bg-blend-multiply relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-800/70"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-md">Contact Us</h1>
            <p className="mt-4 text-xl text-blue-100">We'd love to hear from you. Our team is ready to assist with any questions or concerns.</p>
            <div className="mt-8 flex justify-center space-x-4">
              <a href="tel:+13055294929" className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 border border-white/30">
                <Phone className="mr-2 h-4 w-4" />
                <span>Call Us</span>
              </a>
              <a href="mailto:info@quinteroandassociates.com" className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 border border-white/30">
                <Mail className="mr-2 h-4 w-4" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {children}
    </div>
  )
}

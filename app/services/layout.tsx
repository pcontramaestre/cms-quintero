import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Quintero and Associates",
  description: "Explore our comprehensive financial services",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
            <p className="mt-4 text-xl">Comprehensive financial solutions tailored to your needs</p>
          </div>
        </div>
      </section>
      {children}
    </div>
  )
}

import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Quintero and Associates",
  description: "Learn about our team and our mission to provide exceptional financial services",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white bg-[url('/bg-internals.webp')] bg-cover bg-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
            <p className="mt-4 text-xl">Learn about our team and our mission to provide exceptional financial services</p>
          </div>
        </div>
      </section>
      {children}
    </div>
  )
}

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
      {children}
    </div>
  )
}

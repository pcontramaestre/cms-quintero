import type { Metadata } from "next"
import BusinessToolkitClientPage from "@/app/business-toolkit/BusinessToolkitClientPage"

export const metadata: Metadata = {
  title: "Business Toolkit | Quintero and Associates",
  description: "Essential tools for entrepreneurs and taxpayers that facilitate tax and business planning.",
}

export default function BusinessToolkitPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[center_top_-1px] border-b"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">Business Resources</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Business Toolkit</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8">
              Essential tools and calculators to help you make informed decisions for your business.
              From structure selection to tax planning, we've got you covered.  
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <BusinessToolkitClientPage />
          </div>
        </div>
      </section>
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, FileText, ClipboardList, Calculator, FolderOpen, Settings, AlertCircle } from "lucide-react"
import type { Metadata } from "next"
import ITINServiceCardSection from "@/components/ITINServiceCardSection"

export const metadata: Metadata = {
  title: "Get your ITIN | Quintero and Associates",
  description: "Specialized services to help you get your finances in order quickly and efficiently",
}

export default function GetItInServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[center_top_-1px] border-b"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4 animate-fade-in">
              <span className="text-xs font-semibold uppercase tracking-wide">Simplified Process</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Get your ITIN</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8">
              Obtaining an Individual Taxpayer Identification Number (ITIN) from the IRS is a critical requirement for non-U.S. persons needing to file U.S. tax returns or claim treaty benefits. Our dedicated services simplify this process and help you achieve compliance with ease.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="#services">Explore Services</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial Organization</h3>
              <p className="text-gray-600">Organize your financial records and establish efficient systems.</p>
            </div>
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <ClipboardList className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Catch-up Bookkeeping</h3>
              <p className="text-gray-600">Bring your books up to date quickly and accurately.</p>
            </div>
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Calculator className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tax Filing for Prior Years</h3>
              <p className="text-gray-600">Prepare and file tax returns for previous years to get back into compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wide">Expert Guidance</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Streamlined ITIN Application Process</h2>
              <p className="text-lg text-gray-600 mb-6">
                Navigating the ITIN application process, especially when dealing with existing tax obligations or incomplete financial records, can be complex and daunting. Our dedicated services specialize in guiding you through every step.              
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Expert Application Preparation</h3>
                    <p className="text-gray-600">We ensure your application is accurately prepared with all required documentation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Comprehensive Support</h3>
                    <p className="text-gray-600">Guidance through every step of the process from start to finish.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Efficient Processing</h3>
                    <p className="text-gray-600">We help expedite your application to minimize delays and complications.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-30 blur"></div>
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Get your ITIN services"
                  width={500}
                  height={400}
                  className="relative rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        <ITINServiceCardSection />

        {/* Services Section */}
        <section id="services" className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">Comprehensive Solutions</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Get your ITIN Services Include</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">From financial organization to crisis management, we offer a full range of services to help you get your finances in order.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Financial Organization",
                description: "Organize your financial records and establish efficient systems.",
                features: [
                  "Document organization",
                  "Filing system setup",
                  "Record retention planning",
                  "Digital document management",
                  "Financial record inventory",
                ],
              },
              {
                title: "Catch-up Bookkeeping",
                description: "Bring your books up to date quickly and accurately.",
                features: [
                  "Transaction entry",
                  "Bank reconciliation",
                  "Financial statement preparation",
                  "Account cleanup",
                  "Historical data analysis",
                ],
              },
              {
                title: "Tax Filing for Prior Years",
                description: "Prepare and file tax returns for previous years to get back into compliance.",
                features: [
                  "Prior year tax return preparation",
                  "Amended return filing",
                  "Tax liability assessment",
                  "Penalty abatement requests",
                  "IRS communication management",
                ],
              },
              {
                title: "Financial Clean-up",
                description: "Resolve financial issues and clean up your financial records.",
                features: [
                  "Error correction",
                  "Account reconciliation",
                  "Duplicate transaction removal",
                  "Missing transaction identification",
                  "Balance sheet cleanup",
                ],
              },
              {
                title: "System Implementation",
                description: "Implement financial systems to improve efficiency and accuracy.",
                features: [
                  "Accounting software setup",
                  "Process automation",
                  "Integration with existing systems",
                  "User training",
                  "System documentation",
                ],
              },
              {
                title: "Crisis Management",
                description: "Rapid response to financial emergencies and urgent situations.",
                features: [
                  "Emergency financial assessment",
                  "Crisis action planning",
                  "Immediate compliance issues",
                  "Cash flow emergency management",
                  "Stakeholder communication",
                ],
              },
            ].map((service, index) => (
              <Card key={index} className="bg-white border border-blue-100 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-blue-200 group">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {index === 0 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><FileText className="h-6 w-6 text-blue-600" /></div>}
                    {index === 1 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><ClipboardList className="h-6 w-6 text-blue-600" /></div>}
                    {index === 2 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><Calculator className="h-6 w-6 text-blue-600" /></div>}
                    {index === 3 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><FolderOpen className="h-6 w-6 text-blue-600" /></div>}
                    {index === 4 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><Settings className="h-6 w-6 text-blue-600" /></div>}
                    {index === 5 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><AlertCircle className="h-6 w-6 text-blue-600" /></div>}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{service.title}</h4>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 flex items-center">
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl overflow-hidden relative bg-blue-700">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
          <div className="relative p-8 md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-white bg-opacity-90 text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wide">Get Started Today</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Need to get your finances in order?</h3>
                <p className="mt-4 text-lg text-white text-opacity-90">
                  Contact us today to schedule a consultation and learn how our Get It In services can help you quickly
                  organize your finances and establish a solid foundation.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end space-y-4">
                <Button asChild size="lg" className="w-full md:w-auto bg-white hover:bg-gray-100 text-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 text-lg">
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <p className="text-sm text-white text-opacity-80 italic">No obligation, free initial consultation</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Shield, FileCheck, AlertTriangle, FileText, Briefcase, BarChart4 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compliance Services | Quintero and Associates",
  description: "Ensure your business meets all regulatory requirements and industry standards",
}

export default function ComplianceServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[center_top_-1px] border-b"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4 animate-fade-in">
              <span className="text-xs font-semibold uppercase tracking-wide">Regulatory Excellence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Compliance Services</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8">
              Our compliance services help ensure your business meets all regulatory requirements and industry
              standards. We help you navigate complex regulations and implement effective compliance programs.
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
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Regulatory Compliance</h3>
              <p className="text-gray-600">
                Ensure compliance with federal, state, and local regulations applicable to your business.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FileCheck className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Internal Audits</h3>
              <p className="text-gray-600">Identify and address compliance issues before they become problems.</p>
            </div>
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Risk Assessment</h3>
              <p className="text-gray-600">Identify and evaluate compliance risks specific to your business.</p>
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
                <span className="text-xs font-semibold uppercase tracking-wide">Peace of Mind</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Navigate Regulations with Confidence</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our team of compliance experts helps your business stay ahead of regulatory changes and maintain full compliance with all applicable laws and industry standards.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Proactive Approach</h3>
                    <p className="text-gray-600">We identify potential compliance issues before they become problems.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Customized Solutions</h3>
                    <p className="text-gray-600">Compliance programs tailored to your specific industry and business needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Ongoing Support</h3>
                    <p className="text-gray-600">Continuous monitoring and updates to keep your compliance program current.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-30 blur"></div>
                <Image
                  src="/compliance.webp"
                  alt="Compliance services"
                  width={500}
                  height={400}
                  className="relative rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">Comprehensive Solutions</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Compliance Services Include</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">From regulatory compliance to risk assessment, we offer a full range of services to keep your business compliant and protected.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Regulatory Compliance",
                description:
                  "Ensure compliance with federal, state, and local regulations applicable to your business.",
                features: [
                  "Regulatory gap analysis",
                  "Compliance program development",
                  "Regulatory reporting",
                  "Licensing and permit management",
                  "Regulatory change management",
                ],
              },
              {
                title: "Internal Audits",
                description: "Identify and address compliance issues before they become problems.",
                features: [
                  "Compliance audits",
                  "Process audits",
                  "Financial audits",
                  "Operational audits",
                  "Audit report preparation",
                ],
              },
              {
                title: "Risk Assessment",
                description: "Identify and evaluate compliance risks specific to your business.",
                features: [
                  "Risk identification",
                  "Risk analysis",
                  "Risk prioritization",
                  "Risk mitigation planning",
                  "Risk monitoring",
                ],
              },
              {
                title: "Policy Development",
                description: "Develop and implement effective compliance policies and procedures.",
                features: [
                  "Policy drafting",
                  "Procedure development",
                  "Policy implementation",
                  "Policy review and updates",
                  "Employee policy training",
                ],
              },
              {
                title: "Compliance Training",
                description: "Educate your team on compliance requirements and best practices.",
                features: [
                  "Compliance awareness training",
                  "Role-specific training",
                  "New hire compliance orientation",
                  "Compliance refresher courses",
                  "Training documentation",
                ],
              },
              {
                title: "Compliance Monitoring",
                description: "Ongoing monitoring to ensure continued compliance with regulations.",
                features: [
                  "Compliance testing",
                  "Compliance reporting",
                  "Issue tracking and resolution",
                  "Compliance metrics",
                  "Continuous improvement",
                ],
              },
            ].map((service, index) => (
              <Card key={index} className="bg-white border border-blue-100 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-blue-200 group">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {index === 0 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><Shield className="h-6 w-6 text-blue-600" /></div>}
                    {index === 1 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><FileCheck className="h-6 w-6 text-blue-600" /></div>}
                    {index === 2 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><AlertTriangle className="h-6 w-6 text-blue-600" /></div>}
                    {index === 3 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><FileText className="h-6 w-6 text-blue-600" /></div>}
                    {index === 4 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><Briefcase className="h-6 w-6 text-blue-600" /></div>}
                    {index === 5 && <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"><BarChart4 className="h-6 w-6 text-blue-600" /></div>}
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
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Need help with compliance?</h3>
                <p className="mt-4 text-lg text-white text-opacity-90">
                  Contact us today to schedule a consultation and learn how our compliance services can help your business
                  meet regulatory requirements and industry standards.
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

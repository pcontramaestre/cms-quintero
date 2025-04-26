import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import ITINServiceCardSection from "@/components/ITINServiceCardSection"

export const metadata: Metadata = {
  title: "Get your ITIN | Quintero and Associates",
  description: "Specialized services to help you get your finances in order quickly and efficiently",
}

export default function GetItInServicesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Get your ITIN</h2>
            <p className="mt-4 text-lg text-gray-600">
            Obtaining an Individual Taxpayer Identification Number (ITIN) from the IRS is a critical requirement for non-U.S. persons needing to file U.S. tax returns or claim treaty benefits. Navigating the application process, especially when dealing with existing tax obligations or incomplete financial records, can be complex and daunting. Our dedicated Get your ITIN services specialize in guiding you through every step, ensuring your application is accurately prepared and supported by the necessary financial documentation. We provide expert assistance to simplify this process and help you achieve compliance with ease.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Financial Organization</h3>
                  <p className="text-gray-600">Organize your financial records and establish efficient systems.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Catch-up Bookkeeping</h3>
                  <p className="text-gray-600">Bring your books up to date quickly and accurately.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Tax Filing for Prior Years</h3>
                  <p className="text-gray-600">
                    Prepare and file tax returns for previous years to get back into compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Get your ITIN services"
              width={500}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
        <ITINServiceCardSection />

        <div className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Get your ITIN Services Include</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <h4 className="text-xl font-medium text-gray-900">{service.title}</h4>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="mr-2 h-5 w-5 text-blue-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-lg bg-blue-50 p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Need to get your finances in order?</h3>
              <p className="mt-4 text-lg text-gray-600">
                Contact us today to schedule a consultation and learn how our Get It In services can help you quickly
                organize your finances and establish a solid foundation.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

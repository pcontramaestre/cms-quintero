import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compliance Services | Quintero and Associates",
  description: "Ensure your business meets all regulatory requirements and industry standards",
}

export default function ComplianceServicesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Compliance Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our compliance services help ensure your business meets all regulatory requirements and industry
              standards. We help you navigate complex regulations and implement effective compliance programs.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Regulatory Compliance</h3>
                  <p className="text-gray-600">
                    Ensure compliance with federal, state, and local regulations applicable to your business.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Internal Audits</h3>
                  <p className="text-gray-600">Identify and address compliance issues before they become problems.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Risk Assessment</h3>
                  <p className="text-gray-600">Identify and evaluate compliance risks specific to your business.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Compliance services"
              width={500}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Compliance Services Include</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Need help with compliance?</h3>
              <p className="mt-4 text-lg text-gray-600">
                Contact us today to schedule a consultation and learn how our compliance services can help your business
                meet regulatory requirements and industry standards.
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

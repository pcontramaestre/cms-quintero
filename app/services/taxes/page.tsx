import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tax Services | Quintero and Associates",
  description: "Comprehensive tax planning and preparation services for individuals and businesses",
}

export default function TaxServicesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tax Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our tax services are designed to minimize your tax liability while ensuring compliance with all applicable
              tax laws. We stay up-to-date with the latest tax regulations to provide you with the most effective tax
              strategies.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Tax Preparation</h3>
                  <p className="text-gray-600">
                    Accurate and timely preparation of individual and business tax returns.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Tax Planning</h3>
                  <p className="text-gray-600">
                    Strategic planning to minimize your tax liability and maximize your financial resources.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">IRS Representation</h3>
                  <p className="text-gray-600">Professional representation in case of an audit or other IRS matters.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Tax services"
              width={500}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Tax Services Include</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Tax Preparation",
                description: "Accurate and timely preparation of tax returns for individuals and businesses.",
                features: [
                  "Individual tax returns",
                  "Business tax returns",
                  "Partnership and LLC returns",
                  "Corporate tax returns",
                  "Non-profit tax returns",
                ],
              },
              {
                title: "Tax Planning",
                description: "Strategic planning to minimize your tax liability and maximize your financial resources.",
                features: [
                  "Year-round tax planning",
                  "Tax-efficient investment strategies",
                  "Retirement planning",
                  "Estate and gift tax planning",
                  "Business tax strategies",
                ],
              },
              {
                title: "IRS Representation",
                description: "Professional representation in case of an audit or other IRS matters.",
                features: [
                  "Audit representation",
                  "Tax notice assistance",
                  "IRS appeals",
                  "Tax court representation",
                  "Penalty abatement",
                ],
              },
              {
                title: "Tax Resolution",
                description: "Solutions for tax problems, including back taxes, liens, and levies.",
                features: [
                  "Offer in compromise",
                  "Installment agreements",
                  "Innocent spouse relief",
                  "Lien and levy release",
                  "Wage garnishment release",
                ],
              },
              {
                title: "International Tax",
                description: "Tax services for individuals and businesses with international interests.",
                features: [
                  "Foreign income reporting",
                  "FBAR compliance",
                  "Foreign tax credit planning",
                  "Expatriate tax services",
                  "International business tax planning",
                ],
              },
              {
                title: "State and Local Tax",
                description: "Compliance and planning for state and local tax obligations.",
                features: [
                  "Multi-state tax returns",
                  "Sales and use tax",
                  "Property tax",
                  "State tax nexus analysis",
                  "State tax credits and incentives",
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
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Need help with your taxes?</h3>
              <p className="mt-4 text-lg text-gray-600">
                Contact us today to schedule a consultation and learn how our tax services can help you minimize your
                tax liability and ensure compliance.
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

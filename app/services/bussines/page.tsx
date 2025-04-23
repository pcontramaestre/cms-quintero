import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Services | Quintero and Associates",
  description: "Strategic planning and business advisory services to help your business grow and succeed",
}

export default function BusinessServicesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Business Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our business services are designed to help you start, grow, and optimize your business operations. We
              provide strategic guidance and practical solutions to address your unique challenges and opportunities.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Business Formation</h3>
                  <p className="text-gray-600">
                    We help you choose the right business structure and guide you through the formation process.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Strategic Planning</h3>
                  <p className="text-gray-600">
                    Develop a roadmap for your business with clear goals, strategies, and action plans.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Financial Forecasting</h3>
                  <p className="text-gray-600">
                    Project your business's financial performance to make informed decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Business services"
              width={500}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Business Services Include</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Business Formation",
                description:
                  "Choose the right business structure and complete all necessary paperwork to establish your business legally.",
                features: [
                  "Entity selection (LLC, S-Corp, C-Corp)",
                  "Registration with state and local authorities",
                  "EIN application",
                  "Operating agreements and bylaws",
                  "Business licenses and permits",
                ],
              },
              {
                title: "Strategic Planning",
                description: "Develop a comprehensive plan to guide your business toward its goals and objectives.",
                features: [
                  "Mission and vision development",
                  "SWOT analysis",
                  "Goal setting and KPIs",
                  "Action planning",
                  "Implementation support",
                ],
              },
              {
                title: "Financial Forecasting",
                description:
                  "Project your business's financial performance to make informed decisions and secure funding.",
                features: [
                  "Revenue projections",
                  "Expense forecasting",
                  "Cash flow analysis",
                  "Break-even analysis",
                  "Scenario planning",
                ],
              },
              {
                title: "Business Valuation",
                description: "Determine the fair market value of your business for various purposes.",
                features: [
                  "Asset-based valuation",
                  "Income-based valuation",
                  "Market-based valuation",
                  "Valuation for sale or acquisition",
                  "Valuation for partnership agreements",
                ],
              },
              {
                title: "Succession Planning",
                description: "Prepare for the future of your business with a comprehensive succession plan.",
                features: [
                  "Leadership transition planning",
                  "Business continuity strategies",
                  "Exit strategy development",
                  "Family business succession",
                  "Buy-sell agreements",
                ],
              },
              {
                title: "Business Advisory",
                description: "Ongoing support and guidance to help your business thrive.",
                features: [
                  "Performance analysis",
                  "Process improvement",
                  "Cost reduction strategies",
                  "Growth planning",
                  "Risk management",
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
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Ready to grow your business?</h3>
              <p className="mt-4 text-lg text-gray-600">
                Contact us today to schedule a consultation and learn how our business services can help you achieve
                your goals.
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

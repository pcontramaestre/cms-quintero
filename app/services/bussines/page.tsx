import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, ChevronRight, Briefcase, TrendingUp, BarChart, Users, Building, LineChart } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Services | Quintero and Associates",
  description: "Strategic planning and business advisory services to help your business grow and succeed",
}

export default function BusinessServicesPage() {
  return (
    <div className="flex flex-col animate-fade-in-1s">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-6 mx-auto">
              <Briefcase className="mr-1 h-4 w-4" /> Business Growth Solutions
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Business Services
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              Strategic guidance and practical solutions to help your business thrive
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>
      
      {/* Overview Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
                <TrendingUp className="mr-1 h-4 w-4" /> Business Excellence
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Comprehensive Business Solutions
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Our business services are designed to help you start, grow, and optimize your business operations. We
                provide strategic guidance and practical solutions to address your unique challenges and opportunities.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Business Formation</h3>
                    <p className="text-gray-600 mt-1">
                      We help you choose the right business structure and guide you through the formation process.
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <LineChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Strategic Planning</h3>
                    <p className="text-gray-600 mt-1">
                      Develop a roadmap for your business with clear goals, strategies, and action plans.
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <BarChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Financial Forecasting</h3>
                    <p className="text-gray-600 mt-1">
                      Project your business's financial performance to make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-xl opacity-30 blur-xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300 border border-blue-100">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Business services"
                  width={600}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

        <section className="py-16 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4 mx-auto">
                <Briefcase className="mr-1 h-4 w-4" /> Comprehensive Offerings
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Our Business Services Include
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
                Tailored solutions to address your unique business needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group h-full">
                <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900">{service.title}</h4>
                  <p className="mt-3 text-gray-600">{service.description}</p>
                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                        <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 my-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl overflow-hidden relative bg-blue-700">
              <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
              <div className="relative p-8 md:p-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
                  <div>
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-white bg-opacity-90 text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wide">Get Started Today</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Need business services?</h3>
                    <p className="mt-4 text-lg text-white text-opacity-90">
                      Contact us today to schedule a consultation and learn how our business services can help your company thrive and grow.
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
            </div>
          </div>
        </section>
    </div>
  )
}

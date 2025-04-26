import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, FileText, Calculator, Shield, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
      title: "Business Services",
      description: "Strategic planning and business advisory services to help your business grow and succeed.",
      link: "/services/bussines",
      features: [
        "Business formation",
        "Strategic planning",
        "Financial forecasting",
        "Business valuation",
        "Succession planning",
      ],
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-600" />,
      title: "Tax Services",
      description: "Comprehensive tax planning and preparation services for individuals and businesses.",
      link: "/services/taxes",
      features: ["Tax preparation", "Tax planning", "IRS representation", "Tax resolution", "International tax"],
    },
    {
      icon: <Calculator className="h-10 w-10 text-blue-600" />,
      title: "Accounting",
      description: "Reliable accounting and bookkeeping services to keep your finances in order.",
      link: "/services/accounting",
      features: [
        "Bookkeeping",
        "Financial statements",
        "Payroll services",
        "Cash flow management",
        "QuickBooks setup and training",
      ],
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: "Compliance",
      description: "Ensure your business meets all regulatory requirements and industry standards.",
      link: "/services/compliance",
      features: [
        "Regulatory compliance",
        "Internal audits",
        "Risk assessment",
        "Policy development",
        "Compliance training",
      ],
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
      title: "Get your ITIN",
      description: "Expert Assistance to Obtain Your IRS ITIN.",
      link: "/services/getitin",
      features: [
        "Required Documentation Assembly",
        "Comprehensive Financial Record Review",
        "Support for Prior Tax Year Filings",
        "Efficient Financial Data Cleanup",
        "Guidance on Future Record Keeping",
      ],
    },
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Comprehensive Financial Solutions</h2>
            <p className="mt-4 text-lg text-gray-600">
            At Quintero & Associates, we offer a wide range of financial services designed to meet the unique needs of businesses and individuals. Our team of experienced professionals is dedicated to helping you achieve your financial goals through personalized service and expert advice.
            </p>
            <p className="mt-4 text-lg text-gray-600">
            Our extensive service portfolio goes beyond basic accounting, encompassing critical areas like strategic business planning, comprehensive tax preparation and planning, meticulous accounting practices, and robust regulatory compliance. For both entrepreneurial ventures navigating growth and individual clients managing their personal finances, we provide the specialized expertise needed to manage financial responsabilidades effectively and strategically plan for prosperity.
            </p>
            <p className="mt-4 text-lg text-gray-600">
            Navigating the complexities of the financial and regulatory landscape can be challenging. Our dedicated support aims to simplify this complexity, ensuring you meet all obligations, optimize your financial health, and free up valuable time. We are committed to being a trusted partner every step of the way, providing clarity, efficiency, and peace of mind through expert financial management tailored to your specific situation."
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Financial services"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                {service.icon}
                <CardTitle className="mt-4">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-auto bg-blue-600 hover:bg-blue-700">
                  <Link href={service.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

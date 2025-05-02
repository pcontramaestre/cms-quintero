import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, FileText, Calculator, Shield, ArrowRight, ChevronRight, Star, Award, Briefcase, CheckCircle } from "lucide-react"

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
    <div className="flex flex-col animate-fade-in-1s">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-6 mx-auto">
              <Briefcase className="mr-1 h-4 w-4" /> Professional Expertise
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your unique needs
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
                <Star className="mr-1 h-4 w-4" /> Tailored Solutions
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Comprehensive Financial Solutions
              </h2>
              <div className="mt-6 space-y-6 text-lg text-gray-600">
                <p className="leading-relaxed">
                  At Quintero & Associates, we offer a wide range of financial services designed to meet the unique needs of businesses and individuals. Our team of experienced professionals is dedicated to helping you achieve your financial goals through personalized service and expert advice.
                </p>
                <p className="leading-relaxed">
                  Our extensive service portfolio goes beyond basic accounting, encompassing critical areas like strategic business planning, comprehensive tax preparation and planning, meticulous accounting practices, and robust regulatory compliance. For both entrepreneurial ventures navigating growth and individual clients managing their personal finances, we provide the specialized expertise needed to manage financial responsibilities effectively and strategically plan for prosperity.
                </p>
                <p className="leading-relaxed">
                  Navigating the complexities of the financial and regulatory landscape can be challenging. Our dedicated support aims to simplify this complexity, ensuring you meet all obligations, optimize your financial health, and free up valuable time. We are committed to being a trusted partner every step of the way, providing clarity, efficiency, and peace of mind through expert financial management tailored to your specific situation.
                </p>
                <div className="pt-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg group">
                    <Link href="/contact" className="flex items-center">Schedule a Consultation <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" /></Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-xl opacity-30 blur-xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300 border border-blue-100">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Financial services"
                  width={600}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Heading */}
      <section className="py-8 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 pt-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4 mx-auto">
              <Award className="mr-1 h-4 w-4" /> Expert Services
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Our Service Offerings
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Explore our range of specialized financial services
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="flex flex-col border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group h-full">
                <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
                <CardHeader className="pb-0">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col pt-6">
                  <ul className="mb-6 space-y-3 flex-1">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                        <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-auto w-full bg-blue-600 hover:bg-blue-700 group-hover:shadow-md transition-all duration-300">
                    <Link href={service.link} className="flex items-center justify-center">Learn More <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-800 opacity-30 [mask-image:radial-gradient(farthest-side_at_top,transparent_40%,white_70%)]">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0M20 40L40 20M0 20L20 0" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-between text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Ready to optimize your financial future?
              </h2>
              <p className="mt-6 text-xl text-blue-100">
                Contact us today to schedule a consultation and discover how our services can benefit you
              </p>
              <div className="mt-10">
                <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg">
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

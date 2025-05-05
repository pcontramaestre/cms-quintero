import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, TrendingUp, FileText, Calculator, Users, ChevronRight, Star, Award, BarChart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col animate-fade-in-1s">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-24 text-white bg-[url('/bg-internals.webp')] bg-cover bg-center bg-blend-overlay bg-opacity-90 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-6 w-fit">
                <Award className="mr-1 h-4 w-4" /> Trusted Financial Experts
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Professional Financial Services
              </h1>
              <p className="mt-6 text-xl text-blue-100">
                Quintero & Associates provides expert accounting, tax, and business services to help you achieve
                financial success.
              </p>
              <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg group">
                  <Link href="/contact" className="flex items-center">Get Started <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white text-blue-700 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg group">
                  <Link href="/services">Our Services <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" /></Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-400 rounded-lg blur-xl opacity-30 animate-pulse"></div>
                <Image
                  src="/home2.webp"
                  alt="Financial professionals"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-2xl relative border border-blue-200/20 transform hover:scale-[1.01] transition-all duration-300"
                />
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 py-6 px-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
            {[
              { label: "Years of Experience", value: "15+" },
              { label: "Satisfied Clients", value: "500+" },
              { label: "Professionals", value: "25+" },
              { label: "Average Savings", value: "30%" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-2">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4 mx-auto">
              <Star className="mr-1 h-4 w-4" /> Our Specialties
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Comprehensive financial solutions tailored to your needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
              <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
              <CardHeader className="pb-0">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Business Services</CardTitle>
                <CardDescription className="text-gray-600">Strategic planning and business advisory services</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Business formation</span>
                  </li>
                  <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Strategic planning</span>
                  </li>
                  <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Financial forecasting</span>
                  </li>
                </ul>
                <Button asChild className="mt-8 w-full bg-blue-600 hover:bg-blue-700 group-hover:shadow-md transition-all duration-300">
                  <Link href="/services/bussines" className="flex items-center justify-center">Learn More <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" /></Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
              <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
              <CardHeader className="pb-0">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Tax Services</CardTitle>
                <CardDescription className="text-gray-600">Comprehensive tax planning and preparation</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Tax preparation</span>
                  </li>
                  <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Tax planning</span>
                  </li>
                  <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">IRS representation</span>
                  </li>
                </ul>
                <Button asChild className="mt-8 w-full bg-blue-600 hover:bg-blue-700 group-hover:shadow-md transition-all duration-300">
                  <Link href="/services/taxes" className="flex items-center justify-center">Learn More <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" /></Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
              <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
              <CardHeader className="pb-0">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Accounting</CardTitle>
                <CardDescription className="text-gray-600">Reliable accounting and bookkeeping services</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Bookkeeping</span>
                  </li>
                  <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Financial statements</span>
                  </li>
                  <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <CheckCircle className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Payroll services</span>
                  </li>
                </ul>
                <Button asChild className="mt-8 w-full bg-blue-600 hover:bg-blue-700 group-hover:shadow-md transition-all duration-300">
                  <Link href="/services/accounting" className="flex items-center justify-center">Learn More <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg transition-all duration-300 hover:shadow-md">
              <Link href="/services" className="flex items-center">View All Services <ChevronRight className="ml-1 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4 mx-auto">
              <Star className="mr-1 h-4 w-4" /> Testimonials
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Trusted by businesses and individuals across the country
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-1 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative bg-white rounded-lg p-8 border border-blue-50">
                  <div className="absolute -top-5 right-10 text-blue-200 text-7xl opacity-20 font-serif">"</div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-blue-600 rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300"></div>
                      <div className="h-16 w-16 rounded-full bg-blue-100 relative flex items-center justify-center">
                        <Users className="h-10 w-10 p-1 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-blue-900">Client {i}</h3>
                      <p className="text-sm text-blue-600">Business Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    "Quintero & Associates has been instrumental in helping our business grow. Their expertise in tax
                    planning has saved us thousands of dollars."
                  </p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white relative overflow-hidden">
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
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0 md:space-x-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Ready to get started?
              </h2>
              <p className="mt-6 text-xl text-blue-100">
                Contact us today for a free consultation and discover how we can help you achieve your financial goals
              </p>
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="inline-block h-10 w-10 rounded-full bg-blue-500 ring-2 ring-white">
                      <Users className="h-10 w-10 p-2 text-white" />
                    </div>
                  ))}
                </div>
                <span className="ml-4 text-sm font-medium text-blue-100">Join over 500 satisfied clients</span>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <Button asChild size="lg" className="w-full md:w-auto px-8 py-6 text-lg bg-white text-blue-700 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg group">
                <Link href="/contact" className="flex items-center">Contact Us <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, TrendingUp, FileText, Calculator, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Professional Financial Services
              </h1>
              <p className="mt-6 text-xl">
                Quintero & Associates provides expert accounting, tax, and business services to help you achieve
                financial success.
              </p>
              <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Financial professionals"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              Comprehensive financial solutions tailored to your needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-blue-600" />
                <CardTitle className="mt-4">Business Services</CardTitle>
                <CardDescription>Strategic planning and business advisory services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Business formation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Strategic planning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Financial forecasting</span>
                  </li>
                </ul>
                <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/services/bussines">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-blue-600" />
                <CardTitle className="mt-4">Tax Services</CardTitle>
                <CardDescription>Comprehensive tax planning and preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Tax preparation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Tax planning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                    <span>IRS representation</span>
                  </li>
                </ul>
                <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/services/taxes">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calculator className="h-10 w-10 text-blue-600" />
                <CardTitle className="mt-4">Accounting</CardTitle>
                <CardDescription>Reliable accounting and bookkeeping services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Bookkeeping</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Financial statements</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Payroll services</span>
                  </li>
                </ul>
                <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/services/accounting">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Clients Say</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              Trusted by businesses and individuals across the country
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100">
                      <Users className="h-12 w-12 p-2 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Client Name {i}</h3>
                      <p className="text-sm text-gray-500">Business Owner</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600">
                    "Quintero & Associates has been instrumental in helping our business grow. Their expertise in tax
                    planning has saved us thousands of dollars."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 md:space-x-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get started?</h2>
              <p className="mt-4 text-xl">Contact us today for a free consultation</p>
            </div>
            <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

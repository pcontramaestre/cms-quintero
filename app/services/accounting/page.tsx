import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accounting Services | Quintero and Associates",
  description: "Reliable accounting and bookkeeping services to keep your finances in order",
}

export default function AccountingServicesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Accounting Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our accounting services provide you with accurate financial information to make informed business
              decisions. We handle the numbers so you can focus on running your business.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Bookkeeping</h3>
                  <p className="text-gray-600">
                    Accurate recording of financial transactions to maintain organized financial records.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Financial Statements</h3>
                  <p className="text-gray-600">
                    Preparation of balance sheets, income statements, and cash flow statements.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Payroll Services</h3>
                  <p className="text-gray-600">Comprehensive payroll processing, tax filing, and reporting.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Accounting services"
              width={500}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Accounting Services Include</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Bookkeeping",
                description: "Accurate recording of financial transactions to maintain organized financial records.",
                features: [
                  "Transaction recording",
                  "Account reconciliation",
                  "General ledger maintenance",
                  "Accounts receivable management",
                  "Accounts payable management",
                ],
              },
              {
                title: "Financial Statements",
                description:
                  "Preparation of financial statements to provide insights into your business's financial health.",
                features: [
                  "Balance sheets",
                  "Income statements",
                  "Cash flow statements",
                  "Statement of changes in equity",
                  "Financial analysis and interpretation",
                ],
              },
              {
                title: "Payroll Services",
                description: "Comprehensive payroll processing, tax filing, and reporting.",
                features: [
                  "Payroll processing",
                  "Tax withholding and filing",
                  "W-2 and 1099 preparation",
                  "Employee benefits administration",
                  "Payroll compliance",
                ],
              },
              {
                title: "Cash Flow Management",
                description: "Strategies to optimize your cash flow and ensure financial stability.",
                features: [
                  "Cash flow forecasting",
                  "Cash flow analysis",
                  "Working capital management",
                  "Cash flow improvement strategies",
                  "Cash flow monitoring",
                ],
              },
              {
                title: "QuickBooks Setup and Training",
                description: "Professional setup and training for QuickBooks accounting software.",
                features: [
                  "QuickBooks setup",
                  "Chart of accounts customization",
                  "User training",
                  "Ongoing support",
                  "Data migration",
                ],
              },
              {
                title: "Financial Reporting",
                description: "Customized financial reports to meet your specific business needs.",
                features: [
                  "Monthly financial reports",
                  "Quarterly financial reviews",
                  "Year-end financial summaries",
                  "Budget vs. actual reports",
                  "Custom financial dashboards",
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
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Need accounting support?</h3>
              <p className="mt-4 text-lg text-gray-600">
                Contact us today to schedule a consultation and learn how our accounting services can help you maintain
                accurate financial records and make informed business decisions.
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

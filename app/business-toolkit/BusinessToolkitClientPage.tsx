"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Building,
  Calculator,
  CheckSquare,
  DollarSign,
  UserCheck,
  Calendar,
  AlertTriangle,
  MessageCircle,
} from "lucide-react"

export default function BusinessToolkitClientPage() {
  const [activeTab, setActiveTab] = useState("business-structure")

  // Business Structure
  const [selections, setSelections] = useState({
    owners: null as string | null,
    risk: null as string | null,
    funding: null as string | null,
  })
  const [showResults, setShowResults] = useState(false)
  const [recommendation, setRecommendation] = useState("")
  const [structureToShow, setStructureToShow] = useState("")

  // Quarterly Tax
  const [taxValues, setTaxValues] = useState({
    annualIncome: "",
    filingStatus: "single",
  })
  const [taxResults, setTaxResults] = useState({
    selfEmploymentTax: 0,
    incomeTax: 0,
    quarterlyPayment: 0,
  })
  const [showTaxResults, setShowTaxResults] = useState(false)

  // Startup Checklist
  const [checklist, setChecklist] = useState({
    name: false,
    structure: false,
    register: false,
    ein: false,
    bank: false,
    licenses: false,
    taxes: false,
    insurance: false,
  })
  const [progress, setProgress] = useState({ completed: 0, total: 8 })

  // Break-Even Calculator
  const [breakEvenValues, setBreakEvenValues] = useState({
    fixedCosts: "",
    salesPrice: "",
    variableCost: "",
  })
  const [breakEvenUnits, setBreakEvenUnits] = useState(0)
  const [breakEvenError, setBreakEvenError] = useState("")
  const [showBreakEvenResults, setShowBreakEvenResults] = useState(false)

  // ITIN Eligibility
  const [itinAnswers, setItinAnswers] = useState({
    nonresident: null as string | null,
    residentSpouse: null as string | null,
    dependent: null as string | null,
    visaHolder: null as string | null,
  })
  const [itinEligible, setItinEligible] = useState<boolean | null>(null)
  const [showItinResults, setShowItinResults] = useState(false)

  // Handle Business Structure selection
  const handleStructureOption = (option: string, value: string) => {
    setSelections((prev) => ({ ...prev, [option]: value }))
  }

  // Analyze business structure
  const analyzeStructure = () => {
    if (selections.owners && selections.risk && selections.funding) {
      let recommendation = ""
      let structureToShow = ""

      if (selections.owners === "1") {
        if (selections.risk === "low") {
          recommendation = "Based on your selections, a Sole Proprietorship might be suitable for your situation."
          structureToShow = "sole"
        } else {
          recommendation = "Based on your selections, a Single-Member LLC might be suitable for your situation."
          structureToShow = "llc"
        }
      } else if (selections.owners === "2-5") {
        if (selections.funding === "investors") {
          recommendation =
            "Based on your selections, a Corporation (C-Corp or S-Corp) might be suitable for your situation."
          structureToShow = "corp"
        } else {
          recommendation = "Based on your selections, a Multi-Member LLC might be suitable for your situation."
          structureToShow = "llc"
        }
      } else {
        // 6+ owners
        recommendation = "Based on your selections, a Corporation (C-Corp) might be the best option for your situation."
        structureToShow = "corp"
      }

      setRecommendation(recommendation)
      setStructureToShow(structureToShow)
      setShowResults(true)
    }
  }

  // Calculate quarterly taxes
  const calculateTaxes = () => {
    const income = Number.parseFloat(taxValues.annualIncome) || 0
    const filingStatus = taxValues.filingStatus

    if (income <= 0) {
      return
    }

    // Calculate Self-Employment Tax (15.3% of 92.35% of net earnings)
    const selfEmploymentTaxableIncome = income * 0.9235
    const selfEmploymentTax = selfEmploymentTaxableIncome * 0.153

    // Basic income tax calculation (simplified bracket)
    let incomeTax = 0
    const taxableIncome = income - selfEmploymentTax / 2 // Half of SE tax is deductible

    if (filingStatus === "single") {
      if (taxableIncome <= 11000) {
        incomeTax = taxableIncome * 0.1
      } else if (taxableIncome <= 44725) {
        incomeTax = 1100 + (taxableIncome - 11000) * 0.12
      } else if (taxableIncome <= 95375) {
        incomeTax = 5147 + (taxableIncome - 44725) * 0.22
      } else if (taxableIncome <= 182100) {
        incomeTax = 16290 + (taxableIncome - 95375) * 0.24
      } else if (taxableIncome <= 231250) {
        incomeTax = 37104 + (taxableIncome - 182100) * 0.32
      } else if (taxableIncome <= 578125) {
        incomeTax = 52832 + (taxableIncome - 231250) * 0.35
      } else {
        incomeTax = 174238.25 + (taxableIncome - 578125) * 0.37
      }
    } else {
      // married
      if (taxableIncome <= 22000) {
        incomeTax = taxableIncome * 0.1
      } else if (taxableIncome <= 89450) {
        incomeTax = 2200 + (taxableIncome - 22000) * 0.12
      } else if (taxableIncome <= 190750) {
        incomeTax = 10294 + (taxableIncome - 89450) * 0.22
      } else if (taxableIncome <= 364200) {
        incomeTax = 32580 + (taxableIncome - 190750) * 0.24
      } else if (taxableIncome <= 462500) {
        incomeTax = 74208 + (taxableIncome - 364200) * 0.32
      } else if (taxableIncome <= 693750) {
        incomeTax = 105664 + (taxableIncome - 462500) * 0.35
      } else {
        incomeTax = 186601.75 + (taxableIncome - 693750) * 0.37
      }
    }

    const totalTax = selfEmploymentTax + incomeTax
    const quarterlyPayment = totalTax / 4

    setTaxResults({
      selfEmploymentTax,
      incomeTax,
      quarterlyPayment,
    })
    setShowTaxResults(true)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  // Update checklist and progress
  useEffect(() => {
    const total = Object.keys(checklist).length
    const completed = Object.values(checklist).filter(Boolean).length
    setProgress({ completed, total })
  }, [checklist])

  // Reset checklist
  const resetChecklist = () => {
    setChecklist({
      name: false,
      structure: false,
      register: false,
      ein: false,
      bank: false,
      licenses: false,
      taxes: false,
      insurance: false,
    })
  }

  // Calculate break-even point
  const calculateBreakEven = () => {
    const fixedCosts = Number.parseFloat(breakEvenValues.fixedCosts) || 0
    const salesPrice = Number.parseFloat(breakEvenValues.salesPrice) || 0
    const variableCost = Number.parseFloat(breakEvenValues.variableCost) || 0

    setBreakEvenError("")

    if (fixedCosts <= 0 || salesPrice <= 0 || variableCost <= 0) {
      setBreakEvenError("Please enter values greater than zero in all fields.")
      return
    }

    if (variableCost >= salesPrice) {
      setBreakEvenError("Variable cost per unit must be less than sales price per unit.")
      return
    }

    const breakEvenUnits = fixedCosts / (salesPrice - variableCost)
    setBreakEvenUnits(Math.ceil(breakEvenUnits))
    setShowBreakEvenResults(true)
  }

  // Check ITIN eligibility
  const checkItinEligibility = () => {
    const isEligible =
      itinAnswers.nonresident === "yes" ||
      itinAnswers.residentSpouse === "yes" ||
      itinAnswers.dependent === "yes" ||
      itinAnswers.visaHolder === "yes"

    setItinEligible(isEligible)
    setShowItinResults(true)
  }

  // Check if all ITIN questions have been answered
  const allItinQuestionsAnswered =
    itinAnswers.nonresident !== null &&
    itinAnswers.residentSpouse !== null &&
    itinAnswers.dependent !== null &&
    itinAnswers.visaHolder !== null

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">


        <div className="border shadow-lg rounded-xl overflow-hidden bg-white">
          <div className="tabs-container">
            {/* Tabs Navigation */}
            <div className="bg-white border-b border-gray-200 overflow-x-auto">
              <ul className="w-full flex justify-between bg-transparent h-auto p-0">
                <li
                  className={`p-4 cursor-pointer flex items-center whitespace-nowrap border-b-2 transition-all duration-300 text-sm md:text-base ${
                    activeTab === "business-structure"
                      ? "bg-blue-600 text-white border-b-blue-600"
                      : "border-transparent hover:text-blue-600"
                  }`}
                  onClick={() => setActiveTab("business-structure")}
                >
                  <Building className="mr-2 h-5 w-5" />
                  <span className="hidden md:inline">Business Structure</span>
                </li>
                <li
                  className={`p-4 cursor-pointer flex items-center whitespace-nowrap border-b-2 transition-all duration-300 text-sm md:text-base ${
                    activeTab === "quarterly-tax"
                      ? "bg-blue-600 text-white border-b-blue-600"
                      : "border-transparent hover:text-blue-600"
                  }`}
                  onClick={() => setActiveTab("quarterly-tax")}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  <span className="hidden md:inline">Quarterly Taxes</span>
                </li>
                <li
                  className={`p-4 cursor-pointer flex items-center whitespace-nowrap border-b-2 transition-all duration-300 text-sm md:text-base ${
                    activeTab === "startup-checklist"
                      ? "bg-blue-600 text-white border-b-blue-600"
                      : "border-transparent hover:text-blue-600"
                  }`}
                  onClick={() => setActiveTab("startup-checklist")}
                >
                  <CheckSquare className="mr-2 h-5 w-5" />
                  <span className="hidden md:inline">Startup Checklist</span>
                </li>
                <li
                  className={`p-4 cursor-pointer flex items-center whitespace-nowrap border-b-2 transition-all duration-300 text-sm md:text-base ${
                    activeTab === "break-even"
                      ? "bg-blue-600 text-white border-b-blue-600"
                      : "border-transparent hover:text-blue-600"
                  }`}
                  onClick={() => setActiveTab("break-even")}
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  <span className="hidden md:inline">Break-Even Point</span>
                </li>
                <li
                  className={`p-4 cursor-pointer flex items-center whitespace-nowrap border-b-2 transition-all duration-300 text-sm md:text-base ${
                    activeTab === "itin-eligibility"
                      ? "bg-blue-600 text-white border-b-blue-600"
                      : "border-transparent hover:text-blue-600"
                  }`}
                  onClick={() => setActiveTab("itin-eligibility")}
                >
                  <UserCheck className="mr-2 h-5 w-5" />
                  <span className="hidden md:inline">ITIN Eligibility</span>
                </li>
                <li
                  className={`p-4 cursor-pointer flex items-center whitespace-nowrap border-b-2 transition-all duration-300 text-sm md:text-base ${
                    activeTab === "tax-calendar"
                      ? "bg-blue-600 text-white border-b-blue-600"
                      : "border-transparent hover:text-blue-600"
                  }`}
                  onClick={() => setActiveTab("tax-calendar")}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  <span className="hidden md:inline">Tax Dates</span>
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="p-4 md:p-8 bg-white">
              {/* Business Structure Selector Tab */}
              {activeTab === "business-structure" && (
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">Business Structure</h2>
                  <p className="text-gray-600 mb-6">
                    Select your business characteristics to receive recommendations on the most suitable legal
                    structure.
                  </p>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="block text-sm font-medium mb-1">Estimated number of owners/partners</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className={`px-4 py-2 border rounded-md transition-all cursor-pointer ${
                            selections.owners === "1"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => handleStructureOption("owners", "1")}
                        >
                          Just me
                        </button>
                        <button
                          className={`px-4 py-2 border rounded-md transition-all cursor-pointer ${
                            selections.owners === "2-5"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => handleStructureOption("owners", "2-5")}
                        >
                          2-5 people
                        </button>
                        <button
                          className={`px-4 py-2 border rounded-md transition-all cursor-pointer ${
                            selections.owners === "6+"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => handleStructureOption("owners", "6+")}
                        >
                          6+ people
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium mb-1">Legal risk level for your business</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className={`px-4 py-2 border rounded-md transition-all cursor-pointer ${
                            selections.risk === "low"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => handleStructureOption("risk", "low")}
                        >
                          Low
                        </button>
                        <button
                          className={`px-4 py-2 border rounded-md transition-all cursor-pointer ${
                            selections.risk === "medium"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => handleStructureOption("risk", "medium")}
                        >
                          Medium
                        </button>
                        <button
                          className={`px-4 py-2 border rounded-md transition-all cursor-pointer ${
                            selections.risk === "high"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => handleStructureOption("risk", "high")}
                        >
                          High
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium mb-1">Funding goals</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className={`px-4 py-2 border rounded-md transition-all cursor-pointer ${
                            selections.funding === "self"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => handleStructureOption("funding", "self")}
                        >
                          Self-funded
                        </button>
                        <button
                          className={`px-4 py-2 border rounded-md transition-all cursor-pointer ${
                            selections.funding === "investors"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => handleStructureOption("funding", "investors")}
                        >
                          Seeking investors
                        </button>
                        <button
                          className={`px-4 py-2 border rounded-md transition-all cursor-pointer ${
                            selections.funding === "undecided"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => handleStructureOption("funding", "undecided")}
                        >
                          Not decided yet
                        </button>
                      </div>
                    </div>

                    <Button onClick={analyzeStructure} className="mt-4 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                      Analyze Options
                    </Button>

                    {showResults && (
                      <div className="mt-6">
                        <div className="p-6 bg-white border rounded-lg shadow-sm">
                          <h3 className="text-xl font-bold text-blue-800 mb-2">Recommendation:</h3>
                          <p className="mb-4">{recommendation}</p>

                          <div className="space-y-4">
                            {structureToShow === "llc" && (
                              <div className="border-t pt-4">
                                <h4 className="font-medium mb-2 text-blue-600">LLC (Limited Liability Company)</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-medium text-green-600 mb-1">Advantages:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      <li>Limited liability for owners</li>
                                      <li>Flexible taxation (pass-through taxation)</li>
                                      <li>Fewer formalities than a corporation</li>
                                      <li>Flexible management structure</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="font-medium text-red-600 mb-1">Disadvantages:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      <li>Potentially higher self-employment taxes</li>
                                      <li>Cannot issue stock to attract investors</li>
                                      <li>Regulations vary by state</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}

                            {structureToShow === "corp" && (
                              <div className="border-t pt-4">
                                <h4 className="font-medium mb-2 text-blue-600">Corporation (C-Corp / S-Corp)</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-medium text-green-600 mb-1">Advantages:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      <li>Limited liability for shareholders</li>
                                      <li>Can issue shares to attract investment</li>
                                      <li>Potential savings on self-employment taxes (S-Corp)</li>
                                      <li>Clear structure for multiple owners</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="font-medium text-red-600 mb-1">Disadvantages:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      <li>More compliance requirements and documentation</li>
                                      <li>Potential double taxation (C-Corp)</li>
                                      <li>Higher initial costs</li>
                                      <li>Less operational flexibility</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}

                            {structureToShow === "sole" && (
                              <div className="border-t pt-4">
                                <h4 className="font-medium mb-2 text-blue-600">Sole Proprietorship</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-medium text-green-600 mb-1">Advantages:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      <li>Simple and inexpensive to establish</li>
                                      <li>Complete control over the business</li>
                                      <li>Less paperwork and legal requirements</li>
                                      <li>Simplified tax filing</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="font-medium text-red-600 mb-1">Disadvantages:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      <li>Unlimited personal liability</li>
                                      <li>Difficulty obtaining financing</li>
                                      <li>No separation between personal and business finances</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Disclaimer Box */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-amber-500 mt-1 h-5 w-5" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium mb-1">Disclaimer:</p>
                          <p>
                            This tool provides general information and does not constitute professional advice. Consult
                            with an expert for recommendations specific to your situation.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Prompt */}
                    <div className="mt-4 text-center">
                      <Link
                        href="/contact"
                        className="inline-flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        <span>Need professional help? Contact us</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Quarterly Tax Estimator Tab */}
              {activeTab === "quarterly-tax" && (
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">Quarterly Taxes</h2>
                  <p className="text-gray-600">
                    Estimate your potential federal quarterly tax payments as a self-employed individual or small
                    business.
                  </p>

                  <div className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <label htmlFor="annual-income" className="block text-sm font-medium">
                        Estimated Annual Net Income (after expenses)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="annual-income"
                          type="number"
                          placeholder="50000"
                          className="pl-7"
                          value={taxValues.annualIncome}
                          onChange={(e) => setTaxValues({ ...taxValues, annualIncome: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="filing-status" className="block text-sm font-medium">
                        Filing Status
                      </label>
                      <select
                        id="filing-status"
                        className="w-full py-2 px-3 border border-gray-300 rounded-md"
                        value={taxValues.filingStatus}
                        onChange={(e) => setTaxValues({ ...taxValues, filingStatus: e.target.value })}
                      >
                        <option value="single">Single</option>
                        <option value="married">Married Filing Jointly</option>
                      </select>
                    </div>

                    <Button onClick={calculateTaxes} className="bg-blue-600 hover:bg-blue-700">
                      Calculate Quarterly Estimate
                    </Button>

                    {showTaxResults && (
                      <div className="p-6 bg-gray-50 border rounded-md">
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Self-Employment Tax (annual):</span>
                            <span className="font-medium">{formatCurrency(taxResults.selfEmploymentTax)}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Federal Income Tax (annual):</span>
                            <span className="font-medium">{formatCurrency(taxResults.incomeTax)}</span>
                          </div>
                          <div className="flex justify-between py-2 font-bold text-lg text-blue-800">
                            <span>Quarterly Payment Estimate:</span>
                            <span>{formatCurrency(taxResults.quarterlyPayment)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Disclaimer Box */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-amber-500 mt-1 h-5 w-5" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium mb-1">Disclaimer:</p>
                          <p>
                            This tool provides an estimate based on simplified federal rates. Actual taxes may vary.
                            Consult with a tax professional for accurate advice.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Prompt */}
                    <div className="mt-4 text-center">
                      <Link
                        href="/contact"
                        className="inline-flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        <span>Need professional help? Contact us</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Business Startup Checklist Tab */}
              {activeTab === "startup-checklist" && (
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">Startup Checklist</h2>
                  <p className="text-gray-600">
                    A general checklist of common steps when starting a business in the U.S.
                  </p>

                  <div className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <label htmlFor="select-state" className="block text-sm font-medium">
                        Select a State
                      </label>
                      <select id="select-state" className="w-full py-2 px-3 border border-gray-300 rounded-md">
                        <option value="general">General (All States)</option>
                        <option value="florida">Florida</option>
                        <option value="texas">Texas</option>
                        <option value="california">California</option>
                        <option value="newyork">New York</option>
                      </select>
                    </div>

                    <div className="bg-gray-50 rounded-md p-4">
                      <div className="mb-3 flex justify-between items-center">
                        <h3 className="font-medium text-blue-800">Checklist</h3>
                        <span className="text-sm text-gray-500">
                          <span>{progress.completed}</span>/<span>{progress.total}</span> completed
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                        ></div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-start space-x-3 py-2 border-b border-gray-100">
                          <input
                            type="checkbox"
                            id="checklist-name"
                            className="mt-1"
                            checked={checklist.name}
                            onChange={(e) => setChecklist({ ...checklist, name: e.target.checked })}
                          />
                          <label htmlFor="checklist-name" className="font-normal cursor-pointer">
                            Define Business Name and Brand
                          </label>
                        </div>
                        <div className="flex items-start space-x-3 py-2 border-b border-gray-100">
                          <input
                            type="checkbox"
                            id="checklist-structure"
                            className="mt-1"
                            checked={checklist.structure}
                            onChange={(e) => setChecklist({ ...checklist, structure: e.target.checked })}
                          />
                          <label htmlFor="checklist-structure" className="font-normal cursor-pointer">
                            Choose Legal Structure (LLC, Corp, etc.)
                          </label>
                        </div>
                        <div className="flex items-start space-x-3 py-2 border-b border-gray-100">
                          <input
                            type="checkbox"
                            id="checklist-register"
                            className="mt-1"
                            checked={checklist.register}
                            onChange={(e) => setChecklist({ ...checklist, register: e.target.checked })}
                          />
                          <label htmlFor="checklist-register" className="font-normal cursor-pointer">
                            Register Business with the State
                          </label>
                        </div>
                        <div className="flex items-start space-x-3 py-2 border-b border-gray-100">
                          <input
                            type="checkbox"
                            id="checklist-ein"
                            className="mt-1"
                            checked={checklist.ein}
                            onChange={(e) => setChecklist({ ...checklist, ein: e.target.checked })}
                          />
                          <label htmlFor="checklist-ein" className="font-normal cursor-pointer">
                            Obtain Employer Identification Number (EIN) from IRS
                          </label>
                        </div>
                        <div className="flex items-start space-x-3 py-2 border-b border-gray-100">
                          <input
                            type="checkbox"
                            id="checklist-bank"
                            className="mt-1"
                            checked={checklist.bank}
                            onChange={(e) => setChecklist({ ...checklist, bank: e.target.checked })}
                          />
                          <label htmlFor="checklist-bank" className="font-normal cursor-pointer">
                            Open Business Bank Account
                          </label>
                        </div>
                        <div className="flex items-start space-x-3 py-2 border-b border-gray-100">
                          <input
                            type="checkbox"
                            id="checklist-licenses"
                            className="mt-1"
                            checked={checklist.licenses}
                            onChange={(e) => setChecklist({ ...checklist, licenses: e.target.checked })}
                          />
                          <label htmlFor="checklist-licenses" className="font-normal cursor-pointer">
                            Research Licenses and Permits (Federal, State, Local)
                          </label>
                        </div>
                        <div className="flex items-start space-x-3 py-2 border-b border-gray-100">
                          <input
                            type="checkbox"
                            id="checklist-taxes"
                            className="mt-1"
                            checked={checklist.taxes}
                            onChange={(e) => setChecklist({ ...checklist, taxes: e.target.checked })}
                          />
                          <label htmlFor="checklist-taxes" className="font-normal cursor-pointer">
                            Understand Tax Obligations (Sales tax, payroll, etc.)
                          </label>
                        </div>
                        <div className="flex items-start space-x-3 py-2 border-b border-gray-100">
                          <input
                            type="checkbox"
                            id="checklist-insurance"
                            className="mt-1"
                            checked={checklist.insurance}
                            onChange={(e) => setChecklist({ ...checklist, insurance: e.target.checked })}
                          />
                          <label htmlFor="checklist-insurance" className="font-normal cursor-pointer">
                            Consider Business Insurance
                          </label>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={resetChecklist}
                        className="mt-4 border-gray-300 text-gray-600 hover:text-blue-800"
                      >
                        Reset List
                      </Button>
                    </div>

                    {/* Disclaimer Box */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-amber-500 mt-1 h-5 w-5" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium mb-1">Disclaimer:</p>
                          <p>
                            This list is general and may not include all requirements specific to your location or
                            industry. Consult with professionals for specific guidance.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Prompt */}
                    <div className="mt-4 text-center">
                      <Link
                        href="/contact"
                        className="inline-flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        <span>Need professional help? Contact us</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Break Even Calculator Tab */}
              {activeTab === "break-even" && (
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">Break-Even Point</h2>
                  <p className="text-gray-600">Calculate how many units you need to sell to cover all your costs.</p>

                  <div className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <label htmlFor="fixed-costs" className="block text-sm font-medium">
                        Total Monthly Fixed Costs ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="fixed-costs"
                          type="number"
                          placeholder="3000"
                          className="pl-7"
                          value={breakEvenValues.fixedCosts}
                          onChange={(e) => setBreakEvenValues({ ...breakEvenValues, fixedCosts: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="sales-price" className="block text-sm font-medium">
                        Sales Price per Unit ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="sales-price"
                          type="number"
                          placeholder="50"
                          className="pl-7"
                          value={breakEvenValues.salesPrice}
                          onChange={(e) => setBreakEvenValues({ ...breakEvenValues, salesPrice: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="variable-cost" className="block text-sm font-medium">
                        Variable Cost per Unit ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="variable-cost"
                          type="number"
                          placeholder="30"
                          className="pl-7"
                          value={breakEvenValues.variableCost}
                          onChange={(e) => setBreakEvenValues({ ...breakEvenValues, variableCost: e.target.value })}
                        />
                      </div>
                    </div>

                    {breakEvenError && <div className="text-red-500 text-sm">{breakEvenError}</div>}

                    <Button onClick={calculateBreakEven} className="bg-blue-600 hover:bg-blue-700">
                      Calculate Break-Even Point
                    </Button>

                    {showBreakEvenResults && (
                      <div className="p-6 bg-gray-50 border-l-4 border-l-blue-600 text-center">
                        <h3 className="font-medium text-lg text-gray-600 mb-2">You need to sell</h3>
                        <p className="text-3xl font-bold text-blue-800">{breakEvenUnits} units</p>
                        <p className="text-gray-600 mt-2">per month to reach your break-even point.</p>
                      </div>
                    )}

                    {/* Disclaimer Box */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-amber-500 mt-1 h-5 w-5" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium mb-1">Disclaimer:</p>
                          <p>
                            This calculation is a basic approximation. The actual break-even point may vary depending on
                            additional factors. Consult with a financial professional for a detailed analysis.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Prompt */}
                    <div className="mt-4 text-center">
                      <Link
                        href="/contact"
                        className="inline-flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        <span>Need professional help? Contact us</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* ITIN Eligibility Checker Tab */}
              {activeTab === "itin-eligibility" && (
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">ITIN Eligibility</h2>
                  <p className="text-gray-600">
                    Check if you might need and be eligible for an Individual Taxpayer Identification Number (ITIN).
                  </p>

                  <div className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">
                        Are you a nonresident alien who needs to file a U.S. tax return (e.g., for U.S. source income)?
                      </h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="nonresident-yes"
                            name="nonresident"
                            value="yes"
                            checked={itinAnswers.nonresident === "yes"}
                            onChange={() => setItinAnswers({ ...itinAnswers, nonresident: "yes" })}
                          />
                          <label htmlFor="nonresident-yes">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="nonresident-no"
                            name="nonresident"
                            value="no"
                            checked={itinAnswers.nonresident === "no"}
                            onChange={() => setItinAnswers({ ...itinAnswers, nonresident: "no" })}
                          />
                          <label htmlFor="nonresident-no">No</label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">
                        Are you a resident alien (based on days of presence) filing a joint return with a U.S.
                        citizen/resident spouse?
                      </h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="resident-spouse-yes"
                            name="resident-spouse"
                            value="yes"
                            checked={itinAnswers.residentSpouse === "yes"}
                            onChange={() => setItinAnswers({ ...itinAnswers, residentSpouse: "yes" })}
                          />
                          <label htmlFor="resident-spouse-yes">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="resident-spouse-no"
                            name="resident-spouse"
                            value="no"
                            checked={itinAnswers.residentSpouse === "no"}
                            onChange={() => setItinAnswers({ ...itinAnswers, residentSpouse: "no" })}
                          />
                          <label htmlFor="resident-spouse-no">No</label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Are you a dependent or spouse of a U.S. citizen/resident?</h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="dependent-yes"
                            name="dependent"
                            value="yes"
                            checked={itinAnswers.dependent === "yes"}
                            onChange={() => setItinAnswers({ ...itinAnswers, dependent: "yes" })}
                          />
                          <label htmlFor="dependent-yes">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="dependent-no"
                            name="dependent"
                            value="no"
                            checked={itinAnswers.dependent === "no"}
                            onChange={() => setItinAnswers({ ...itinAnswers, dependent: "no" })}
                          />
                          <label htmlFor="dependent-no">No</label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">
                        Are you a dependent or spouse of a nonimmigrant visa holder?
                      </h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="visa-holder-yes"
                            name="visa-holder"
                            value="yes"
                            checked={itinAnswers.visaHolder === "yes"}
                            onChange={() => setItinAnswers({ ...itinAnswers, visaHolder: "yes" })}
                          />
                          <label htmlFor="visa-holder-yes">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="visa-holder-no"
                            name="visa-holder"
                            value="no"
                            checked={itinAnswers.visaHolder === "no"}
                            onChange={() => setItinAnswers({ ...itinAnswers, visaHolder: "no" })}
                          />
                          <label htmlFor="visa-holder-no">No</label>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={checkItinEligibility}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!allItinQuestionsAnswered}
                    >
                      Check Potential Eligibility
                    </Button>

                    {showItinResults && (
                      <div
                        className={`p-6 border rounded-md ${itinEligible ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}
                      >
                        <p className={`text-lg font-medium ${itinEligible ? "text-green-800" : "text-amber-800"}`}>
                          {itinEligible
                            ? "Based on your responses, you likely need/are eligible for an ITIN."
                            : "Based on your responses, you may not need/be eligible for an ITIN. Consult with a professional."}
                        </p>
                      </div>
                    )}

                    {/* Disclaimer Box */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-amber-500 mt-1 h-5 w-5" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium mb-1">Disclaimer:</p>
                          <p>
                            This tool serves as a general guide. ITIN eligibility may depend on additional factors.
                            Consult with a tax professional for a complete assessment.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Prompt */}
                    <div className="mt-4 text-center">
                      <Link
                        href="/contact"
                        className="inline-flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        <span>Need professional help? Contact us</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Tax Calendar Tab */}
              {activeTab === "tax-calendar" && (
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">Tax Dates</h2>
                  <p className="text-gray-600">Important federal tax deadlines (subject to change).</p>

                  <div className="space-y-6 mt-6">
                    <div className="grid gap-4">
                      <div className="border shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50">
                          <div className="font-bold text-blue-600 px-4 py-2 bg-white rounded-md shadow-sm md:mr-4 md:w-32 text-center">
                            January 31
                          </div>
                          <div className="mt-2 md:mt-0 text-gray-600">
                            Deadline to send W-2 forms to employees and 1099-NEC to contractors.
                          </div>
                        </div>
                      </div>

                      <div className="border shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50">
                          <div className="font-bold text-blue-600 px-4 py-2 bg-white rounded-md shadow-sm md:mr-4 md:w-32 text-center">
                            March 15
                          </div>
                          <div className="mt-2 md:mt-0 text-gray-600">
                            Deadline for S-Corps (Form 1120-S) and Partnerships (Form 1065) tax returns (for calendar
                            year filers).
                          </div>
                        </div>
                      </div>

                      <div className="border shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50">
                          <div className="font-bold text-blue-600 px-4 py-2 bg-white rounded-md shadow-sm md:mr-4 md:w-32 text-center">
                            April 15
                          </div>
                          <div className="mt-2 md:mt-0 text-gray-600">
                            Deadline for personal tax returns (Form 1040) and C-Corps (Form 1120). Deadline for 1st
                            estimated tax payment.
                          </div>
                        </div>
                      </div>

                      <div className="border shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50">
                          <div className="font-bold text-blue-600 px-4 py-2 bg-white rounded-md shadow-sm md:mr-4 md:w-32 text-center">
                            June 15
                          </div>
                          <div className="mt-2 md:mt-0 text-gray-600">Deadline for 2nd estimated tax payment.</div>
                        </div>
                      </div>

                      <div className="border shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50">
                          <div className="font-bold text-blue-600 px-4 py-2 bg-white rounded-md shadow-sm md:mr-4 md:w-32 text-center">
                            September 15
                          </div>
                          <div className="mt-2 md:mt-0 text-gray-600">Deadline for 3rd estimated tax payment.</div>
                        </div>
                      </div>

                      <div className="border shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50">
                          <div className="font-bold text-blue-600 px-4 py-2 bg-white rounded-md shadow-sm md:mr-4 md:w-32 text-center">
                            October 15
                          </div>
                          <div className="mt-2 md:mt-0 text-gray-600">
                            Extended deadline for personal tax returns (if extension was filed).
                          </div>
                        </div>
                      </div>

                      <div className="border shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50">
                          <div className="font-bold text-blue-600 px-4 py-2 bg-white rounded-md shadow-sm md:mr-4 md:w-32 text-center">
                            January 15
                          </div>
                          <div className="mt-2 md:mt-0 text-gray-600">
                            (of following year): Deadline for 4th estimated tax payment.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer Box */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-amber-500 mt-1 h-5 w-5" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium mb-1">Disclaimer:</p>
                          <p>
                            Dates may vary if they fall on weekends or holidays. Always verify current dates on the IRS
                            website.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Prompt */}
                    <div className="mt-4 text-center">
                      <Link
                        href="/contact"
                        className="inline-flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        <span>Need professional help? Contact us</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
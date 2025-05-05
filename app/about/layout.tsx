import type React from "react"
import type {Metadata}
from "next"
import {Phone, Mail, Award, Building} from "lucide-react"

export const metadata: Metadata = {
    title: "About Us | Quintero and Associates",
    description: "Learn about our team and our mission to provide exceptional financial services"
}

export default function AboutLayout({children} : {
    children : React.ReactNode
}) {
    return (
        <div className="flex flex-col">
          <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white bg-[url('/bg-internals.webp')] bg-cover bg-center bg-blend-multiply relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-800/70"></div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="mx-auto max-w-3xl text-center">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-6 mx-auto">
                          <Award className="mr-1 h-4 w-4" /> Established 2005
                      </span>
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-md">About Us</h1>
                      <p className="mt-4 text-xl text-blue-100">Learn about our team and our mission to provide exceptional financial services</p>
                      <div className="mt-8 flex justify-center space-x-4">
                        <a href="/contact" className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 border border-white/30">
                            <Building className="mr-2 h-4 w-4"/>
                            <span>Contact Us</span>
                        </a>
                        <a href="tel:+13055294929" className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 border border-white/30">
                            <Phone className="mr-2 h-4 w-4"/>
                            <span>Call Us</span>
                        </a>
                        <a href="mailto:info@quinteroandassociates.com" className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 border border-white/30">
                              <Mail className="mr-2 h-4 w-4"/>
                              <span>Email Us</span>
                          </a>
                      </div>
                  </div>
              </div>
          </section>
          {children} 
        </div>
    )
}

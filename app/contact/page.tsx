"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData)

    // Show success toast
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="rounded-xl border border-blue-100 bg-white text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-blue-800 font-medium">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm hover:shadow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-blue-800 font-medium">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm hover:shadow"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-blue-800 font-medium">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                        className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm hover:shadow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-blue-800 font-medium">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm hover:shadow"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-blue-800 font-medium">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      className="min-h-32 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm hover:shadow"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-8 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">Contact Information</h3>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start group">
                    <div className="mr-4 p-3 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Address</h4>
                      <address className="not-italic text-gray-600 mt-1">
                        Postal Address:
                        <br />
                        PO Box 521234
                        <br />
                        Miami, FL 33152
                      </address>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="mr-4 p-3 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Phone</h4>
                      <p className="text-gray-600 mt-1">
                        <a href="tel:+13055294929" className="hover:text-blue-600 transition-colors">
                          (+1) 305-529-4929
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="mr-4 p-3 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Email</h4>
                      <p className="text-gray-600 mt-1">
                        <a href="mailto:info@quinteroandassociates.com" className="hover:text-blue-600 transition-colors">
                          info@quinteroandassociates.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="mr-4 p-3 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Business Hours</h4>
                      <p className="text-gray-600 mt-1">
                        Monday - Friday: 8:00 - 17:00
                        <br />
                        Saturday: 10:00 - 14:00
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">Schedule a Consultation</h3>
                <p className="mt-2 text-blue-100">
                  Prefer to speak with us directly? Schedule a free 30-minute consultation.
                </p>
                <Button className="mt-6 w-full bg-white text-blue-700 hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg border-0">
                  <Link href="/appoiments" className="flex items-center justify-center w-full">
                    <Clock className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <div className="rounded-xl overflow-hidden h-96 shadow-lg border border-blue-100">
            <iframe 
              src="https://maps.google.com/maps?width=1920&amp;height=400&amp;hl=en&amp;q=Miami, FL 33152&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
              height="400" 
              width="100%" 
              style={{border:0}} 
              allowFullScreen
              title="Quintero & Associates Location"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

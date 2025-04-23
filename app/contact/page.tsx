"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
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
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-500">We'd love to hear from you. Get in touch with us.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <address className="not-italic text-gray-600">
                        123 Main Street
                        <br />
                        Suite 100
                        <br />
                        Miami, FL 33101
                      </address>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="mr-3 h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600">
                        <a href="tel:+1-305-555-0123" className="hover:text-blue-600">
                          (305) 555-0123
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="mr-3 h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">
                        <a href="mailto:info@quinteroandassociates.com" className="hover:text-blue-600">
                          info@quinteroandassociates.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="mr-3 h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Business Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold">Schedule a Consultation</h3>
                <p className="mt-2 text-gray-600">
                  Prefer to speak with us directly? Schedule a free 30-minute consultation.
                </p>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">Book Appointment</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <div className="rounded-lg overflow-hidden h-96">
            {/* Replace with actual Google Maps embed */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Google Maps Embed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

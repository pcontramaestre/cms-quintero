import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Users, Clock, ChevronRight, Star, Building, Briefcase, GraduationCap, Heart } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Quintero and Associates",
  description: "Learn about our team and our mission to provide exceptional financial services",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col animate-fade-in-1s">
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-6 mx-auto">
              <Award className="mr-1 h-4 w-4" /> Established 2005
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              About Quintero & Associates
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              A team of dedicated professionals committed to your financial success
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section> */}
      
      {/* Our Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
                <Building className="mr-1 h-4 w-4" /> Our Story
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                The Quintero & Associates Difference
              </h2>
              <div className="mt-6 space-y-6 text-lg text-gray-600">
                <p className="leading-relaxed">
                  Quintero & Associates, Inc. is a premier firm offering comprehensive bookkeeping, business management, and payroll services. We specialize in business formation, tax planning, and ITIN (Individual Taxpayer Identification Number) acquisition. Our team of professionals is dedicated to providing personalized solutions tailored to the unique needs of each client, ensuring compliance with legal and financial regulations while optimizing business operations.
                </p>
                <p className="leading-relaxed">
                  Beyond our core services, we provide valuable educational resources, including courses and an informative blog, to empower clients with knowledge about financial management and tax planning. Our commitment to transparency and support is reflected in our accessible contact information, connections to essential government resources like the IRS and Florida Sunbiz, and our comprehensive newsletter, terms, and privacy policy.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: "Years of Experience", value: "18+" },
                    { label: "Satisfied Clients", value: "2,500+" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-blue-700">{stat.value}</p>
                      <p className="text-sm text-blue-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-xl opacity-30 blur-xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300 border border-blue-100">
                <Image
                  src="/about3.webp"
                  alt="Quintero & Associates team"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16 pt-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4 mx-auto">
              <Heart className="mr-1 h-4 w-4" /> What Drives Us
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Our Core Values</h2>
            <p className="mt-4 text-xl text-gray-600">The principles that guide our work every day</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <CheckCircle className="h-12 w-12 text-blue-600" />,
                title: "Integrity",
                description: "We uphold the highest ethical standards in all our interactions.",
              },
              {
                icon: <Award className="h-12 w-12 text-blue-600" />,
                title: "Excellence",
                description: "We strive for excellence in every service we provide.",
              },
              {
                icon: <Users className="h-12 w-12 text-blue-600" />,
                title: "Collaboration",
                description: "We work closely with our clients to achieve their goals.",
              },
              {
                icon: <Clock className="h-12 w-12 text-blue-600" />,
                title: "Timeliness",
                description: "We respect our clients' time and deliver on schedule.",
              },
            ].map((value, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4 mx-auto">
              <Users className="mr-1 h-4 w-4" /> Meet Our Experts
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Our Leadership Team</h2>
            <p className="mt-4 text-xl text-gray-600">
              Experienced professionals dedicated to your financial success
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Yrwin Quintero",
                title: "Founder & CEO",
                bio: "With over 20 years of experience in accounting and tax services, Yrwin leads our team with expertise and vision.",
                image: "/avatar-male.webp"
              },
              {
                name: "David Rodriguez",
                title: "Tax Director",
                bio: "David specializes in complex tax planning for businesses and high-net-worth individuals.",
                image: "/avatar-male.webp"
              },
              {
                name: "Jennifer Lee",
                title: "Accounting Manager",
                bio: "Jennifer oversees our accounting services, ensuring accuracy and compliance for all clients.",
                image: "/avatar-female.webp"
              },
              {
                name: "Michael Johnson",
                title: "Business Advisor",
                bio: "Michael helps clients develop strategic plans for business growth and success.",
                image: "/avatar-male.webp"
              },
              {
                name: "Pablo Contramaestre",
                title: "Developer",
                bio: "Pablo is a developer who ensures our clients meet all regulatory requirements and industry standards.",
                image: "/avatar-male.webp"
              },
              {
                name: "Robert Garcia",
                title: "Client Relations",
                bio: "Robert is dedicated to providing exceptional service and building strong client relationships.",
                image: "/avatar-male.webp"
              },
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
                  <div className="p-6 text-center">
                    <div className="relative mx-auto mb-6">
                      <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-300"></div>
                      <div className="h-32 w-32 rounded-full bg-blue-50 border-2 border-blue-100 relative mx-auto overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={160}
                          height={160}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.title}</p>
                    <div className="h-px w-16 bg-blue-100 my-4 mx-auto"></div>
                    <p className="mt-4 text-gray-600 leading-relaxed">{member.bio}</p>
                    <div className="mt-6 flex justify-center space-x-3">
                      <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22.23 0H1.77C.8 0 0 .8 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76c-1.15 0-2.08-.93-2.08-2.08 0-1.15.93-2.08 2.08-2.08 1.15 0 2.08.93 2.08 2.08 0 1.15-.93 2.08-2.08 2.08zm14.63 12.34h-3.62v-5.28c0-1.35-.03-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99v5.38H8.8V9.24h3.48v1.6h.05c.48-.91 1.66-1.88 3.42-1.88 3.65 0 4.33 2.4 4.33 5.53v5.61z" />
                        </svg>
                      </a>
                      <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
                Ready to work with our expert team?
              </h2>
              <p className="mt-6 text-xl text-blue-100">
                Contact us today to schedule a consultation and discover how we can help you achieve your financial goals
              </p>
              <div className="mt-10">
                <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg">
                  Contact Us <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

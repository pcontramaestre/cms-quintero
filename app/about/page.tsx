import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Users, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Quintero and Associates",
  description: "Learn about our team and our mission to provide exceptional financial services",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">More details our Quintero & Associates</h2>
              <div className="mt-6 space-y-6 text-lg text-gray-600">
                <p>
                  Quintero & Associates, Inc. is a firm that offers bookkeeping, business management, and payroll services. They also help to start businesses, with taxes, and to get an ITIN (Individual Taxpayer Identification Number). Their team of professionals is dedicated to providing personalized solutions tailored to the unique needs of each client, ensuring compliance with legal and financial regulations while optimizing business operations.
                </p>
                <p>
                In addition, Quintero & Associates provides educational resources, including courses and a blog, to help clients with financial management and tax planning. Their website offers contact information, links to government resources like the IRS and Florida Sunbiz, and access to their newsletter, terms, and privacy policy, ensuring transparency and support for their clients.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/about3.webp"
                alt="Quintero & Associates team"
                width={600}
                height={400}
                // className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Values</h2>
            <p className="mt-4 text-xl text-gray-500">The principles that guide our work every day</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
                title: "Integrity",
                description: "We uphold the highest ethical standards in all our interactions.",
              },
              {
                icon: <Award className="h-10 w-10 text-blue-600" />,
                title: "Excellence",
                description: "We strive for excellence in every service we provide.",
              },
              {
                icon: <Users className="h-10 w-10 text-blue-600" />,
                title: "Collaboration",
                description: "We work closely with our clients to achieve their goals.",
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-600" />,
                title: "Timeliness",
                description: "We respect our clients' time and deliver on schedule.",
              },
            ].map((value, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  {value.icon}
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Team</h2>
            <p className="mt-4 text-xl text-gray-500">
              Meet the experienced professionals behind Quintero & Associates
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Yrwin Quintero",
                title: "Founder & CEO",
                bio: "With over 20 years of experience in accounting and tax services, Yrwin leads our team with expertise and vision.",
              },
              {
                name: "David Rodriguez",
                title: "Tax Director",
                bio: "David specializes in complex tax planning for businesses and high-net-worth individuals.",
              },
              {
                name: "Jennifer Lee",
                title: "Accounting Manager",
                bio: "Jennifer oversees our accounting services, ensuring accuracy and compliance for all clients.",
              },
              {
                name: "Michael Johnson",
                title: "Business Advisor",
                bio: "Michael helps clients develop strategic plans for business growth and success.",
              },
              {
                name: "Pablo Contramaestre",
                title: "Developer",
                bio: "Pablo is a developer who ensures our clients meet all regulatory requirements and industry standards.",
              },
              {
                name: "Robert Garcia",
                title: "Client Relations",
                bio: "Robert is dedicated to providing exceptional service and building strong client relationships.",
              },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="h-40 w-40 rounded-full bg-gray-200">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    alt={member.name}
                    width={160}
                    height={160}
                    className="rounded-full"
                  />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">{member.name}</h3>
                <p className="text-blue-600">{member.title}</p>
                <p className="mt-2 text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

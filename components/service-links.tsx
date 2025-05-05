import Link from "next/link"
import { TrendingUp, FileText, Calculator, Shield, ChevronRight } from "lucide-react"

interface ServiceLinkProps {
  className?: string
}

export function ServiceLinks({ className }: ServiceLinkProps) {
  const services = [
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: "Business Services",
      link: "/services/bussines",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Tax Services",
      link: "/services/taxes",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: <Calculator className="h-6 w-6 text-blue-600" />,
      title: "Accounting",
      link: "/services/accounting",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Compliance",
      link: "/services/compliance",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: "Get your ITIN",
      link: "/services/getitin",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
  ]

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${className}`}>
      {services.map((service, index) => (
        <Link
          key={index}
          href={service.link}
          className={`flex items-center p-4 rounded-xl ${service.bgColor} border border-blue-100 shadow-sm ${service.hoverColor} hover:shadow-md transition-all duration-300 hover:-translate-y-1 group`}
        >
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm group-hover:shadow transition-all duration-300">
            {service.icon}
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-gray-900">{service.title}</h3>
          </div>
          <ChevronRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      ))}
    </div>
  )
}

// Versión alternativa con diseño de botones
export function ServiceButtons({ className }: ServiceLinkProps) {
  const services = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Business Services",
      link: "/services/bussines",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Tax Services",
      link: "/services/taxes",
    },
    {
      icon: <Calculator className="h-5 w-5" />,
      title: "Accounting",
      link: "/services/accounting",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Compliance",
      link: "/services/compliance",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Get your ITIN",
      link: "/services/getitin",
    },
  ]

  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {services.map((service, index) => (
        <Link
          key={index}
          href={service.link}
          className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 group"
        >
          <span className="mr-2">{service.icon}</span>
          {service.title}
          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      ))}
    </div>
  )
}

// Versión con tarjetas compactas
export function ServiceCards({ className }: ServiceLinkProps) {
  const services = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Business Services",
      link: "/services/bussines",
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Tax Services",
      link: "/services/taxes",
    },
    {
      icon: <Calculator className="h-8 w-8 text-blue-600" />,
      title: "Accounting",
      link: "/services/accounting",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Compliance",
      link: "/services/compliance",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Get your ITIN",
      link: "/services/getitin",
    },
  ]

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${className}`}>
      {services.map((service, index) => (
        <Link
          key={index}
          href={service.link}
          className="flex flex-col items-center p-6 bg-white rounded-xl border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-center"
        >
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
            {service.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
          <div className="mt-4 text-blue-600 flex items-center">
            <span className="text-sm">Ver más</span>
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </Link>
      ))}
    </div>
  )
}

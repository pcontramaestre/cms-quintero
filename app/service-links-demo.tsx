import { ServiceLinks, ServiceButtons, ServiceCards } from "@/components/service-links"

export default function ServiceLinksDemo() {
  return (
    <div className="flex flex-col animate-fade-in-1s">
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Explore nuestros servicios financieros y empresariales especializados
            </p>
          </div>
          
          <div className="space-y-16">
            {/* Opción 1: Enlaces horizontales */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">Opción 1: Enlaces Modernos</h3>
              <ServiceLinks />
            </div>
            
            {/* Opción 2: Botones */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">Opción 2: Botones</h3>
              <ServiceButtons />
            </div>
            
            {/* Opción 3: Tarjetas */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">Opción 3: Tarjetas</h3>
              <ServiceCards />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

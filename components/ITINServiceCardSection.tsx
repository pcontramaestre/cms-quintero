import Image from "next/image";
// Importa Link si necesitas que alguno de los enlaces sea interno de Next.js.
// Para enlaces externos (target="_blank"), <a> es suficiente.
// import Link from "next/link";
import { ArrowRight } from "lucide-react"; // Asegúrate de tener instalado lucide-react

// --- Data para las 3 Tarjetas de Servicio ITIN ---
// Define los datos para cada tarjeta en un array.
const itinServiceCards = [
  {
    imageSrc: "https://quinteroandassociates.com/assets/img/itin/itin.webp",
    imageAlt: "We complete your Form W-7",
    title: "We complete your Form W-7",
    description: "We only prepare the Form W-7 for you.",
    details: [
      { summary: "What should I do?", content: ["You must complete the respective form on our website."] },
      { summary: "What does Quintero and his team do?", content: ["We will prepare the Form W-7 with the information you provide us on the application form."] },
      { summary: "What do I receive?", content: ["We will send you the completed W-7 form via email in PDF format so that you can print it out and send it to the IRS.", "Additionally, we will send you another attached file with instructions in your language on which documents you should send and to which IRS office you should send your application."] },
      { summary: "If I choose this option, what is the cost?", content: ["$20"] },
    ],
    buttonText: "Get Started",
    buttonLink: "https://quinteroandassociates.com/services/itin/itin-application",
    // Los atributos data-* se pasan como un objeto
    buttonData: { "data-language": "en-US", "data-service-id": "1", "data-service-type": "ITIN Application", "data-service-for": "Individual", "data-offer": "We complete your Form W-7", "data-price": "20" },
  },
  {
    imageSrc: "https://quinteroandassociates.com/assets/img/itin/itin.webp",
    imageAlt: "Your ITIN with Tax Return included",
    title: "Your ITIN with Tax Return included",
    description: "We prepare your Tax Return, your Form W-7, and the \"Certificate of Accuracy\" and submit your application.",
    details: [
        { summary: "What should I do?", content: ["You must complete the respective form on our website.", "Likewise, you must provide us with the required documentation for your application."] },
        { summary: "What does Quintero and his team do?", content: ["We will prepare your individual Tax Return and review it with you.", "We will prepare the Form W-7 with the information you provide us on the application form.", "We will prepare a \"Certificate of Accuracy\" once the required documentation you have provided to us has been reviewed and accepted.", "We will submit your application to the IRS for processing, as well as a copy of the required documentation that has been reviewed and accepted."] },
        { summary: "What do I receive?", content: ["Proof of sending your application to the IRS.", "Access to our platform so you can directly monitor the status of your application 24/7.", "Continuous Assistance and Support 24/7, in your language, through our online chat."] },
        { summary: "If I choose this option, what is the cost?", content: ["$150"] },
    ],
    buttonText: "Get Started",
    buttonLink: "https://quinteroandassociates.com/services/itin/itin-application",
    buttonData: { "data-language": "en-US", "data-service-id": "3", "data-service-type": "ITIN Application", "data-service-for": "Individual", "data-offer": "Your ITIN with Tax Return included", "data-price": "150" },
  },
   {
    imageSrc: "https://quinteroandassociates.com/assets/img/itin/itin.webp",
    imageAlt: "Your ITIN with the formation of a LLC included",
    title: "Your ITIN with the formation of a LLC included",
    description: "We prepare your U.S. corporation (LLC) formation documents, the Form SS-4, your Form W-7, and “Certificate of Accuracy” and submit your application.",
    details: [
        { summary: "What should I do?", content: ["You must complete the respective forms on our website.", "Likewise, you must provide us with the required documentation for your application."] },
        { summary: "What does Quintero and his team do?", content: ["We will prepare the formation documents for your US company (LLC) with the information you provide us in the respective form.", "We will prepare the Form SS-4 with the information you provide us on the application form.", "We will prepare the Form W-7 with the information you provide us on the application form.", "We will prepare a \"Certificate of Accuracy\" once the required documentation you have provided to us has been reviewed and accepted.", "We will submit your application to the IRS for processing, as well as a copy of the required documentation that has been reviewed and accepted."] },
        { summary: "What do I receive?", content: ["Articles of Organization for your US company (LLC) properly filed.", "Proof of sending your application to the IRS (both the EIN and the ITIN).", "Access to our platform so you can directly monitor the status of your application 24/7.", "Continuous Assistance and Support 24/7, in your language, through our online chat."] },
        { summary: "If I choose this option, what is the cost?", content: ["$400"] },
    ],
    buttonText: "Get Started",
    buttonLink: "https://quinteroandassociates.com/services/itin/itin-application",
    buttonData: { "data-language": "en-US", "data-service-id": "4", "data-service-type": "ITIN Application", "data-service-for": "Individual", "data-offer": "Your ITIN with the formation of a LLC included", "data-price": "400" },
  },
];
// --- Fin Data ---


// Componente funcional para renderizar la sección de tarjetas
export default function ITINServiceCardSection() {
  return (
    // Sección principal - mantén la clase custom si tienes estilos globales asociados
    <section className="pb-12 get-itin">
      {/* Contenedor centrado de Tailwind */}
      <div className="pt-8">
        {/* Grid de Tailwind - 1 columna en móvil, 3 columnas en tablet (md) y superior */}
        {/* gap-8 añade espacio entre los elementos de la grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mapea sobre los datos para renderizar cada tarjeta */}
          {itinServiceCards.map((card, index) => (
            // Cada item de la grid - w-full asegura que ocupe el ancho completo de su columna
            // mb-4 añade margen inferior solo en pantallas pequeñas si el gap no es suficiente
            // md:mb-0 elimina el margen inferior en md+ ya que el gap de la grid lo maneja
            <div key={index} className="w-full mb-4 md:mb-0">
              {/* Contenedor de la tarjeta - estilos, sombra, altura completa, flex columna */}
              <div className="item-itin rounded shadow-md h-full flex flex-col">
                {/* Imagen de la tarjeta */}
                {/* Usando el componente Image de Next.js */}
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  // Es crucial especificar width y height para Image de Next.js
                  // Usa las dimensiones apropiadas basadas en el aspect ratio de la imagen original
                  // o el tamaño esperado en tu diseño. Ejemplo:
                  width={600}
                  height={400}
                  // Clases de Tailwind para imagen responsiva, esquinas redondeadas superiores y object-cover
                  className="w-full h-auto rounded-t object-cover"
                />

                {/* Área de contenido - flex-grow para que crezca y empuje el botón hacia abajo */}
                <div className="content flex-grow flex flex-col">
                  {/* Área de texto con padding */}
                  <div className="text-item p-4 flex-grow"> {/* flex-grow empuja el siguiente div hacia abajo */}
                    {/* Título del servicio */}
                    <h1 className="text-xl font-bold mb-2 text-gray-900">{card.title}</h1>
                    {/* Descripción corta del servicio */}
                    <p className="text-gray-700 mb-4">{card.description}</p>

                    {/* Bloques de Detalles / FAQs */}
                    {/* space-y-4 añade espacio vertical entre los detalles */}
                    <div className="space-y-4">
                        {card.details.map((detail, detailIndex) => (
                            <details key={detailIndex} >
                                <summary className="font-semibold cursor-pointer text-gray-800">{detail.summary}</summary>
                                <div className="text-gray-600 mt-2 space-y-2">
                                    {detail.content.map((paragraph, pIndex) => (
                                        <p key={pIndex}>{paragraph}</p> 
                                    ))}
                                </div>
                            </details>
                        ))}
                    </div>
                  </div>

                  {/* Área del botón "Get Started" - p-4 padding, mt-auto para alineación inferior en flex columna */}
                  <div className="link-tool p-4 mt-auto">
                    {/* Usar <a> para enlaces externos (target="_blank") */}
                    <a
                      href={card.buttonLink}
                      target="_blank" // Abre en una nueva pestaña
                      rel="noopener noreferrer" // Buena práctica de seguridad con target="_blank"
                      // Aplicar estilos de botón de Tailwind que repliquen btn-principal
                      className="inline-flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-semibold"
                      // Pasar todos los atributos data-* usando el spread operator
                      {...card.buttonData}
                    >
                      {card.buttonText}
                       {/* Icono - usando el componente de Lucide React */}
                      <ArrowRight className="ml-2 h-4 w-4 inline-block" /> {/* Margen izquierdo, tamaño, inline-block para alineación */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
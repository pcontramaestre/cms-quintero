
import AppointmentForm from "@/components/appointment-form"

export default function AppointmentsPage() {
    return (    
        <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 shadow-lg rounded-lg p-8">
            <AppointmentForm />
          </div>
        </div>
      </div>
    )
}
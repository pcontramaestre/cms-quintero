
import AppointmentForm from "@/components/appointment-form"

export default function AppointmentsPage() {
    return (    
        <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 rounded-lg border bg-card text-card-foreground border-none shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)] p-8">
            <AppointmentForm />
          </div>
        </div>
      </div>
    )
}
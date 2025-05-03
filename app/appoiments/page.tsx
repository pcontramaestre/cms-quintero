
import AppointmentForm from "@/components/appointment-form"
import { CalendarClock, Calendar, Clock, CheckCircle } from "lucide-react"

export default function AppointmentsPage() {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[center_top_-1px] border-b"></div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4 animate-fade-in">
                <span className="text-xs font-semibold uppercase tracking-wide">Easy Scheduling</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Book Your Appointment</span>
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8">
                Schedule your visit with our professional team. Complete the form below and we'll
                confirm your appointment within the next few hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Calendar className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose a Date</h3>
                <p className="text-gray-600">
                  Select your preferred date from our available options.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pick a Time</h3>
                <p className="text-gray-600">
                  Choose a convenient time slot that works for your schedule.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Confirmed</h3>
                <p className="text-gray-600">
                  Receive a confirmation and you're all set for your appointment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
                <div className="p-8">
                  <AppointmentForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}
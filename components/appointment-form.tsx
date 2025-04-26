"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, parse, isValid } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { getAppointmentConnections } from "@/data/data-appoiments"
import { FormControl } from "./ui/form"

// Interfaces para los datos
interface AppointmentConnectionsResponse {
  nid: string
  field_fechas_laborables: string
  service_name: string
  service_id: string
  service_price: string
  ids_locations: string
  names_locations: string
  locations: string
  provider: string
  type_provider: string
  email_provider: string
  service_time: string
  max_slots: string
}

// Interfaces para los datos procesados
interface Location {
  id: string
  name: string
}

interface Service {
  id: string
  name: string
  price: string
  locationIds: string[]
  service_time: string
  max_slots: string
}

interface Provider {
  id: string
  name: string
  email: string
  typeProvider: { id: string; name: string }[]
}

interface WorkingDay {
  date: Date
  startTime: string
  endTime: string
  timeSlots: string[]
}

interface Connection {
  provider: Provider
  service: Service
  locations: Location[]
  workingDays: WorkingDay[]
}

interface FormData {
  locationId: string
  serviceId: string
  providerId: string
  date?: Date
  time: string
  name: string
  email: string
  phone: string
}

export default function AppointmentForm() {
  // Estados para datos procesados
  const [connections, setConnections] = useState<Connection[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [providers, setProviders] = useState<Provider[]>([])

  // Estados para datos filtrados
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([])
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [disabledDays, setDisabledDays] = useState<Date[]>([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [maxSlots, setMaxSlots] = useState<string[]>([])

  // Estado del formulario
  const [formData, setFormData] = useState<FormData>({
    locationId: "",
    serviceId: "",
    providerId: "",
    date: undefined,
    time: "",
    name: "",
    email: "",
    phone: "",
  })

  // Cargar y procesar datos
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAppointmentConnections();

        // Procesar los datos
        const processedConnections: Connection[] = []
        const allLocations: Location[] = []
        const allServices: Service[] = []
        const allProviders: Provider[] = []

        // Mapa para evitar duplicados
        const locationMap = new Map<string, Location>()
        const serviceMap = new Map<string, Service>()
        const providerMap = new Map<string, Provider>()

        data.forEach((item) => {
          // Procesar ubicaciones
          const locationIds = item.ids_locations.split(", ")
          const locationNames = item.names_locations.split(", ")
          const locations: Location[] = []

          locationIds.forEach((id, index) => {
            if (!locationMap.has(id)) {
              const location = { id, name: locationNames[index] }
              locationMap.set(id, location)
              allLocations.push(location)
            }
            locations.push(locationMap.get(id)!)
          })

          // Procesar servicio
          if (!serviceMap.has(item.service_id)) {
            const service = {
              id: item.service_id,
              name: item.service_name,
              price: item.service_price,
              locationIds: locationIds,
              service_time: item.service_time,
              max_slots: item.max_slots
            }
            serviceMap.set(item.service_id, service)
            allServices.push(service)
          }

          // Procesar proveedor
          const [providerId, providerName] = item.provider.split(";")

          if (!providerMap.has(providerId)) {
            // Procesar tipos de proveedor
            const typeProviders = item.type_provider.split("|").map((type) => {
              const [id, name] = type.split(";")
              return { id, name }
            })

            const provider = {
              id: providerId,
              name: providerName,
              email: item.email_provider,
              typeProvider: typeProviders,
            }
            providerMap.set(providerId, provider)
            allProviders.push(provider)
          }

          // Procesar fechas laborables
          const workingDays: WorkingDay[] = []
          const workingDaysStr = item.field_fechas_laborables.split(";")

          workingDaysStr.forEach((dayStr) => {
            const [dateStr, timeRange] = dayStr.split(", ")
            const [startTime, endTime] = timeRange.split(" - ")

            // Parsear la fecha (formato MM/DD/YY)
            try {
              const date = parse(dateStr, "MM/dd/yy", new Date())
              
              // Verificar que la fecha sea válida
              if (isNaN(date.getTime())) {
                return; // Saltar este día si la fecha no es válida
              }

              // Generar slots de tiempo (intervalos de 30 minutos)
            const timeSlots: string[] = []
            const [startHour, startMinute] = startTime.split(":").map(Number)
            const [endHour, endMinute] = endTime.split(":").map(Number)

            let currentHour = startHour
            let currentMinute = startMinute

            // Limitar a un máximo de 24 slots para evitar bucles infinitos
            let slotCount = 0;
            const maxSlots = Number(item.max_slots);
            
            while ((currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) && slotCount < maxSlots) {
              const nextMinute = (currentMinute + Number(item.service_time)) % 60
              const nextHour = nextMinute === 0 ? currentHour + 1 : currentHour

              if (nextHour <= endHour) {
                const startTimeStr = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`
                const endTimeStr = `${nextHour.toString().padStart(2, "0")}:${nextMinute.toString().padStart(2, "0")}`
                timeSlots.push(`${startTimeStr} - ${endTimeStr}`)
              }

              currentHour = nextHour
              currentMinute = nextMinute
              slotCount++;
            }

            workingDays.push({
              date,
              startTime,
              endTime,
              timeSlots,
            })
            } catch (err) {
              console.error("Error processing working day:", dayStr, err);
            }
          })

          // Crear la conexión
          processedConnections.push({
            provider: providerMap.get(providerId)!,
            service: serviceMap.get(item.service_id)!,
            locations,
            workingDays,
          })
        })

        // Actualizar estados
        setConnections(processedConnections)
        setLocations(allLocations)
        setServices(allServices)
        setProviders(allProviders)
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }
    loadData()
  }, [])

  // Filtrar servicios cuando cambia la ubicación
  useEffect(() => {
    if (formData.locationId) {
      // Filtrar servicios disponibles para la ubicación seleccionada
      const filtered = services.filter((service) => service.locationIds.includes(formData.locationId))
      setFilteredServices(filtered)

      // Resetear servicio si la ubicación cambia y el servicio actual no está disponible
      if (!filtered.find((s) => s.id === formData.serviceId)) {
        setFormData((prev) => ({
          ...prev,
          serviceId: "",
          providerId: "",
          date: undefined,
          time: "",
        }))
      }
    } else {
      setFilteredServices([])
    }
  }, [formData.locationId, services])

  // Filtrar proveedores cuando cambia el servicio
  useEffect(() => {
    if (formData.locationId && formData.serviceId) {
      // Encontrar conexiones que coincidan con la ubicación y servicio seleccionados
      const relevantConnections = connections.filter(
        (conn) =>
          conn.service.id === formData.serviceId && conn.locations.some((loc) => loc.id === formData.locationId),
      )

      // Extraer proveedores únicos de estas conexiones
      const relevantProviders = relevantConnections.map((conn) => conn.provider)
      setFilteredProviders(relevantProviders)

      // Resetear proveedor si el servicio cambia y el proveedor actual no está disponible
      if (!relevantProviders.find((p) => p.id === formData.providerId)) {
        setFormData((prev) => ({
          ...prev,
          providerId: "",
          date: undefined,
          time: "",
        }))
      }
    } else {
      setFilteredProviders([])
    }
  }, [formData.locationId, formData.serviceId, connections])

  // Actualizar fechas disponibles cuando cambia el proveedor
  useEffect(() => {
    if (formData.locationId && formData.serviceId && formData.providerId && connections.length > 0) {
      const relevantConnection = connections.find(
        (conn) =>
          conn.service.id === formData.serviceId &&
          conn.provider.id === formData.providerId &&
          conn.locations.some((loc) => loc.id === formData.locationId),
      )

      if (relevantConnection) {
        // Obtener fechas disponibles
        const dates = relevantConnection.workingDays
          .map((day) => {
            const date = new Date(day.date);
            return isValid(date) ? date : null;
          })
          .filter((date): date is Date => date !== null);
        
        setAvailableDates(dates);
        
        // Calcular fechas deshabilitadas (próximos 60 días)
        const today = new Date();
        const disabledDates: Date[] = [];
        
        // Crear un array con los próximos 60 días
        for (let i = 0; i < 60; i++) {
          const date = new Date();
          date.setDate(today.getDate() + i);
          
          // Si esta fecha no está en las fechas disponibles, añadirla a las deshabilitadas
          const isAvailable = dates.some(
            (availableDate) =>
              availableDate.getFullYear() === date.getFullYear() &&
              availableDate.getMonth() === date.getMonth() &&
              availableDate.getDate() === date.getDate()
          );
          
          if (!isAvailable) {
            disabledDates.push(new Date(date));
          }
        }
        
        setDisabledDays(disabledDates);
        
        // Resetear la fecha seleccionada si ya no está disponible
        if (formData.date && !dates.some(date => {
          // Asegurarse de que formData.date no sea undefined
          if (!formData.date) return false;
          
          const selectedDate = new Date(formData.date);
          return (
            date.getFullYear() === selectedDate.getFullYear() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getDate() === selectedDate.getDate()
          );
        })) {
          setFormData(prev => ({ ...prev, date: undefined, time: "" }))
        }
      } else {
        setAvailableDates([])
        setDisabledDays([])
        setFormData(prev => ({ ...prev, date: undefined, time: "" }))
      }
    } else {
      setAvailableDates([])
      setDisabledDays([])
      setFormData(prev => ({ ...prev, date: undefined, time: "" }))
    }
  }, [formData.locationId, formData.serviceId, formData.providerId, connections])

  // Actualizar horarios disponibles cuando cambia la fecha
  useEffect(() => {
    if (formData.locationId && formData.serviceId && formData.providerId && formData.date) {
      // Encontrar la conexión relevante
      const relevantConnection = connections.find(
        (conn) =>
          conn.service.id === formData.serviceId &&
          conn.provider.id === formData.providerId &&
          conn.locations.some((loc) => loc.id === formData.locationId),
      )

      if (relevantConnection) {
        // Encontrar el día de trabajo que coincide con la fecha seleccionada
        try {
          if (!formData.date) {
            console.error("formData.date is undefined");
            return;
          }
          
          const selectedDate = new Date(formData.date);
          
          // Verificar que la fecha sea válida
          if (isNaN(selectedDate.getTime())) {
            return;
          }
          
          // Comparar por año, mes y día en lugar de por formato de cadena
          const workingDay = relevantConnection.workingDays.find((day) => {
            if (!day.date) {
              console.error("Working day date is undefined");
              return false;
            }
            
            const workingDate = new Date(day.date);
            return (
              workingDate.getFullYear() === selectedDate.getFullYear() &&
              workingDate.getMonth() === selectedDate.getMonth() &&
              workingDate.getDate() === selectedDate.getDate()
            );
          });
          
          if (workingDay) {
            setAvailableTimeSlots(workingDay.timeSlots)
          } else {
            setAvailableTimeSlots([])
          }
        } catch (error) {
          console.error("Error finding working day:", error);
          setAvailableTimeSlots([])
        }


      } else {
        setAvailableTimeSlots([])
      }
    } else {
      setAvailableTimeSlots([])
    }
  }, [formData.locationId, formData.serviceId, formData.providerId, formData.date, connections])

  // Manejadores de eventos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      date: date || undefined,
      time: ""
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Preparar datos para enviar
    const submissionData = {
      locationId: formData.locationId,
      serviceId: formData.serviceId,
      providerId: formData.providerId,
      date: formData.date ? format(formData.date, "yyyy-MM-dd") : "",
      time: formData.time,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }

    console.log("Appointment data:", submissionData)

    // Aquí iría la lógica para enviar los datos al servidor
    alert("Appointment scheduled successfully!")

    // Resetear el formulario
    setFormData({
      locationId: "",
      serviceId: "",
      providerId: "",
      date: undefined,
      time: "",
      name: "",
      email: "",
      phone: "",
    })
  }

  const handleReset = () => {
    setFormData({
      locationId: "",
      serviceId: "",
      providerId: "",
      date: undefined,
      time: "",
      name: "",
      email: "",
      phone: "",
    })
  }

  // Función para deshabilitar fechas no disponibles en el calendario
  const isDateDisabled = (date: Date) => {
    if (!formData.locationId || !formData.serviceId || !formData.providerId) {
      return true
    }
    
    if (!date || isNaN(date.getTime())) {
      console.error("Invalid date in isDateDisabled");
      return true;
    }
    
    // Verificar si la fecha está en las fechas disponibles usando comparación de objetos Date
    return !availableDates.some((availableDate) => {
      if (!availableDate || isNaN(availableDate.getTime())) {
        return false;
      }
      return (
        date.getFullYear() === availableDate.getFullYear() &&
        date.getMonth() === availableDate.getMonth() &&
        date.getDate() === availableDate.getDate()
      );
    })
  }

  // Obtener el precio del servicio seleccionado
  const selectedService = services.find((s) => s.id === formData.serviceId)
  const servicePrice = selectedService ? selectedService.price : null

  // Obtener nombres para mostrar en el resumen
  const selectedLocation = locations.find((l) => l.id === formData.locationId)
  const selectedProvider = providers.find((p) => p.id === formData.providerId)

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl">New Appointment</CardTitle>
          <p className="text-sm text-gray-500">
            Please complete all the required information to schedule your appointment.
          </p>
          <Separator />
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sección de cita */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Select value={formData.locationId} onValueChange={(value) => handleSelectChange("locationId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="service">Service</Label>
                <Select
                  value={formData.serviceId}
                  onValueChange={(value) => handleSelectChange("serviceId", value)}
                  disabled={!formData.locationId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredServices.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - ${service.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Campo oculto para el ID del servicio */}
                <input type="hidden" name="service_id" value={formData.serviceId} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="provider">Provider</Label>
                <Select
                  value={formData.providerId}
                  onValueChange={(value) => handleSelectChange("providerId", value)}
                  disabled={!formData.serviceId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProviders.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Campo oculto para el ID del proveedor */}
                <input type="hidden" name="provider_id" value={formData.providerId} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>

                <div className="relative date-picker">
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    excludeDates={disabledDays}
                    locale={es}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    maxDate={new Date(new Date().setDate(new Date().getDate() + 60))}
                    placeholderText="Select a date"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    todayButton="Today"
                    isClearable={false}
                    highlightDates={availableDates}
                    disabled={!formData.locationId || !formData.serviceId || !formData.providerId}
                    customInput={
                      <button 
                        type="button" 
                        className={`flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background ${!formData.locationId || !formData.serviceId || !formData.providerId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-accent hover:text-accent-foreground'}`}
                        disabled={!formData.locationId || !formData.serviceId || !formData.providerId}
                      >
                        <span>
                          {!formData.locationId || !formData.serviceId || !formData.providerId 
                            ? "First select location, service and provider" 
                            : (formData.date ? format(formData.date, "dd/MM/yyyy") : "Select a date")}
                        </span>
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </button>
                    }
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => handleSelectChange("time", value)}
                  disabled={!formData.date || availableTimeSlots.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hour" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sección de información personal */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Formato: 012-345-6789"
                    required
                  />
                </div>

                {/* Resumen de la cita */}
                {(formData.locationId ||
                  formData.serviceId ||
                  formData.providerId ||
                  formData.date ||
                  formData.time) && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Por favor verifique los detalles de su cita:</h4>
                    <div className="space-y-2 text-sm">
                      {selectedLocation && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span>{selectedLocation.name}</span>
                        </div>
                      )}

                      {selectedService && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Service:</span>
                          <span>{selectedService.name}</span>
                        </div>
                      )}

                      {selectedProvider && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Provider:</span>
                          <span>{selectedProvider.name}</span>
                        </div>
                      )}

                      {servicePrice && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Price:</span>
                          <span>${servicePrice}</span>
                        </div>
                      )}

                      {formData.date && formData.time && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Date and time:</span>
                          <span>
                            {format(formData.date, "yyyy-MM-dd", { locale: es })} / {formData.time}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 cursor-pointer col-span-2"
              disabled={
                !formData.locationId ||
                !formData.serviceId ||
                !formData.providerId ||
                !formData.date ||
                !formData.time ||
                !formData.name ||
                !formData.email ||
                !formData.phone
              }
            >
            Schedule Appointment
            </Button>
            <Button type="button" variant="outline" className="w-full col-span-1" onClick={handleReset}>
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

import type { AppointmentConnectionsResponse } from "@/lib/drupalTypes";

// Usar una ruta relativa para evitar problemas de CORS
// En lugar de llamar directamente a quintero.localdev, usaremos una API route de Next.js

// Get Appointment Connections from Drupal API
export async function getAppointmentConnections() : Promise<AppointmentConnectionsResponse[]> {
    try {
        // First try to fetch from the Drupal API directly (no authentication needed)
        try {
            // Usar una ruta relativa para evitar problemas de CORS
            const url = "/api/drupal/connections";
            
            const options = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                cache: 'no-store' as RequestCache // Disable caching to ensure fresh data
            };
            
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
            }
            
            const appointmentConnectionsData: AppointmentConnectionsResponse[] = await response.json();
            
            
            if (!appointmentConnectionsData || appointmentConnectionsData.length === 0) {
                console.warn("API returned empty data, falling back to local JSON");
                throw new Error("API returned empty data");
            }
            
            return appointmentConnectionsData;
        } catch (apiError) {
            console.error("Error fetching from Drupal API:", apiError);
            console.log("Falling back to local JSON data file");
            
            // If API call fails, try to fetch from local JSON file
            try {
                const response = await fetch("/data/data.json");
                if (!response.ok) {
                    throw new Error(`Error loading local data: ${response.status}`);
                }
                
                const localData: AppointmentConnectionsResponse[] = await response.json();
                console.log("Local data loaded successfully:", localData);
                return localData;
            } catch (localDataError) {
                console.error("Error loading local data:", localDataError);
                throw localDataError; // Re-throw to be caught by the outer catch
            }
        }
    } catch (error) {
        console.error("All data fetching attempts failed:", error);
        // Return mock data as a last resort
        return getMockAppointmentData();
    }
}

// Provide mock data for testing when API is unavailable
function getMockAppointmentData(): AppointmentConnectionsResponse[] {
    console.log("Using mock appointment data");
    return [
        {
            title: "Consulta Fiscal",
            field_fechas_laborables: "04/26/25, 09:00 - 17:00;04/27/25, 10:00 - 15:00",
            service_name: "Consulta Fiscal",
            service_id: "101",
            service_price: "150",
            ids_locations: "1, 2",
            names_locations: "Miami Office, Orlando Office",
            locations: "Miami, Orlando",
            provider: "201;Juan Pérez",
            type_provider: "1;Contador|2;Asesor Fiscal",
            email_provider: "juan@example.com"
        },
        {
            title: "Preparación de Impuestos",
            field_fechas_laborables: "04/28/25, 08:30 - 16:30;04/29/25, 09:30 - 14:30",
            service_name: "Preparación de Impuestos",
            service_id: "102",
            service_price: "200",
            ids_locations: "1",
            names_locations: "Miami Office",
            locations: "Miami",
            provider: "202;Maria Rodriguez",
            type_provider: "1;Contador",
            email_provider: "maria@example.com"
        }
    ];
}
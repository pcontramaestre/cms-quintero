import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

//export const dynamic = 'force-dynamic'; // No cache

export interface AppointmentSubmissionData {
  locationId: string;
  serviceId: string;
  providerId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM - HH:MM
  name: string;
  email: string;
  phone: string;
}


export async function POST(request: NextRequest) {
    //example response timeout
    //await new Promise(resolve => setTimeout(resolve, 2000));
    //return NextResponse.json({ message: "Appointment scheduled successfully!", status: 200 , data: { id: 1 }});


  try {
    console.log("Procesando la solicitud de cita...");
    const DRUPAL_BASE_URL = process.env.DRUPAL_BASE_URL as string;
    const BASIC_AUTH_USER = process.env.DRUPAL_API_USER as string;
    const BASIC_AUTH_PASSWORD = process.env.DRUPAL_API_PASSWORD as string;
    const REST_EXPORT_PATH = '/api/v1/appointments';
    const url = `${DRUPAL_BASE_URL}${REST_EXPORT_PATH}`;
    const credentials = `${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    const body: AppointmentSubmissionData = await request.json();
    

    // Validate required fields
    const schema = z.object({
      locationId: z.string(),
      serviceId: z.string(),
      providerId: z.string(),
      date: z.string().min(10).max(10),
      time: z.string().min(10).max(15),
      name: z.string().min(2).max(100),
      email: z.string().email(),
      phone: z.string().min(10).max(15).regex(/^[0-9]+$/),
    });
    
    const result = schema.safeParse(body);
    if (!result.success) {
      const formattedErrors = result.error.format();
      return NextResponse.json(
        { 
          status: 400,
          
          error: 'Por favor verifica que todos los campos cumplan con su validación y que no haya campos vacíos',
          details: formattedErrors 
        },
        { status: 400 }
      );
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(body),
      cache: 'no-store' as RequestCache // Disable caching to ensure fresh data
    };
    
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error("Error al obtener datos de Drupal:", response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const appointmentData = await response.json();
    return NextResponse.json(appointmentData);
  } catch (error) {
    console.error('Error al obtener datos de Drupal:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos de Drupal' },
      { status: 500 }
    );
  }
}
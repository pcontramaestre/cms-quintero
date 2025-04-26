import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // No cache

export async function GET() {
  try {
    console.log('Proxy API: Iniciando solicitud a Drupal');
    
    const DRUPAL_BASE_URL = 'http://quintero.localdev:8080';
    const REST_EXPORT_PATH = '/api/v1/connections';
    const url = `${DRUPAL_BASE_URL}${REST_EXPORT_PATH}`;
    
    console.log('Proxy API: Enviando solicitud a:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      cache: 'no-store' as RequestCache
    });
    
    if (!response.ok) {
      console.error('Proxy API: Error en la respuesta de Drupal:', response.status);
      const errorText = await response.text();
      console.error('Proxy API: Detalles del error:', errorText);
      
      // Si falla, intentamos cargar los datos locales
      return NextResponse.json(
        { error: `Error al obtener datos de Drupal: ${response.status}` },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    console.log('Proxy API: Datos recibidos correctamente de Drupal', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy API: Error general:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

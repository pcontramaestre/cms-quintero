// components/blog/newsletter-card.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewsletterCardProps {
    
}

export default function NewsletterCard(props: NewsletterCardProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const CUSTOM_SUBSCRIBE_ENDPOINT = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/subscribe`;


    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setMessage('');
        setIsError(false);

        if (!email || !validateEmail(email)) {
            setMessage('Por favor, introduce una dirección de correo electrónico válida.');
            setIsError(true);
            return;
        }

        setIsSubmitting(true);

        try {
            // Payload para enviar al endpoint personalizado
            const payload = {
                 email: email, 
            };

            const response = await fetch(CUSTOM_SUBSCRIBE_ENDPOINT, {
                method: 'POST', // Petición POST
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json', 
                },
                body: JSON.stringify(payload), 
            });

            const result = await response.json(); 

            if (response.ok) { 
                if (result.status === 'success') {
                    setMessage(result.message || '¡Gracias por suscribirte!');
                    setIsError(false);
                    setEmail(''); 
                } else if (result.status === 'duplicate') {
                    setMessage(result.message || 'Esta dirección de correo electrónico ya está suscrita.');
                    setIsError(true); 
                } else {
                    console.error('Endpoint /api/subscribe devolvió status 2xx inesperado:', result);
                    setMessage(result.message || 'Ocurrió un problema desconocido.');
                    setIsError(true);
                }
            } else { 
                console.error('Error HTTP del endpoint /api/subscribe:', response.status, response.statusText, result.message);
                setMessage(result.message || `Error: ${response.statusText}. Por favor, inténtalo de nuevo.`);
                setIsError(true);
            }


        } catch (error) {
            console.error('Error en la llamada fetch al endpoint /api/subscribe:', error);
            setMessage('Ocurrió un error de conexión. Por favor, inténtalo de nuevo.');
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="Tu dirección de correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                 />

                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Procesando...' : 'Suscribirse'}
                </Button>

                {message && (
                    <p className={`text-sm mt-2 ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
            </form>
        </CardContent>
    );
}
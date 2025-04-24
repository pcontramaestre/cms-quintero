// components/GoogleTranslate.js
"use client";
import React, { useEffect } from 'react';
import Script from 'next/script';

function GoogleTranslate() {
    // Función para inicializar el widget de Google Translate
    useEffect(() => {
        // Definir la función de inicialización global
        window.googleTranslateElementInit = function() {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'es,fr,en', // Idiomas disponibles
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
            }, 'google_translate_element');
        };

        // Limpiar al desmontar
        return () => {
            delete window.googleTranslateElementInit;
        };
    }, []);

    return (
        <div className="google-translate-container">
            {/* Script de Google Translate */}
            <Script 
                src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
                strategy="afterInteractive"
            />
            
            {/* Contenedor para el widget de Google Translate */}
            <div id="google_translate_element"></div>
        </div>
    );
}

export default GoogleTranslate;

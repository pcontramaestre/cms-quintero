import React from "react";
import * as cheerio from 'cheerio';
import Image from "next/image";

// Componente para renderizar HTML
const RenderHTML: React.FC<{ htmlContent: string }> = ({ htmlContent }) => {
  // Si no hay contenido HTML, no renderizar nada
  if (!htmlContent) return null;

  // Función para procesar el HTML y transformarlo según las reglas
  const processHTML = (html: string): string => {
    // Verificar si estamos en el cliente o en el servidor
    const isClient = typeof window !== 'undefined';
    
    try {
      if (isClient) {
        // Usar DOMParser en el cliente
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Verificar si hay una etiqueta <article>
        const article = doc.querySelector("article");
        if (article) {
          // Buscar VIDEOS
          const mediaDiv = article.querySelector(".field--name-field-media-oembed-video");
          if (mediaDiv) {
            // Buscar el div con la clase .field__item
            const fieldItem = mediaDiv.querySelector(".field__item");

            //get text fieldItem
            const url_video = fieldItem?.textContent || '';

            if (fieldItem && url_video) {
              // Extraer el valor de src (URL del video)
              const videoUrl = url_video;

              // Crear un nuevo iframe personalizado para YouTube
              const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
              const iframeHtml = `
                <div class="youtube-embed">
                  <iframe
                    width="800"
                    height="450"
                    src="${youtubeEmbedUrl}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              `;
              
              // Reemplazar solo el div del video, no todo el HTML
              mediaDiv.innerHTML = iframeHtml;
            }
          }

          //Buscar Imagenes
          const imgElements = article.querySelectorAll("img");
          imgElements.forEach(imgDiv => {
            const srcImg = imgDiv.getAttribute('src');
            if (srcImg) {
              // Crear una nueva URL para la imagen
              const newSrc = `/api/drupal/loadimages?path=${encodeURIComponent(srcImg)}`;
              // Actualizar solo el atributo src de la imagen
              imgDiv.setAttribute('src', newSrc);
            }
          });
          
          // Devolver el HTML modificado
          return doc.body.innerHTML;
        }
      } else {
        // Usar cheerio en el servidor
        const $ = cheerio.load(html);
        
        // Verificar si hay una etiqueta <article>
        const article = $('article');
        if (article.length) {
          // Buscar VIDEOS
          const mediaDiv = article.find('.field--name-field-media-oembed-video');
          if (mediaDiv.length) {
            // Buscar el div con la clase .field__item
            const fieldItem = mediaDiv.find('.field__item');
            
            //get text fieldItem
            const url_video = fieldItem.text();
            
            if (fieldItem.length && url_video) {
              // Extraer el valor de src (URL del video)
              const videoUrl = url_video;
              
              // Crear un nuevo iframe personalizado para YouTube
              const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
              const iframeHtml = `
                <div class="youtube-embed">
                  <iframe
                    width="800"
                    height="450"
                    src="${youtubeEmbedUrl}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="width: 90%; height: auto;margin: 0 auto;"
                  ></iframe>
                </div>
              `;
              
              // Reemplazar solo el div del video, no todo el HTML
              mediaDiv.html(iframeHtml);
            }
          }
          
          //Buscar Imagenes
          const imgElements = article.find('img');
          imgElements.each(function() {
            const srcImg = $(this).attr('src');
            if (srcImg) {
              // Crear una nueva URL para la imagen
              const newSrc = `/api/drupal/loadimages?path=${encodeURIComponent(srcImg)}`;
              // Actualizar solo el atributo src de la imagen
              $(this).attr('src', newSrc);
              $(this).css('max-width', '800px');
              $(this).css('margin', '0 auto');
              $(this).css('display', 'block');
              $(this).css('width', '90%');
            }
          });
          
          // Devolver el HTML modificado
          return $.html();
        }
      }
    } catch (error) {
      console.error('Error al procesar HTML:', error);
    }

    // Si no se cumple ninguna condición o hay un error, devolver el HTML original
    return html;
  };

  // Función para obtener la URL de incrustación de YouTube
  const getYouTubeEmbedUrl = (url: string): string => {
    // Extraer el ID del video de la URL
    const videoIdMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // Devolver la URL original si no se encuentra el ID
  };

  // Procesar el HTML antes de renderizarlo
  const processedHTML = processHTML(htmlContent);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: processedHTML }}
      className="rendered-html"
    />
  );
};

export default RenderHTML;
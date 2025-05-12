// app/blog/BlogClientPage.tsx
'use client'; // Indica que este es un componente cliente

import { useState, useEffect, Suspense } from "react"; // Importa hooks de React
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Si mantienes el Input aquí
import { ArrowLeft, Clock, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Importa tus componentes de tarjetas de la sidebar y de artículos
import CategoriesCard from "@/components/blog/categories";
import TagsCard from "@/components/blog/tags";
import SearchCard from "@/components/blog/search"; // Usaremos este para el input de búsqueda
import CardArticle from "@/components/blog/card-article";

// Importa esqueletos para Suspense
import CardCategoriesSkeleton from "@/components/skeleton/card-categories";
import CardTagsSkeleton from "@/components/skeleton/car-tags";
import CardArticleSkeleton from "@/components/skeleton/card-article";



// Define la interfaz Article, asegúrate que coincide con la estructura REAL de postData
// que obtienes de getBlogPosts() DESPUÉS de cualquier transformación que hagas.
// Si getBlogPosts() aún devuelve tags como string, la interfaz debería reflejar eso inicialmente,
// y la transformación de tags se haría aquí si no se hizo en getBlogPosts().
// Basado en tu código anterior, parece que body y tags vienen como string del export.
interface Article {
  title: string;
  // Si la imagen viene como string url parcial
  image: string;
  created: string;
  changed: string;
  // Si el tiempo de lectura viene como string
  time_read: string;
  // Si el body viene como string plano o HTML
  body: string;
  // Si los tags vienen como un string separado por comas
  tags?: string;
  nid: string; // O algún otro ID único
  url: string; // El path alias del artículo
}


// Define las props que recibirá este componente cliente
interface BlogClientTagPageProps {
    initialPosts: Article[]; // Los posts iniciales obtenidos del servidor
    params: {
        slug: string[];
    };
}

export default function BlogClientTagPage({ initialPosts, params }: BlogClientTagPageProps) {

  console.log(params.slug[0]);

  
    const [filteredPosts, setFilteredPosts] = useState<Article[]>(initialPosts);

    // Efecto que se ejecuta cuando cambia el término de búsqueda o la lista inicial de posts
    useEffect(() => {
        const lowerCaseQuery = params.slug[0].toLowerCase();
        const filtered = initialPosts.filter(post => {
            const tagsMatch = post.tags?.toLowerCase().includes(lowerCaseQuery);
            return tagsMatch;
        });
        setFilteredPosts(filtered);
    }, [params.slug, initialPosts]); // Dependencias: re-ejecutar el efecto si cambian la búsqueda o los posts iniciales

    return (
        <div className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mt-4 text-xl">Stay informed with the latest updates and expert insights from Quintero & Associates. Explore valuable tips, industry trends, and regulatory changes to keep your business ahead. Empower your decisions with timely, relevant, and actionable information—all in one place.</p>
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Link href="/blog"
                        // La ruta a tu página principal del blog
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium mb-6 lg:col-span-2"
                        // Estilo y margen inferior
                    >
                        <ArrowLeft className="mr-2 h-4 w-4"/> {/* Icono de flecha izquierda */}
                        Back
                    </Link>
              {/* Main content - Muestra los posts FILTRADOS */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 articles-blog">
                  {/* Mapea sobre los posts FILTRADOS */}
                  {filteredPosts.map((post: Article) => (
                    <Card key={post.nid} className="overflow-hidden view-transition shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)] transition-all duration-300 border-none">
                      <CardArticle postData={post} />
                    </Card>
                  ))}
                   {/* Opcional: Mostrar un mensaje si no hay resultados */}
                  {filteredPosts.length === 0 && (
                      <div className="md:col-span-2 text-center text-gray-600">
                          No articles found matching "{params.slug[0]}"
                      </div>
                  )}
                   {/* Opcional: Mostrar un mensaje si no hay posts iniciales */}
                   {filteredPosts.length === 0 && (
                       <div className="md:col-span-2 text-center text-gray-600">
                           No blog posts available.
                       </div>
                   )}
                </div>

              </div>

              {/* Sidebar */}
              <div className="space-y-8">


                <Card className="border-none shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)]">
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <Suspense fallback={<CardCategoriesSkeleton />}>
                    <CategoriesCard /> 
                    </Suspense>
                </Card>

                {/* Popular Tags - Puede ser Server Component */}
                <Card className="border-none shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)]">
                  <CardHeader>
                      <CardTitle>Popular Tags</CardTitle>
                  </CardHeader>
                  <Suspense fallback={<CardTagsSkeleton />}>
                    <TagsCard /> 
                  </Suspense>
                </Card>

                {/* Newsletter - Puede ser Server Component */}
                 <Card className="border-none shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)]">
                  <CardHeader>
                    <CardTitle>Subscribe to Newsletter</CardTitle>
                    <CardDescription>Get the latest articles and business updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Input type="email" placeholder="Your email address" />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      );
}
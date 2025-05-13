// app/blog/BlogClientPage.tsx
'use client'; // Indica que este es un componente cliente

import { useState, useEffect, Suspense } from "react"; // Importa hooks de React
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Si mantienes el Input aquí
import { Clock, Search, Tag, ChevronRight, Folder } from "lucide-react";
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
interface BlogClientPageProps {
    initialPosts: Article[]; // Los posts iniciales obtenidos del servidor
}

export default function BlogClientPage({ initialPosts }: BlogClientPageProps) {
    // Estado para el término de búsqueda
    const [searchQuery, setSearchQuery] = useState('');
    // Estado para la lista de posts filtrados que se mostrarán
    const [filteredPosts, setFilteredPosts] = useState<Article[]>(initialPosts);

    // Efecto que se ejecuta cuando cambia el término de búsqueda o la lista inicial de posts
    useEffect(() => {
        if (!searchQuery) {
            // Si el término de búsqueda está vacío, mostramos todos los posts iniciales
            setFilteredPosts(initialPosts);
        } else {
            // Si hay un término de búsqueda, filtramos los posts
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = initialPosts.filter(post => {
                // Filtramos por título o por cuerpo (descripción)
                // Asegúrate de que los campos existen antes de llamar a .toLowerCase()
                const titleMatch = post.title?.toLowerCase().includes(lowerCaseQuery);
                // Si post.body es un objeto con post.body.value:
                // const bodyMatch = post.body?.value?.toLowerCase().includes(lowerCaseQuery);
                // Si post.body es directamente un string:
                const bodyMatch = post.body?.toLowerCase().includes(lowerCaseQuery);
                const tagsMatch = post.tags?.toLowerCase().includes(lowerCaseQuery);

                return titleMatch || bodyMatch || tagsMatch; // Un post coincide si el título o el cuerpo incluyen el término
            });
            setFilteredPosts(filtered);
        }
    }, [searchQuery, initialPosts]); // Dependencias: re-ejecutar el efecto si cambian la búsqueda o los posts iniciales

    // Función para manejar el cambio en el input de búsqueda
    const handleSearchChange = (query: string) => {
        setSearchQuery(query); // Actualiza el estado del término de búsqueda
    };

    // Renderiza la estructura de la página del blog
    return (
        <div className="animate-fade-in-1s bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Stay informed with the latest updates and expert insights from Quintero & Associates. Explore valuable tips, industry trends, and regulatory changes to keep your business ahead.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 relative">
              {/* Main content - Muestra los posts FILTRADOS */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 articles-blog">
                  {/* Mapea sobre los posts FILTRADOS */}
                  {filteredPosts.map((post: Article) => (
                    <Card key={post.nid} className="overflow-hidden view-transition shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:-translate-y-1 group">
                      <CardArticle postData={post} />
                    </Card>
                  ))}
                   {/* Opcional: Mostrar un mensaje si no hay resultados */}
                  {filteredPosts.length === 0 && searchQuery && (
                      <div className="md:col-span-2 text-center p-8 bg-blue-50 rounded-xl border border-blue-100">
                          <p className="text-lg text-gray-600 mb-2">No articles found matching <span className="font-semibold text-blue-700">"{searchQuery}"</span></p>
                          <p className="text-gray-500">Try adjusting your search terms or browse all articles</p>
                      </div>
                  )}
                   {/* Opcional: Mostrar un mensaje si no hay posts iniciales */}
                   {filteredPosts.length === 0 && !searchQuery && (
                       <div className="md:col-span-2 text-center p-12 bg-blue-50 rounded-xl border border-blue-100">
                           <p className="text-lg text-gray-600 mb-2">No blog posts available at this time</p>
                           <p className="text-gray-500">Please check back later for new content</p>
                       </div>
                   )}
                </div>

                {/* Botón "Load More" - La paginación requeriría más lógica */}
                {/* Solo mostrar si hay posts y si no estamos filtrando o si la paginación aplica a la lista filtrada */}
                {/* {initialPosts.length > filteredPosts.length && filteredPosts.length > 0 && ( // Ejemplo simple de cuándo mostrar
                     <div className="mt-12 flex justify-center">
                       <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                         Load More Articles 
                       </Button>
                     </div>
                )} */}

              </div>

              {/* Sidebar - Estos componentes pueden seguir siendo de servidor si no necesitan estado del cliente */}
              {/* Pero SearchCard necesita comunicación, lo modificaremos */}
              <div className="space-y-8 lg:sticky lg:top-8">
                {/* Search - Pasamos la función handleSearchChange a SearchCard */}
                <SearchCard onSearchChange={handleSearchChange} />

                {/* Categories - Puede ser Server Component */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <Folder className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-xl font-bold text-gray-900">Categories</CardTitle>
                        </div>
                    </CardHeader>
                    <Suspense fallback={<CardCategoriesSkeleton />}>
                    <CategoriesCard /> 
                    </Suspense>
                </Card>

                {/* Popular Tags - Puede ser Server Component */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <Tag className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-xl font-bold text-gray-900">Popular Tags</CardTitle>
                        </div>
                    </CardHeader>
                    <Suspense fallback={<CardTagsSkeleton />}>
                        <TagsCard /> 
                    </Suspense>
                </Card>

                {/* Newsletter - Puede ser Server Component */}
                 <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
                  <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Subscribe to Newsletter</CardTitle>
                    <CardDescription className="text-gray-600">Get the latest articles and business updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Input type="email" placeholder="Your email address" className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 group">
                        Subscribe <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      );
}
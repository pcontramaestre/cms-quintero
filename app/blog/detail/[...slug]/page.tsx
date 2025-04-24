
import { getPostBySlug } from "@/data/data-blog";
import Image from "next/image"; 
import { Body } from "@/components/body";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CategoriesCard from "@/components/blog/categories";
import TagsCard from "@/components/blog/tags";
import CardTagsSkeleton from "@/components/skeleton/car-tags";
import CardCategoriesSkeleton from "@/components/skeleton/card-categories";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import NewsletterCard from "@/components/blog/newsletter-card";

interface PageParams {
    params: {
      slug: string;
    };
  }

export default async function BlogPostPage({ params }: PageParams) {
    const awaitedParams = await params;

    const post = await getPostBySlug(awaitedParams.slug);

    if (!post) {
        return (
             <div className="container mx-auto py-8 text-center">
                <h1 className="text-2xl font-bold">Artículo no encontrado</h1>
                <p>Lo sentimos, el artículo que buscas no existe o no está disponible.</p>
             </div>
        );
    }

    // === URL COMPLETA DEL POST ===

    const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const fullPostUrl = `${siteBaseUrl}${post.path.alias}`;

    // === TEXTO PARA COMPARTIR ===
    const shareTitle = post.title;
    const shareDescription = post.body?.processed ? post.body.processed.substring(0, 150) + '...' : post.title;

    const encodedFullPostUrl = encodeURIComponent(fullPostUrl);
    const encodedShareTitle = encodeURIComponent(shareTitle);
    const encodedShareDescription = encodeURIComponent(shareDescription);

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedFullPostUrl}`;
    const twitterUrl = `https://x.com/intent/tweet?text=${encodedShareTitle}&url=${encodedFullPostUrl}`;
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedFullPostUrl}&title=${encodedShareTitle}&summary=${encodedShareDescription}`;
    
    return (
        <div className="container mx-auto py-8">
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="col-span-2">

                    {/* === AQUÍ ES DONDE DEBERÍAS AGREGAR EL ENLACE === */}
                    <Link
                        href="/blog" // La ruta a tu página principal del blog
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium mb-6" // Estilo y margen inferior
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> {/* Icono de flecha izquierda */}
                        Back to Blog
                    </Link>
                    {/* === FIN DEL ENLACE === */}
                    { post && ( 
                        <div className="space-y-4 col-span-2">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${post.field_imagen_principal_del_post?.uri?.url}`}
                                alt={post.title}
                                width={1336}
                                height={400}
                                quality={80}
                                priority
                                className="max-h-[400px] w-full object-cover aspect-[16/9]"
                            />
                            <h1 className="text-3xl font-bold text-blue-900">{post.title}</h1>
                            
                            <div className="text-gray-600 flex items-center gap-2"> {/* Este es el div principal */}
                                <div className="flex items-center gap-3 text-sm text-blue-900"> 
                                    <span><Calendar className="inline" /> {formatDate(post.created)}</span>
                                </div>
                                <span>•</span> {/* Separador */}
                                <div className="flex items-center gap-3 text-sm text-blue-900"> 
                                    <Clock className="inline" /> {post.field_time_min_read} min read
                                </div>

                                <div className="flex items-center gap-2 justify-end ml-auto"> 
                                    <span className="font-semibold text-gray-700">Share:</span>
                                    <div className="flex gap-2">
                                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded">
                                            <Facebook className="inline" />
                                        </a>
                                        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded">
                                            <Twitter className="inline" />
                                        </a>
                                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded">
                                            <Linkedin className="inline" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <Body value={post.body?.processed || ""} />
                            {post.field_tags && (
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-700">Tags:</span>
                                {post.field_tags.map((tag: any) => (
                                        <Link
                                        key={tag.id}
                                        href={`/blog/tags/${tag.name.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-gray-600 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded text-sm"
                                    >
                                       #{tag.name}
                                    </Link>
                                    ))
                                }
                            </div>
                            )}
                        </div>
                    )}

                </div>
                <div className="col-span-1">
                    <div className="space-y-8 sticky top-24 max-h-[calc(100vh+200px)] overflow-y-auto pb-8 px-4">
                        {/* Categories - Puede ser Server Component */}
                        <Card className="border-none shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)]">
                            <CardHeader>
                                <CardTitle className="text-blue-900">Categories</CardTitle>
                            </CardHeader>
                            <Suspense fallback={<CardCategoriesSkeleton />}>
                            <CategoriesCard /> 
                            </Suspense>
                        </Card>

                        {/* Popular Tags - Puede ser Server Component */}
                        <Card className="border-none shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)]">
                        <CardHeader>
                            <CardTitle className="text-blue-900">Popular Tags</CardTitle>
                        </CardHeader>
                        <Suspense fallback={<CardTagsSkeleton />}>
                            <TagsCard /> 
                        </Suspense>
                        </Card>

                        {/* Newsletter - Puede ser Server Component */}
                        {/* <Card className="border-none shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)]">
                            <CardHeader>
                                <CardTitle className="text-blue-900">Subscribe to Newsletter</CardTitle>
                                <CardDescription>Get the latest articles and business updates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                <Input type="email" placeholder="Your email address" />
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                                </div>
                            </CardContent>
                        </Card> */}

                        <Card className="border-none shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)]">
                            <CardHeader>
                                <CardTitle className="text-blue-900">Subscribe to Newsletter</CardTitle>
                                <CardDescription>Get the latest articles and business updates</CardDescription>
                            </CardHeader>
                            <NewsletterCard />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    return { paths: [{ params: { slug: "" } }], fallback: true }
}
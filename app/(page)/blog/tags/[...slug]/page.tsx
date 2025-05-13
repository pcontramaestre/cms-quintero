// app/blog/page.tsx
import type { Metadata } from "next";
import { getBlogPosts } from "@/data/data-blog"; // Importa tu función de fetch

// Importa el nuevo componente cliente
import BlogClientTagPage from "@/app/(page)/blog/tags/[...slug]/BlogClientTagPage";

// Define la interfaz Article, asegúrate que coincide con lo que retorna getBlogPosts()
// antes de pasarlo a BlogClientPage. La transformación de tags (string -> array)
// idealmente debería ocurrir en getBlogPosts() o ser manejada en BlogClientPage.
// Si getBlogPosts() retorna tags como string, esta interfaz debe reflejarlo.
interface Article {
  title: string;
  image: string;
  created: string;
  changed: string;
  time_read: string;
  body: string; // Si viene como string
  tags?: string; // Si viene como string
  nid: string;
  url: string;
}

interface PageParams {
    params: {
      slug: string[];
    };
  }

export const metadata: Metadata = {
  title: "Blog | Quintero and Associates",
  description: "Insights and updates on accounting, tax, and business topics",
}

// BlogPage sigue siendo un componente ASYNC Server para obtener los datos iniciales
export default async function BlogTagPage({ params }: PageParams) { 
  const awaitedParams = await params;


  const blogPosts: Article[] = await getBlogPosts();

  return <BlogClientTagPage initialPosts={blogPosts} params={awaitedParams} />;
}
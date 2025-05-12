import type { Metadata } from "next";
import { getBlogPosts } from "@/data/data-blog";
import BlogClientCatPage from "./BlogClientCatPage";


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
  

  
export default async function CategoriesPage({ params }: PageParams) {
    const awaitedParams = await params;

    const blogPosts: Article[] = await getBlogPosts();
    return (
        <BlogClientCatPage initialPosts={blogPosts} params={awaitedParams} />
    );
}
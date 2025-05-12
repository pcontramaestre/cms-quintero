// components/blog/card-article.tsx
'use client'
import { Clock, Calendar, Tag, ChevronRight } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Article {
  title: string;
  image: string;
  created: string;
  changed: string;
  time_read: string;
  body: string;
  tags?: string;
  nid: string;
  url: string;
}


  export default function CardArticle({ postData }: { postData: Article }) {
    const tags = postData.tags?.split(',').map((tag: string) => tag.trim());  
    const generateRandomKeyPart = () => Math.random().toString(36).substring(2, 7);
  
    return (
        <>
            <div className="aspect-video w-full overflow-hidden relative group">                
                <Link href={`${postData.url}`}>
                    <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${postData.image}`}
                        alt={postData.title}
                        width={400}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            </div>

            <CardHeader className="pb-2">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                    <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-blue-600" />
                        {postData.created}
                    </span>
                    <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-blue-600" />
                        {postData.time_read}
                    </span>
                </div>
                <CardTitle className="line-clamp-2 text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    <Link href={`${postData.url}`}>{postData.title}</Link>
                </CardTitle>
            </CardHeader>
            
            <CardContent className="py-2">
                <CardDescription className="line-clamp-3 text-gray-600 mb-4">{postData.body}</CardDescription>
                <Link href={`${postData.url}`} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    Read More <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </CardContent>

            <CardFooter className="pt-2 pb-4 flex flex-wrap gap-2 border-t border-gray-100 mt-2">
                {tags && tags.length > 0 ? (
                    <>
                        <Tag className="h-4 w-4 text-blue-600 mr-1" />
                        {tags.map((tag: string) => (
                            <Link
                                key={`${tag}-${generateRandomKeyPart()}`}
                                href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                                className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                            >
                                {tag}
                            </Link>
                        ))}
                    </>
                ) : null}
            </CardFooter>
        </>
    )
}
    
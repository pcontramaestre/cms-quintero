// components/blog/card-article.tsx
'use client'
import { Clock } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
            <div className="aspect-video w-full overflow-hidden">                
                    <Link href={`${postData.url}`}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${postData.image}`}
                            alt={postData.title}
                            width={400}
                            height={200}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                    </Link>
            </div>

            <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{postData.created}</span>
                    <span>•</span>
                    <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {postData.time_read}
                    </span>
                </div>
                <CardTitle className="line-clamp-2 hover:text-blue-600 flex items-center title-article">
                    <Link href={`${postData.url}`}>{postData.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-3 description-article">{postData.body}</CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-wrap gap-2">
                {tags?.map((tag: string) => (
                    <Link
                    key={`${tag}-${generateRandomKeyPart()}`}
                    href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                    {tag}
                    </Link>
                ))}
            </CardFooter>
        </>
    )
}
    
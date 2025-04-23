import { Clock, Link as LinkIcon } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { randomInt } from "crypto";

interface Article {
  title: string;
  image: string;
  created: string;
  changed: string;
  time_read: string;
  body: string;
  tags: string;
  nid: string;
  url: string;
}


  export default async function CardArticle({ postData }: { postData: Article }) {
    // Add 2 seconds delay to simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    const tags = postData.tags.split(',').map((tag: string) => tag.trim());
    
    return (
        <>
            <div className="aspect-video w-full overflow-hidden">
                <Image
                    src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${postData.image}`}
                    alt={postData.title}
                    width={400}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
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
                <CardTitle className="line-clamp-2 hover:text-blue-600 flex items-center">
                    <Link href={`/blog/${postData.nid}`}>{postData.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">{postData.body}</CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                    <Link
                    key={tag+randomInt(1, 100).toString()}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                    {tag}
                    </Link>
                ))}
            </CardFooter>
        </>
    )
}
    
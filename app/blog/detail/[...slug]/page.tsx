
import { getPostBySlug } from "@/data/data-blog";
import Image from "next/image"; 
import { Body } from "@/components/body";
import { Clock, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
interface PageParams {
    params: {
      slug: string;
    };
  }

export default async function BlogPostPage({ params }: PageParams) {
    const awaitedParams = await params;

    const post = await getPostBySlug(awaitedParams.slug);
    
    return (
        <div className="container mx-auto py-8">
            { post && ( 
                <div className="space-y-4">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${post.field_imagen_principal_del_post?.uri?.url}`}
                        alt={post.title}
                        width={1336}
                        height={400}
                        quality={80}
                        priority
                        className="max-h-[400px] w-full object-cover aspect-[16/9]"
                    />
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <div className="text-gray-600 flex items-center gap-2">
                        <span><Calendar className="inline" /> {formatDate(post.created)}</span>
                        <span>•</span>
                        <Clock className="inline" /> {post.field_time_min_read} min read
                    </div>
                    <Body value={post.body?.processed || ""} />
                </div>
            )}
        </div>
    )
}

export async function getStaticPaths() {
    return { paths: [{ params: { slug: "" } }], fallback: true }
}
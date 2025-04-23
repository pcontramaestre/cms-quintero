
import { getPostBySlug } from "@/data/data-blog";
import Image from "next/image"; 
import { Body } from "@/components/body";

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
                        src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${post.field_image?.uri?.url}`}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="max-h-[400px] w-full object-cover"
                    />
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <Body value={post.body?.processed || ""} />
                </div>
            )}
        </div>
    )
}

export async function getStaticPaths() {
    return { paths: [{ params: { slug: "" } }], fallback: true }
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {getTags} from "@/data/data-blog";
import Link from "next/link";
import { Tag } from "lucide-react";


  export default async function TagsCard() {
    
    const tagsData = await getTags();    
    return (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tagsData.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog${tag.path.alias}`}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
    )
  }

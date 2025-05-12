// components/blog/tags.tsx
'use client';

import { CardContent } from "@/components/ui/card";
import { getTags } from "@/data/data-blog"; 
import Link from "next/link";
import { Tag, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import CardTagsSkeleton from "../skeleton/car-tags";

interface TagData {
    id: string; // UUID
    name: string;
    path: { // El campo 'path' es un objeto
        alias: string; // El alias de URL está dentro de 'path'
        pid: number;
        langcode: string;
    };
}

export default function TagsCard() {
    const [tagsData, setTagsData] = useState<TagData[] | null>(null)
    useEffect(() => {
        async function fetchTags() {
            try {
                const data = await getTags();
                setTagsData(data);
            } catch (error) {
                console.error("Error fetching tags:", error);
                setTagsData([]);
            }
        }

        fetchTags();

    }, []);

    if (tagsData === null) {
        return <CardTagsSkeleton />;
    }

    if (tagsData.length === 0) {
        return <CardTagsSkeleton />;
    }

    return (
        <CardContent className="pt-2"> 
            <div className="flex flex-wrap gap-2">
                {tagsData.map((tag: TagData) => ( 
                    <Link
                        key={tag.id} 
                        href={`/blog${tag.path.alias}`}
                        className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow group"
                    >
                        <Tag className="mr-1.5 h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200" />
                        {tag.name}
                    </Link>
                ))}
            </div>
            
            {/* {tagsData.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link 
                        href="/blog/tags"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                        View all tags <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            )} */}
        </CardContent>
    );
}

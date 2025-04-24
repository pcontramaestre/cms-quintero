// components/blog/tags.tsx
'use client';

import { CardContent } from "@/components/ui/card";
import { getTags } from "@/data/data-blog"; 
import Link from "next/link";
import { Tag } from "lucide-react";
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
        <CardContent> 
            <div className="flex flex-wrap gap-2">
                {tagsData.map((tag: TagData) => ( 
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
    );
}

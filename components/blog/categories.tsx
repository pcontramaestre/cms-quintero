// components/blog/categories.tsx
'use client';
import {CardContent} from "@/components/ui/card";
import {getCategories} from "@/data/data-blog";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Folder, ChevronRight } from "lucide-react";
import CardTagsSkeleton from "../skeleton/car-tags";

interface CategoryApi {
    uuid: string;
    name: string;
    cantidad: string;
    url: string;
}

export default function CategoriesCard() {
    const [categoriesData, setCategoriesData] = useState<CategoryApi[] | null>(null)
    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                setCategoriesData(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategoriesData([]);
            }
        }
        fetchCategories();
    }, []);

    if (categoriesData === null) {
        return <CardTagsSkeleton />;
    }

    if (categoriesData.length === 0) {
        return <CardTagsSkeleton />;
    }

    return (
        <CardContent>
            <ul className="space-y-3">
              {categoriesData.map((category) => (
                    <li key={category.uuid}>
                        <Link 
                            href={`/blog${category.url}`}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 group">
                            <div className="flex items-center">
                                <Folder className="mr-2 h-4 w-4 text-blue-600" />
                                <span className="text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
                                    {category.name}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 mr-1">
                                    {category.cantidad}
                                </span>
                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </Link>
                    </li>
                ))
            } 
            </ul>
        </CardContent>
    )
}

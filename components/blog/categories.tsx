// components/blog/categories.tsx
'use client';
import {CardContent} from "@/components/ui/card";
import {getCategories} from "@/data/data-blog";
import Link from "next/link";
import { useState, useEffect } from "react";
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
            <ul className="space-y-2">
              {categoriesData.map((category) => (
                    <li key={
                        category.uuid
                    }>
                        <Link href={
                                `/blog${
                                    category.url
                                }`
                            }
                            className="flex items-center justify-between hover:text-emerald-600">
                            <span>{
                                category.name
                            }</span>
                            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                                {category.cantidad}
                            </span>
                        </Link>
                    </li>
                ))
            } 
            </ul>
        </CardContent>
    )
}

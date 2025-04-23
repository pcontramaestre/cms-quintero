import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {getCategories} from "@/data/data-blog";
import Link from "next/link";


export default async function CategoriesCard() {
    const categoriesData = await getCategories();
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

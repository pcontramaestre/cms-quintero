import drupal from "@/lib/drupal";
import type { DrupalNode, DrupalTaxonomyTerm } from "@/lib/drupalTypes";
import { json } from "stream/consumers";

interface DrupalPathAlias {
    alias: string;
    pid: number;
    langcode: string;
}

interface DescriptionTaxonomyTerm {
    value: string;
    format: string;
    processed: string;
}

interface TaxonomyTerm extends DrupalTaxonomyTerm {
    id: string;
    drupal_internal__tid: string;
    name: string;
    description: DescriptionTaxonomyTerm;
    weight: number;
    path: DrupalPathAlias;
}

interface CategoryApi {
    uuid: string;
    name: string;
    cantidad: string;
    url: string;
}


interface tags extends DrupalTaxonomyTerm {
    id: string;
    name: string;
}
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

interface Post extends DrupalNode {
    title: string;
    body?: {
        value: string;
        summary?: string;
        processed?: string;
    };
    field_image?: {
        uri?: {
            url: string;
        };
        resourceIdObjMeta?: {
            alt?: string;
        };
    };
    field_imagen_principal_del_post?: {
        uri?: {
            url: string;
        };
        resourceIdObjMeta?: {
            alt?: string;
        };
    };
    field_nombre_corto?: string;
    field_time_min_read?: string;
    field_tags?: Array < tags >;
    field_categories?: Array < tags >;
}

const DRUPAL_BASE_URL = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;
const BASIC_AUTH_USER = process.env.DRUPAL_API_USER;
const BASIC_AUTH_PASSWORD = process.env.DRUPAL_API_PASSWORD;

const credentials = `${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`;
const encodedCredentials = Buffer.from(credentials).toString('base64');

export async function getBlogPosts() : Promise<Article[]> {
    try {
        const REST_EXPORT_PATH = "/api/v1/posts";
        const url = `${DRUPAL_BASE_URL}${REST_EXPORT_PATH}`;

        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `Basic ${encodedCredentials}`
            },
            next: {
                revalidate: 60,
            }
        };
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const postsData: Article[] = await response.json();

        return postsData;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const slugPath = "/blog/detail/" + slug;
        const article = await drupal.getResourceByPath<DrupalNode>(
            slugPath,
            {
                params: {
                    "include": "field_image,field_categories,field_tags, field_imagen_principal_del_post",
                    "fields[node--article]": "id,langcode,created,changed,field_imagen_principal_del_post,title,body,field_tags,field_categories,field_time_min_read,field_image" 
                },
                withAuth: {
                    username: process.env.DRUPAL_USERNAME as string,
                    password: process.env.DRUPAL_PASSWORD as string,
                },
            }
        );

        if (!article) {
            console.warn(`Artículo no encontrado o inaccesible por path: ${slugPath}`);
            return null;
        }

        return article;
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
    }
}




export async function getCategories() {
    try {
        const REST_EXPORT_PATH = "/api/v1/categorias";
        const url = `${DRUPAL_BASE_URL}${REST_EXPORT_PATH}`;
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `Basic ${encodedCredentials}`
            }
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categoriesData = await response.json();
        return categoriesData as CategoryApi[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [
            { uuid: "1", name: "", cantidad: "", url: "" },  
        ];
    }
}

export async function getTags() {
    try {
    const tags = await drupal.getResourceCollection < TaxonomyTerm[] > (
        "taxonomy_term--tags",
        {
            params: {
                "filter[status]": "1",
                "sort": "weight",
                "fields[taxonomy_term--tags]": "id,name,path",
            }
        }
    );
    return tags;
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}
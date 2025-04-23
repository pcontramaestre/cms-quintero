import drupal from "@/lib/drupal";
import type { DrupalTaxonomyTerm } from "@/lib/drupalTypes";
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
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, Search, Tag } from "lucide-react"
import type { Metadata } from "next"
import drupal from "@/lib/drupal";
import type { DrupalNode } from "@/lib/drupalTypes";
import CategoriesCard from "@/components/blog/categories"
import { Suspense } from "react"
import CardCategoriesSkeleton from "@/components/skeleton/card-categories"
import CardTagsSkeleton from "@/components/skeleton/car-tags"
import TagsCard from "@/components/blog/tags"
import CardArticle from "@/components/blog/card-article"
import CardArticleSkeleton from "@/components/skeleton/card-article"
import { getBlogPosts } from "@/data/data-blog";

export const metadata: Metadata = {
  title: "Blog | Quintero and Associates",
  description: "Insights and updates on accounting, tax, and business topics",
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



// Mock blog post data
const blogPosts = [
  {
    id: 1,
    title: "Tax Planning Strategies for Small Businesses",
    excerpt:
      "Effective tax planning strategies can help small businesses minimize their tax liability and maximize their financial resources.",
    date: "April 15, 2025",
    readTime: "5 min read",
    author: "Maria Quintero",
    tags: ["Tax Planning", "Small Business"],
    slug: "tax-planning-strategies-small-businesses",
  },
  {
    id: 2,
    title: "Understanding the New Tax Law Changes",
    excerpt:
      "Recent tax law changes have significant implications for individuals and businesses. Here's what you need to know.",
    date: "March 28, 2025",
    readTime: "7 min read",
    author: "David Rodriguez",
    tags: ["Tax Law", "Tax Updates"],
    slug: "understanding-new-tax-law-changes",
  },
  {
    id: 3,
    title: "5 Bookkeeping Tips for Entrepreneurs",
    excerpt:
      "Proper bookkeeping is essential for business success. These tips will help entrepreneurs maintain accurate financial records.",
    date: "March 15, 2025",
    readTime: "4 min read",
    author: "Jennifer Lee",
    tags: ["Bookkeeping", "Entrepreneurship"],
    slug: "bookkeeping-tips-entrepreneurs",
  },
  {
    id: 4,
    title: "The Importance of Cash Flow Management",
    excerpt: "Cash flow management is critical for business survival. Learn how to effectively manage your cash flow.",
    date: "February 28, 2025",
    readTime: "6 min read",
    author: "Michael Johnson",
    tags: ["Cash Flow", "Financial Management"],
    slug: "importance-cash-flow-management",
  },
  {
    id: 5,
    title: "Preparing for an IRS Audit",
    excerpt:
      "An IRS audit can be stressful, but proper preparation can make the process smoother. Here's how to prepare.",
    date: "February 15, 2025",
    readTime: "8 min read",
    author: "Sarah Thompson",
    tags: ["IRS Audit", "Tax Compliance"],
    slug: "preparing-irs-audit",
  },
  {
    id: 6,
    title: "Business Entity Selection: Which is Right for You?",
    excerpt:
      "Choosing the right business entity is a critical decision. Learn about the pros and cons of different entity types.",
    date: "January 30, 2025",
    readTime: "9 min read",
    author: "Maria Quintero",
    tags: ["Business Formation", "Legal Structure"],
    slug: "business-entity-selection",
  },
]

// Mock categories
const categories = [
  { name: "Tax Planning", count: 12 },
  { name: "Accounting", count: 8 },
  { name: "Business Strategy", count: 10 },
  { name: "Financial Planning", count: 6 },
  { name: "Compliance", count: 5 },
]

// Mock popular tags
const popularTags = [
  "Tax Planning",
  "Small Business",
  "Accounting",
  "Bookkeeping",
  "Tax Law",
  "Financial Management",
  "Business Growth",
  "IRS",
  "Cash Flow",
  "Entrepreneurship",
]

export default async function BlogPage() {
  const blogPosts: Article[] = await getBlogPosts();
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Blog</h1>
          <p className="mt-4 text-xl text-gray-500">Insights and updates on accounting, tax, and business topics</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {blogPosts.map((post) => (
                <Card key={post.nid} className="overflow-hidden">
                <Suspense fallback={<CardArticleSkeleton />}>
                  <CardArticle postData={post} />
                </Suspense>
                </Card>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search articles..." className="pl-8" />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
            <CardHeader>
                <CardTitle>Categories</CardTitle>
            </CardHeader>
            <Suspense fallback={<CardCategoriesSkeleton />}>
              <CategoriesCard />
            </Suspense>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <Suspense fallback={<CardTagsSkeleton />}>
                <TagsCard />
              </Suspense>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Subscribe to Newsletter</CardTitle>
                <CardDescription>Get the latest articles and business updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input type="email" placeholder="Your email address" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

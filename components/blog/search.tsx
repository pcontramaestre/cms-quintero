'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchCard() {
    return (
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
    );
}


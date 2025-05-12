// components/blog/search.tsx
'use client'; // Indica que este es un componente cliente

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Tag } from "lucide-react";
import { useState, useEffect } from "react"; // Importa useState si quieres manejar estado interno del input (opcional)

// Define las props que recibirá SearchCard
interface SearchCardProps {
    onSearchChange: (query: string) => void; // Función que recibe el string de búsqueda
}

export default function SearchCard({ onSearchChange }: SearchCardProps) {
    // Estado para manejar el valor del input y animación
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Función que se llama cuando cambia el valor del input
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setInputValue(query);
        onSearchChange(query); // Llama a la función prop para notificar al padre
    };
    
    // Manejar el enfoque del input
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute h-1 w-full bg-blue-600 top-0"></div>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-xl font-bold text-gray-900">Search Articles</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${isFocused ? 'text-blue-600' : 'text-gray-400'}`} />
                    <Input
                        type="search"
                        placeholder="Search articles..."
                        className="pl-10 py-6 border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg shadow-sm hover:shadow transition-all duration-300"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={inputValue}
                    />
                </div>
                {inputValue && (
                    <p className="mt-2 text-sm text-gray-500">Showing results for "{inputValue}"</p>
                )}
            </CardContent>
        </Card>
    );
}
// components/blog/search.tsx
'use client'; // Indica que este es un componente cliente

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react"; // Importa useState si quieres manejar estado interno del input (opcional)

// Define las props que recibirá SearchCard
interface SearchCardProps {
    onSearchChange: (query: string) => void; // Función que recibe el string de búsqueda
}

export default function SearchCard({ onSearchChange }: SearchCardProps) {

    // Opcional: Si quieres manejar el estado del input internamente antes de llamar a onSearchChange
    // const [inputValue, setInputValue] = useState('');

    // Función que se llama cuando cambia el valor del input
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        // setInputValue(query); // Si usas estado interno
        onSearchChange(query); // Llama a la función prop para notificar al padre
    };

    return (
        <Card className="border-none shadow-[0px_4px_19px_5px_rgba(0,_0,_0,_0.1)]">
            <CardHeader>
                <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="pl-8"
                    onChange={handleChange} // Asocia la función al evento onChange
                    // value={inputValue} // Si usas estado interno
                   />
                </div>
            </CardContent>
        </Card>
    );
}
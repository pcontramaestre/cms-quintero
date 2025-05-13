"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Building2, LogOut, Plus } from "lucide-react";


export default function DashboardPage() {
    const router = useRouter();

const handleSignOut = async () => {
    await signOut();
    router.push("/auth/signin");
  };
    return (
        <div>
            <h2>Dashboard</h2>
            <Button 
          variant="outline" 
          className="mt-8"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
        </div>
    )
}

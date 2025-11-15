import Navigation from "./Navigation";
import { TriangleAlert } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <TriangleAlert className="mx-auto mb-4 text-yellow-500" size={48} />
                    <h2 className="text-2xl font-semibold mb-2">Acceso denegado</h2>
                    <p className="text-gray-700 mb-4">No tienes permiso para acceder a esta página. Por favor, <a href="/auth" className="text-indigo-600 hover:underline">inicia sesión</a>.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
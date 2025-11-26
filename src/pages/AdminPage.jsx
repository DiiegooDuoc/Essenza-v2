// Essenza-V2/src/pages/AdminPage.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
    const { userRole } = useAuth();
    
    // Esta página solo debería ser vista si el rol es ADMIN,
    // gracias al ProtectedRoute en App.jsx (Punto 9d)

    return (
        <div className="container py-5">
            <h1 className="display-4 fw-bold mb-4 text-primary">Panel de Administración</h1>
            <p className="lead">Bienvenido, {userRole}. Aquí puedes gestionar productos y usuarios.</p>
            
            <div className="alert alert-info">
                <strong>Punto 9d Cumplido:</strong> Esta vista está protegida. Si fueras CLIENTE o no estuvieras logueado, serías redirigido.
            </div>

            <div className="card shadow-sm p-4 mt-4">
                <h2 className="h4">Gestión de Productos (CRUD - Punto 8)</h2>
                <p>Aquí se implementarían las interfaces para Crear, Actualizar y Eliminar productos usando los endpoints protegidos del backend.</p>
                {/* Aquí iría el formulario de creación de productos */}
            </div>

        </div>
    );
};

export default AdminPage;
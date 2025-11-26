// Essenza-V2/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, logout, getCurrentAuthData } from '../services/ApiService'; 

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    // Inicializa el estado leyendo de localStorage (Punto 9c - Mantener sesión)
    const initialAuthData = getCurrentAuthData();

    const [isAuthenticated, setIsAuthenticated] = useState(!!initialAuthData.token);
    const [userRole, setUserRole] = useState(initialAuthData.role || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para manejar el inicio de sesión
    const handleLogin = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            // Llama al servicio de backend
            const data = await login(email, password); 
            
            // Actualiza el estado global
            setIsAuthenticated(true);
            setUserRole(data.role);
            setLoading(false);
            
            // Retorna los datos para que el componente de login sepa que fue exitoso
            return data; 
        } catch (err) {
            setError(err.message || 'Error de conexión o credenciales inválidas.');
            setLoading(false);
            return null;
        }
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout(); // Limpia localStorage
        setIsAuthenticated(false);
        setUserRole(null);
    };

    // Determina si el usuario tiene un rol específico (Punto 9d)
    const hasRole = (roleName) => {
        return userRole === roleName;
    };

    const value = {
        isAuthenticated,
        userRole,
        loading,
        error,
        login: handleLogin,
        logout: handleLogout,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
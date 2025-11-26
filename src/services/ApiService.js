// Essenza-V2/src/services/ApiService.js
// Archivo que hace las llamadas REST al Backend de Spring Boot (Punto 8)

const API_BASE_URL = 'http://localhost:8080/api/v1'; 

// --- Funciones de Utilidad ---
const getAuthData = () => {
    const token = localStorage.getItem('token'); 
    const role = localStorage.getItem('role');
    return { token, role };
};

const createHeaders = (isProtected = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (isProtected) {
        const { token } = getAuthData();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`; 
        }
    }
    return headers;
};

// --- CRUD de PRODUCTOS (Punto 8b) ---
export const getProductos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos`, {
            method: 'GET',
            headers: createHeaders(false),
        });
        if (!response.ok) {
            throw new Error('Error al cargar productos del Backend.');
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const createProducto = async (productoData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos`, { 
            method: 'POST',
            headers: createHeaders(true), 
            body: JSON.stringify(productoData),
        });
        if (!response.ok) {
            if (response.status === 403) {
                 throw new Error('Acceso denegado. Se requiere rol ADMIN.'); 
            }
            throw new Error('Error al crear el producto.');
        }
        return response.json();
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// --- Autenticación (Punto 9) ---

// LOGIN: Iniciar sesión
export const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: createHeaders(false),
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(errorDetail || 'Credenciales incorrectas.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('role', data.role);
    return data;
};

// REGISTER: Registrar nuevo usuario (¡ESTO ES LO QUE FALTABA O ESTABA MAL EXPORTADO!)
export const register = async (userData) => { // <-- Aseguramos la exportación
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: createHeaders(false),
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(errorDetail || 'Error al registrar el usuario.');
    }

    return response.text(); 
};


// LOGOUT: Cerrar sesión
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

// Devuelve los datos de autenticación del usuario actual (Punto 9d)
export const getCurrentAuthData = getAuthData;
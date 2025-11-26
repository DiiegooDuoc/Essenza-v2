import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { register } from '../services/ApiService'; // Importamos la función de registro

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [isLoginView, setIsLoginView] = useState(true);
    const [formData, setFormData] = useState({ 
        email: '', password: '', nombre: '', apellido: '', telefono: '', direccion: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Maneja los cambios en los inputs del formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Función de Validación de Formularios (Punto 2a y 2b)
    const validateForm = (isLogin) => {
        setError(''); // Limpiar errores previos
        
        // Validación de campos comunes (Email y Password)
        if (!formData.email || !formData.password) {
            setError('El email y la contraseña son obligatorios.');
            return false;
        }

        // Validación específica de Email (Mensaje de error claro - Punto 2b)
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Formato de email inválido. Verifique su dirección.'); 
            return false;
        }
        
        // Validación de campos de Registro (Punto 2a)
        if (!isLogin) {
            if (!formData.nombre || !formData.apellido || !formData.telefono || !formData.direccion) {
                setError('Todos los campos de registro son obligatorios y deben estar completos.');
                return false;
            }
            if (formData.password.length < 6) {
                 setError('La contraseña debe tener al menos 6 caracteres.'); 
                 return false;
            }
            if (!/^\d{8,11}$/.test(formData.telefono)) {
                setError('Formato de teléfono inválido (solo números, 8-11 dígitos).');
                return false;
            }
        }
        return true;
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        if (!validateForm(isLoginView)) {
            setLoading(false);
            return;
        }

        try {
            if (isLoginView) {
                // Lógica de LOGIN (Punto 9)
                const result = await login(formData.email, formData.password);
                if (result) {
                    setMessage('Inicio de sesión exitoso. Redirigiendo...');
                    setTimeout(() => navigate('/'), 1000); // Redirige a Home
                }
            } else {
                // Lógica de REGISTRO (Punto 9)
                await register(formData);
                setMessage('Registro exitoso! Por favor, inicia sesión.');
                // Cambiar a vista de Login para que el usuario ingrese
                setIsLoginView(true); 
                setFormData({ email: formData.email, password: '', nombre: '', apellido: '', telefono: '', direccion: '' });
            }
        } catch (err) {
            setError(err.message || 'Error al procesar la solicitud.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <h2 className="card-title text-center mb-4 fw-bold">
                                {isLoginView ? 'Iniciar Sesión' : 'Registrarse'}
                            </h2>

                            {message && <div className="alert alert-success text-center">{message}</div>}
                            {error && <div className="alert alert-danger text-center">{error}</div>}

                            <form onSubmit={handleSubmit} noValidate>
                                
                                {/* Campos Comunes: Email y Password */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    {/* Atributo autocomplete="username" ayuda con el Punto 2 (Elementos apropiados) */}
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" autoComplete="username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" autoComplete={isLoginView ? 'current-password' : 'new-password'} required />
                                </div>

                                {/* Campos de Registro (Solo si no es Login) */}
                                {!isLoginView && (
                                    <>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control" required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="apellido" className="form-label">Apellido</label>
                                                <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="telefono" className="form-label">Teléfono</label>
                                            <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="direccion" className="form-label">Dirección</label>
                                            <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} className="form-control" required />
                                        </div>
                                    </>
                                )}

                                <button type="submit" className="btn btn-dark-custom w-100 mt-3" disabled={loading}>
                                    {loading ? 'Procesando...' : isLoginView ? 'Ingresar' : 'Registrar'}
                                </button>
                            </form>

                            <p className="text-center mt-4">
                                {isLoginView ? 
                                    (
                                        <a href="#" onClick={(e) => {e.preventDefault(); setIsLoginView(false); setError(''); setMessage('');}} className="text-decoration-none">
                                            ¿No tienes cuenta? Regístrate aquí.
                                        </a>
                                    ) : (
                                        <a href="#" onClick={(e) => {e.preventDefault(); setIsLoginView(true); setError(''); setMessage('');}} className="text-decoration-none">
                                            ¿Ya tienes cuenta? Inicia sesión.
                                        </a>
                                    )
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
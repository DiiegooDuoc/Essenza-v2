// Essenza-V2/src/pages/HomePage.jsx (FINAL CORREGIDO)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/ApiService'; 
// import ProductCard from '../components/ProductCard'; // Descomenta si usas tu ProductCard

const HomePage = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Llama al backend para obtener la lista de productos (Punto 8b)
                const data = await getProductos(); 
                setProductos(data.slice(0, 4)); 
                setLoading(false);
            } catch (err) {
                // Muestra un error amigable si el backend no está corriendo.
                setError('Error de conexión con el Backend: Asegúrate que Essenza-Backend esté corriendo en http://localhost:8080. Productos no cargados.');
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    // Componente de Producto Temporal (Asegúrate de que ProductCard.jsx exista o usa este)
    const HomeProductCard = ({ producto }) => (
        <div className="col-md-3 mb-4">
            <div className="card shadow-sm h-100">
                <img 
                    src={producto.imagenUrl || `https://placehold.co/400x400/000000/FFFFFF?text=${producto.nombre}`} 
                    className="card-img-top" 
                    alt={producto.nombre} 
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h5 className="card-title fw-bold">{producto.nombre}</h5>
                    {/* El backend devuelve Double, usamos toLocaleString para formato de moneda */}
                    <p className="card-text text-muted">${producto.precio ? producto.precio.toLocaleString('es-CL') : '0'}</p> 
                    <Link to={`/perfume/${producto.id}`} className="btn btn-sm btn-dark-custom">
                        Ver Detalle
                    </Link>
                </div>
            </div>
        </div>
    );


    return (
        <>
            {/* 1. Sección de Encabezado (Esto siempre debe aparecer) */}
            <header className="p-5 text-center bg-light border-bottom mb-5">
                <div className="container">
                    <h1 className="display-4 fw-bold mb-3">
                        Bienvenido a Essenza - TiendaOnline
                    </h1>
                    <p className="lead text-muted mb-4">
                        Tu destino para los mejores perfumes. Descubre nuestra exclusiva selección de fragancias de alta calidad.
                    </p>
                    
                    <Link to="/catalogo" className="btn btn-lg shadow-sm btn-dark-custom">
                        Ver Catálogo
                    </Link>
                </div>
            </header>

            {/* 2. Sección de Productos Destacados del Backend (Punto 8) */}
            <div className="container py-5">
                <h2 className="fs-3 fw-bold section-title-custom text-center mb-5">
                    Fragancias en Destacado
                </h2>
                
                {loading && <div className="text-center alert alert-info">Cargando destacados...</div>}
                {error && <div className="alert alert-danger text-center">{error}</div>}
                
                {/* Muestra los productos cargados del backend */}
                {!loading && !error && productos.length > 0 && (
                    <div className="row justify-content-center">
                        {productos.map(producto => (
                            <HomeProductCard key={producto.id} producto={producto} />
                        ))}
                    </div>
                )}
                
                {/* Mensaje si no hay productos (si la conexión fue exitosa pero la tabla está vacía) */}
                {!loading && !error && productos.length === 0 && (
                     <div className="text-center text-muted alert alert-warning">
                         Conexión exitosa, pero la base de datos no contiene productos aún.
                     </div>
                )}
                
                <div className="text-center mt-4">
                    <Link to="/catalogo" className="btn btn-outline-dark-custom">
                        Ver todo el Catálogo
                    </Link>
                </div>
            </div>

            {/* 3. Sección Tu Destino / Acerca de Nosotros (Contenido fijo) */}
            <div className="content-section-wrapper py-4 container"> 
                <div className="row g-5"> 
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h2 className="fs-3 fw-bold section-title-custom">Tu destino para los mejores perfumes</h2>
                        <p className="fw-bold mb-4">
                            "El perfume anuncia la llegada de una persona y prolonga su partida"
                        </p>
                        <ul className="list-unstyled">
                            <li className="mb-2">Perfumes 100% originales</li> 
                            <li className="mb-2">Envío rápido y seguro</li>
                            <li className="mb-2">Asesoramiento personalizado</li>
                        </ul>
                        <p className="mt-4">
                            En Essenza, entendemos que cada persona es única y tiene sus propias preferencias. Por eso, ofrecemos un servicio de
                            asesoramiento personalizado...
                            <span className="fw-bold"> ¡Explora nuestra colección y encuentra tu fragancia ideal!</span>
                        </p>
                    </div>

                    <div className="col-lg-6">
                        <h2 className="fs-3 fw-bold section-title-custom">Acerca de Nosotros</h2>
                        <p>
                            En Essenza, nos apasionan los perfumes y nos dedicamos a ofrecer la mejor experiencia de compra...
                        </p>
                    </div>
                </div>
            </div>
            
            {/* 4. Sección de Contacto (Contenido fijo) */}
            <div className="content-section-wrapper py-5 container">
                <h2 className="section-title-custom">Contacto</h2>
                <p className="mb-4">Si tienes alguna pregunta, sugerencias o comentarios, o preguntar por un producto, no dudes en ponerte en contacto con nosotros.</p>
                <div className="mb-4">
                    <p className="mb-1"><strong>Email:</strong> contacto@essenza.com</p>
                    <p className="mb-1"><strong>Teléfono:</strong> +56 9 1234 5678</p>
                    <p className="mb-1"><strong>Dirección:</strong> Av. Perfumes 123, Santiago, Chile</p>
                    <p className="mb-1"><strong>Horario de atención:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
                </div>
                
                <p className="mb-3">También puedes seguirnos en nuestras redes sociales:</p>
                
                <div className="d-flex gap-3 mb-5">
                    <a href="#" className="fw-bold text-dark text-decoration-none">Facebook</a>
                    <a href="#" className="fw-bold text-dark text-decoration-none">Instagram</a>
                    <a href="#" className="fw-bold text-dark text-decoration-none">Twitter</a>
                </div>
                
                <div className="map-placeholder border shadow-sm" style={{height: '300px', width: '100%', backgroundColor: '#eee'}}>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.123456789012!2d-70.648123456789!3d-33.456123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c12345678901%3A0x1234567890abcdef!2sAv.%20Perfumes%20123%2C%20Santiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1612345678901!5m2!1ses!2scl" 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default HomePage;
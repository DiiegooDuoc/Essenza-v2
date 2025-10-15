import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      {/* 1. SECCIÓN PRINCIPAL (HERO) */}
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

      {/* 2. SECCIÓN DE INFORMACIÓN Y BENEFICIOS */}
      <div className="content-section-wrapper py-4"> {/* Usamos el contenedor para centrar y limitar ancho */}
        <div className="row g-5"> 
          
          {/* Columna Izquierda: Tu destino para los mejores perfumes */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="fs-3 fw-bold section-title-custom">
              Tu destino para los mejores perfumes
            </h2>
            
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

          {/* Columna Derecha: Acerca de Nosotros */}
          <div className="col-lg-6">
            <h2 className="fs-3 fw-bold section-title-custom">
              Acerca de Nosotros
            </h2>
            <p>
              En Essenza, nos apasionan los perfumes y nos dedicamos a ofrecer la mejor experiencia de compra...
            </p>
          </div>
        </div>
      </div>
      
      {/* 3. NUEVA SECCIÓN DE CONTACTO */}
      <div className="content-section-wrapper py-5">
          <h2 className="section-title-custom">Contacto</h2>
          
          <p className="mb-4">
            Si tienes alguna pregunta, sugerencias o comentarios, o preguntar por un producto, no dudes en ponerte en contacto con nosotros.
          </p>
          
          <div className="mb-4">
            <p className="mb-1"><strong>Email:</strong> contacto@essenza.com</p>
            <p className="mb-1"><strong>Teléfono:</strong> +56 9 1234 5678</p>
            <p className="mb-1"><strong>Dirección:</strong> Av. Perfumes 123, Santiago, Chile</p>
            <p className="mb-1"><strong>Horario de atención:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
          </div>
          
          <p className="mb-3">También puedes seguirnos en nuestras redes sociales:</p>
          
          {/* Redes Sociales con enlaces y espaciado de Bootstrap */}
          <div className="d-flex gap-3 mb-5">
            <a href="#" className="fw-bold text-dark text-decoration-none">Facebook</a>
            <a href="#" className="fw-bold text-dark text-decoration-none">Instagram</a>
            <a href="#" className="fw-bold text-dark text-decoration-none">Twitter</a>
          </div>
          
          {/* Espacio para el mapa (Puedes incrustar un iframe o usar un placeholder) */}
          <div className="map-placeholder border shadow-sm" style={{height: '300px', width: '100%', backgroundColor: '#eee'}}>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.123456789012!2d-70.648123456789!3d-33.456123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c12345678901%3A0x1234567890abcdef!2sAv.%20Perfumes%20123%2C%20Santiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1612345678901!5m2!1ses!2scl" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
            ></iframe>
            {/* Si no puedes usar iframes, usa el siguiente placeholder: */}
            {/* <div className="p-5 text-center text-muted">Aquí iría el mapa de Google Maps</div> */}
          </div>
      </div>
    </>
  );
};

export default HomePage;
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, getTotalItems } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: 'credit_card'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = 'El nombre es requerido.';
    if (!formData.email.includes('@')) errors.email = 'Email no es válido.';
    if (!formData.address) errors.address = 'La dirección es requerida.';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Orden enviada:", formData);
      setIsSubmitted(true);
      
    } else {
      console.log("Errores de validación:", validationErrors);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mt-5 text-center py-5">
        <h1 className="display-4 text-success">¡Compra Exitosa! 🎉</h1>
        <p className="lead">Tu orden ha sido procesada y será enviada a {formData.address}.</p>
        <p className="fw-bold">Gracias por comprar en Essenza.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Volver al Inicio
        </button>
      </div>
    );
  }

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(0);

  if (cartItems.length === 0) {
    return (
        <div className="container mt-5 text-center py-5">
            <h1>Tu Carrito Está Vacío 😔</h1>
            <p className="lead">No puedes proceder al pago sin artículos.</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/catalogo')}>
                Explorar Catálogo
            </button>
        </div>
    );
  }

  return (
    <div className="content-section-wrapper py-5">
      <h1 className="display-5 fw-bold text-center mb-5">Finalizar Compra</h1>
      
      <div className="row">
        {}
        <div className="col-lg-7">
          <h2 className="section-title-custom">Datos de Envío y Pago</h2>
          <form onSubmit={handleCheckoutSubmit}>
            {}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre Completo</label>
              <input type="text" className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`} id="name" name="name" value={formData.name} onChange={handleFormChange} required />
              {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
            </div>
            {}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`} id="email" name="email" value={formData.email} onChange={handleFormChange} required />
              {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
            </div>
            {}
            <div className="mb-4">
              <label htmlFor="address" className="form-label">Dirección de Envío</label>
              <input type="text" className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`} id="address" name="address" value={formData.address} onChange={handleFormChange} required />
              {validationErrors.address && <div className="invalid-feedback">{validationErrors.address}</div>}
            </div>
            
            {}
            <h3 className="fs-5 mt-4 mb-3">Método de Pago</h3>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="payment" id="credit_card" value="credit_card" checked={formData.payment === 'credit_card'} onChange={handleFormChange} />
              <label className="form-check-label" htmlFor="credit_card">Tarjeta de Crédito / Débito</label>
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="radio" name="payment" id="bank_transfer" value="bank_transfer" checked={formData.payment === 'bank_transfer'} onChange={handleFormChange} />
              <label className="form-check-label" htmlFor="bank_transfer">Transferencia Bancaria</label>
            </div>

            <button type="submit" className="btn btn-success btn-lg mt-3 w-100">
              Confirmar Pago y Enviar Orden
            </button>
          </form>
        </div>

        {}
        <div className="col-lg-5">
          <div className="card shadow-sm bg-light p-3 sticky-top" style={{top: '80px'}}>
            <h3 className="section-title-custom">Tu Pedido ({getTotalItems()} artículos)</h3>
            <ul className="list-group list-group-flush mb-3">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="fw-bold">${(item.price * item.quantity).toFixed(0)}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between fw-bold fs-4 border-top pt-3">
              <span>Total Final:</span>
              <span className="text-success">${cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
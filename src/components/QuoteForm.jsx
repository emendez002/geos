import React, { useState } from 'react';
import './QuoteForm.css';

const QuoteForm = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfRxT61Ko6Y1Z1B5PqmPZ0d9KsA91wkg2DHayuTGOAROGxR-g/formResponse";

  const handleSubmit = () => {
    setSubmitted(true);
    // Auto-close or redirect after a few seconds if needed
    setTimeout(() => {
      if (onClose) onClose();
    }, 5000);
  };

  if (submitted) {
    return (
      <div className="quote-success-message">
        <div className="success-icon">✓</div>
        <h2>¡Solicitud Enviada!</h2>
        <p>Hemos recibido tu requerimiento. Un especialista de Geos se pondrá en contacto contigo pronto.</p>
        <button onClick={() => setSubmitted(false)} className="btn-primary">Enviar otra solicitud</button>
      </div>
    );
  }

  return (
    <div className="quote-form-container">
      <div className="form-header">
        <h1>Cotizador de Soluciones Geoespaciales</h1>
        <p>Completa el formulario para recibir una propuesta técnica personalizada.</p>
      </div>

      <form 
        action={formUrl} 
        method="POST" 
        target="hidden_iframe" 
        onSubmit={handleSubmit}
        className="premium-form"
      >
        <div className="form-group">
          <label htmlFor="project">Nombre del Proyecto / Empresa</label>
          <input 
            type="text" 
            id="project" 
            name="entry.1447506012" 
            placeholder="Ej. Levantamiento Hidrográfico Puerto Limón" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría de Interés</label>
          <select id="category" name="entry.1251348165" required>
            <option value="">Selecciona una categoría...</option>
            <option value="Topografía y Geodesia">Topografía y Geodesia</option>
            <option value="Hidrografía y Oceanografía">Hidrografía y Oceanografía</option>
            <option value="Fotogrametría y Drones">Fotogrametría y Drones</option>
            <option value="Software y GIS">Software y GIS</option>
            <option value="Servicios de Impresión 3D">Servicios de Impresión 3D</option>
          </select>
        </div>

        <div className="form-group">
          <label>Especificación de Equipo / Calidad</label>
          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" name="entry.342450411" value="Alta Precisión (Centimétrica)" required />
              <span>Alta Precisión (Centimétrica)</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="entry.342450411" value="Estándar / SIG" />
              <span>Estándar / SIG</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="entry.342450411" value="Educativo / Entrada" />
              <span>Educativo / Entrada</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Servicios y Preferencias Adicionales</label>
          <div className="checkbox-grid">
            <label className="checkbox-option">
              <input type="checkbox" name="entry.940878282" value="Capacitación en Sitio" />
              <span>Capacitación en Sitio</span>
            </label>
            <label className="checkbox-option">
              <input type="checkbox" name="entry.940878282" value="Soporte Técnico Premium" />
              <span>Soporte Técnico Premium</span>
            </label>
            <label className="checkbox-option">
              <input type="checkbox" name="entry.940878282" value="Mantenimiento Preventivo" />
              <span>Mantenimiento Preventivo</span>
            </label>
            <label className="checkbox-option">
              <input type="checkbox" name="entry.940878282" value="Alquiler con Opción a Compra" />
              <span>Alquiler con Opción a Compra</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comments">Observaciones Detalladas</label>
          <textarea 
            id="comments" 
            name="entry.1702742166" 
            placeholder="Describe tus necesidades técnicas específicas..."
            rows="4"
          ></textarea>
        </div>

        <div className="form-acceptance">
          <label className="checkbox-option">
            <input type="checkbox" name="entry.791947649" value="Acepto los términos y condiciones" required />
            <span>Acepto que mis datos sean procesados para la cotización técnica.</span>
          </label>
        </div>

        <button type="submit" className="submit-btn-premium">
          Enviar Requerimiento
          <span className="btn-shine"></span>
        </button>
      </form>

      {/* Hidden iframe to avoid CORS issues and page redirect */}
      <iframe 
        name="hidden_iframe" 
        id="hidden_iframe" 
        style={{ display: 'none' }} 
        title="Form processing"
      ></iframe>
    </div>
  );
};

export default QuoteForm;

import React, { useState } from 'react';
import './QuoteForm.css';

const QuoteForm = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfRxT61Ko6Y1Z1B5PqmPZ0d9KsA91wkg2DHayuTGOAROGxR-g/formResponse";

  const handleSubmit = (e) => {
    // Delay the visual change so the browser has time to initiate the POST to the iframe
    setTimeout(() => {
      setSubmitted(true);
    }, 100);

    // Auto-close after a few seconds if needed
    setTimeout(() => {
      if (onClose && !document.hidden) onClose();
    }, 6000);
  };

  return (
    <div className="quote-form-container">
      {!submitted ? (
        <>
          <div className="form-header">
            <h1>Cotizador de Impresión 3D - Geos Lab</h1>
            <p>Completa el formulario para recibir una propuesta técnica de manufactura aditiva.</p>
          </div>

          <form 
            action={formUrl} 
            method="POST" 
            target="hidden_iframe" 
            onSubmit={handleSubmit}
            className="premium-form"
          >
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="project">Nombre del Proyecto / Empresa</label>
                <input 
                  type="text" 
                  id="project" 
                  name="entry.1447506012" 
                  placeholder="Ej. Prototipo Carcasa Industrial" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="entry.800552490" 
                  placeholder="nombre@empresa.com" 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono de Contacto</label>
              <input 
                type="tel" 
                id="phone" 
                name="entry.2006614892" 
                placeholder="Ej. +506 8888 8888" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría de Material</label>
              <select id="category" name="entry.1251348165" required>
                <option value="">Selecciona una categoría...</option>
                <option value="Materiales Económicos (PLA, PETG, ASA)">Materiales Económicos (PLA, PETG, ASA)</option>
                <option value="Materiales Premium (PC, Nylon, Resina Std)">Materiales Premium (PC, Nylon, Resina Std)</option>
                <option value="Materiales Especiales (Fibra de Carbono, Dental, Joyería)">Materiales Especiales (Fibra de Carbono, Dental, Joyería)</option>
                <option value="Materiales Flexibles">Materiales Flexibles</option>
                <option value="Material propio (Traer filamento o resina)">Material propio (Traer filamento o resina)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Especificación de Material y Calidad</label>
              <div className="radio-group scrollable-radio">
                <label className="radio-option">
                  <input type="radio" name="entry.342450411" value="Económico: Genérico ($15/k)" required />
                  <span>Económico: Genérico ($15/k)</span>
                </label>
                <label className="radio-option">
                  <input type="radio" name="entry.342450411" value="Premium: Genérico ($25/k)" />
                  <span>Premium: Genérico ($25/k)</span>
                </label>
                <label className="radio-option">
                  <input type="radio" name="entry.342450411" value="Resina: Siraya ($70/k)" />
                  <span>Resina: Siraya ($70/k)</span>
                </label>
                <label className="radio-option">
                  <input type="radio" name="entry.342450411" value="Fibra Carbono: Genérico ($40/k)" />
                  <span>Fibra Carbono: Genérico ($40/k)</span>
                </label>
                <label className="radio-option">
                  <input type="radio" name="entry.342450411" value="Flexible: Genérico ($35/k)" />
                  <span>Flexible: Genérico ($35/k)</span>
                </label>
              </div>
              <p className="field-hint">Opciones abreviadas por diseño. Consulta disponibilidad premium en observaciones.</p>
            </div>

            <div className="form-group">
              <label>Servicios y Preferencias Adicionales</label>
              <div className="checkbox-grid">
                <label className="checkbox-option">
                  <input type="checkbox" name="entry.940878282" value="Atención Prioritaria (Inmediatez y urgencia)" />
                  <span>Atención Prioritaria</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="entry.940878282" value="Post-procesado (Acabado final)" />
                  <span>Post-procesado</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="entry.940878282" value="Modelado simple de la pieza" />
                  <span>Modelado simple</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="entry.940878282" value="Sin post-procesado (Costo menor)" />
                  <span>Sin post-procesado</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comments">Observaciones Detalladas (Material Premium, Color, etc.)</label>
              <textarea 
                id="comments" 
                name="entry.1702742166" 
                placeholder="Especifica el color deseado o si requieres una marca premium (Prusament, Polymaker)..."
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
        </>
      ) : (
        <div className="quote-success-message">
          <div className="success-icon">✓</div>
          <h2>¡Solicitud Enviada!</h2>
          <p>Hemos recibido tu requerimiento. Un especialista de Geos se pondrá en contacto contigo pronto.</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">Enviar otra solicitud</button>
        </div>
      )}

      {/* Hidden iframe IS ALWAYS RENDERED TO ENSURE POST FINISHES */}
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

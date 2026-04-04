import React, { useState } from 'react';
import './QuoteForm.css';

const QuoteForm = ({ onClose, metadata }) => {
  const [submitted, setSubmitted] = useState(false);
  
  // URL for 3D Printing Form (Existing)
  const formUrl3D = "https://docs.google.com/forms/d/e/1FAIpQLSfRxT61Ko6Y1Z1B5PqmPZ0d9KsA91wkg2DHayuTGOAROGxR-g/formResponse";
  
  // URL for General Form (IMPORTANT: User must replace this URL)
  const formUrlGeneral = "https://docs.google.com/forms/d/e/NUEVO_FORM_ID/formResponse";

  const is3DMode = !metadata || metadata.categoryName === "Servicios de Impresión 3D";

  const handleSubmit = (e) => {
    // If General Mode, inject traceability into the message field
    if (!is3DMode) {
      // IMPORTANT: User must replace these placeholder entry IDs with real ones from the new form
      const MESSAGE_ENTRY_ID = "entry.ID_MENSAJE"; 
      const messageInput = e.target.querySelector(`[name="${MESSAGE_ENTRY_ID}"]`);
      if (messageInput) {
        const traceability = `\n\n--- [Trazabilidad Interna] ---\nOrigen de Página: ${metadata.categoryName}\nElemento/Botón: ${metadata.productName}\nURL: ${metadata.url}`;
        messageInput.value = messageInput.value + traceability;
      }
    }

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
            {is3DMode ? (
              <>
                <h1>Cotizador de Impresión 3D - Geos Lab</h1>
                <p>Completa el formulario para recibir una propuesta técnica de manufactura aditiva.</p>
              </>
            ) : (
              <>
                <h1>Cotizar {metadata.productName}</h1>
                <p>Solicita información técnica o comercial sobre este producto.</p>
              </>
            )}
          </div>

          <form 
            action={is3DMode ? formUrl3D : formUrlGeneral} 
            method="POST" 
            target="hidden_iframe" 
            onSubmit={handleSubmit}
            className="premium-form"
          >
            {/* Standard Contact Fields */}
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="project">{is3DMode ? "Nombre del Proyecto / Empresa" : "Nombre Completo"}</label>
                <input 
                  type="text" 
                  id="project" 
                  name={is3DMode ? "entry.1447506012" : "entry.ID_NOMBRE"} 
                  placeholder={is3DMode ? "Ej. Prototipo Carcasa Industrial" : "Tu nombre o empresa"} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name={is3DMode ? "entry.800552490" : "entry.ID_EMAIL"} 
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
                name={is3DMode ? "entry.2006614892" : "entry.ID_TELEFONO"} 
                placeholder="Ej. +506 8888 8888" 
                required 
              />
            </div>

            {/* Conditional Content: 3D Printing */}
            {is3DMode ? (
              <>
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
                      <input type="radio" name="entry.342450411" value="Económico: Polymaker ($30/k)" />
                      <span>Económico: Polymaker ($30/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Económico: Prusament ($45/k)" />
                      <span>Económico: Prusament ($45/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Premium: Genérico ($25/k)" />
                      <span>Premium: Genérico ($25/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Premium: Polymaker ($40/k)" />
                      <span>Premium: Polymaker ($40/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Premium: Prusament ($65/k)" />
                      <span>Premium: Prusament ($65/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Resina: Siraya ($70/k)" />
                      <span>Resina: Siraya ($70/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Resina: Prusa ($80/k)" />
                      <span>Resina: Prusa ($80/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Resina Dental ($85/k)" />
                      <span>Resina Dental ($85/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Resina Joyería (Castable) ($60/k)" />
                      <span>Resina Joyería (Castable) ($60/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Fibra Carbono: Genérico ($40/k)" />
                      <span>Fibra Carbono: Genérico ($40/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Fibra Carbono: Prusament PC Blend ($75/k)" />
                      <span>Fibra Carbono: Prusament PC Blend ($75/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Flexible: Genérico ($35/k)" />
                      <span>Flexible: Genérico ($35/k)</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="entry.342450411" value="Flexible: Resina Prusa ($80/k)" />
                      <span>Flexible: Resina Prusa ($80/k)</span>
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
              </>
            ) : (
              /* General Mode Fields */
              <div className="form-group">
                <label htmlFor="message">Mensaje / Requerimiento</label>
                <textarea 
                  id="message" 
                  name="entry.ID_MENSAJE" 
                  placeholder={`Hola, me interesa obtener más información sobre ${metadata.productName}...`}
                  rows="6"
                  required
                ></textarea>
                <p className="field-hint">La trazabilidad del producto se adjuntará automáticamente al enviar.</p>
              </div>
            )}

            <div className="form-acceptance">
              <label className="checkbox-option">
                <input 
                  type="checkbox" 
                  name={is3DMode ? "entry.791947649" : "entry.ID_ACEPTACION"} 
                  value={is3DMode ? "Entiendo y estoy de acuerdo con estos términos" : "Acepto los términos"} 
                  required 
                />
                <span>Entiendo y estoy de acuerdo con estos términos.</span>
              </label>
            </div>

            <button type="submit" className="submit-btn-premium">
              {is3DMode ? "Enviar Requerimiento" : "Solicitar Información"}
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

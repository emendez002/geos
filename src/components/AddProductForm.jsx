import React, { useState } from 'react';
import './AddProductForm.css';

const AddProductForm = ({ categoryName, onClose, onRefresh }) => {
  const [submitted, setSubmitted] = useState(false);
  
  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfCfwJYUe9WZGgONfIZcr0kvE9J7yyn8lIXDW42AT2YFCrjXg/formResponse";
  
  const ENTRY_IDS = {
    seccion: "entry.212367061",
    item: "entry.1216653391",
    descripcion: "entry.435979945",
    imagen: "entry.320511821"
  };

  const handleSubmit = (e) => {
    // Delay visual feedback to allow form POST to hidden iframe
    setTimeout(() => {
      setSubmitted(true);
    }, 150);

    // Auto-close and refresh after a few seconds
    setTimeout(() => {
      if (onRefresh) onRefresh();
      if (onClose) onClose();
    }, 5000);
  };

  return (
    <div className="add-product-overlay">
      <div className="add-product-container glass-panel">
        <button className="btn-close-modal" onClick={onClose}>✕</button>

        {!submitted ? (
          <>
            <div className="add-form-header">
              <h2 className="text-gradient">Nuevo Producto</h2>
              <p>Agrega un nuevo ítem a la categoría <strong>{categoryName}</strong>.</p>
            </div>

            <form 
              action={FORM_URL} 
              method="POST" 
              target="hidden_iframe_add" 
              onSubmit={handleSubmit}
              className="add-product-form"
            >
              <div className="form-group">
                <label htmlFor="seccion">Sección / Categoría</label>
                <input 
                  type="text" 
                  id="seccion" 
                  name={ENTRY_IDS.seccion} 
                  value={categoryName} 
                  readOnly 
                  className="input-readonly"
                />
              </div>

              <div className="form-group">
                <label htmlFor="item">Nombre del Producto</label>
                <input 
                  type="text" 
                  id="item" 
                  name={ENTRY_IDS.item} 
                  placeholder="Ej. Poste de Concreto Reforzado" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción del Ítem</label>
                <textarea 
                  id="descripcion" 
                  name={ENTRY_IDS.descripcion} 
                  placeholder="Describe las especificaciones técnicas..." 
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="imagen">URL Imagen del Producto</label>
                <input 
                  type="url" 
                  id="imagen" 
                  name={ENTRY_IDS.imagen} 
                  placeholder="https://ejemplo.com/imagen.jpg" 
                  required 
                />
                <p className="field-hint">Pega el enlace directo a la imagen.</p>
              </div>

              <button type="submit" className="submit-btn-premium add-btn">
                Guardar Producto
                <span className="btn-shine"></span>
              </button>
            </form>
          </>
        ) : (
          <div className="add-success-content">
            <div className="success-icon">✓</div>
            <h3>¡Producto Registrado!</h3>
            <p>Los datos se han enviado correctamente a Google Sheets.</p>
            <p className="hint-sync">Recuerda presionar "Sincronizar Datos" en la barra de administración para cargarlo en el catálogo.</p>
            <button onClick={onClose} className="btn-primary">Cerrar</button>
          </div>
        )}

        <iframe 
          name="hidden_iframe_add" 
          id="hidden_iframe_add" 
          style={{ display: 'none' }} 
          title="Form submission handler"
        ></iframe>
      </div>
    </div>
  );
};

export default AddProductForm;

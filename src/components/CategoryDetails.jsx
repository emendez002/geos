import './CategoryDetails.css';

const CategoryDetails = ({ category, onBack }) => {
  return (
    <section className="category-details">
      <div className="container">
        <button onClick={onBack} className="btn-back">
          &larr; Volver al catálogo
        </button>
        
        <div className="details-header">
          <div className="details-icon glass-panel">{category.icon}</div>
          <div>
            <h2 className="text-gradient">{category.name}</h2>
            <p>Explora nuestra gama de productos en esta categoría.</p>
          </div>
        </div>

        <div className="products-grid">
          {Array.from({ length: Math.min(category.count, 6) }).map((_, i) => (
            <div key={i} className="product-card glass-panel">
              <div className="product-image-placeholder">
                <span className="placeholder-icon">{category.icon}</span>
              </div>
              <div className="product-info">
                <h3>Producto {category.name} #{i + 1}</h3>
                <p>Equipamiento de alta tecnología diseñado para otorgar máxima precisión.</p>
                <div className="product-actions">
                  <span className="product-price">Cotizar</span>
                  <a href="https://form.jotform.com/231100629098856" target="_blank" rel="noreferrer" className="btn-primary-small">Comprar</a>
                </div>
              </div>
            </div>
          ))}
          {category.count === 0 && (
            <p className="no-products">No hay productos disponibles actualmente en esta categoría.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryDetails;

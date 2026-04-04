import './Categories.css';

const categoryData = [
  { id: 1, name: 'Topográficos', icon: '⛰️', count: 34 },
  { id: 2, name: 'Hidrología', icon: '🌊', count: 8 },
  { id: 3, name: 'Equipos Rugged', icon: '📱', count: 6 },
  { id: 4, name: 'Drones', icon: '🚁', count: 9 },
  { id: 5, name: 'Software', icon: '💻', count: 11 },
  { id: 6, name: 'Servicios por Demanda', icon: '⏳', count: 3 },
];

const Categories = ({ onSelectCategory }) => {
  return (
    <section id="categorias" className="categories">
      <div className="container">
        <div className="section-header">
          <h2>Catálogo de <span className="text-gradient">Productos</span></h2>
          <p>Explora nuestra selección de alta precisión tecnológica</p>
        </div>
        
        <div className="categories-grid">
          {categoryData.map(cat => (
            <div 
              key={cat.id} 
              className="category-card glass-panel"
              onClick={() => onSelectCategory(cat)}
            >
              <div className="cat-icon">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p className="cat-count">{cat.count} items</p>
              <div className="cat-hover-action">Ver productos &rarr;</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './CategoryDetails.css';
import productsData from '../data/products.json';

const SortableProductCard = ({ product, category, config, onOpenQuote, userRole, moveProduct, toggleVisibility }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id, disabled: !userRole });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.6 : 1,
    scale: isDragging ? 1.05 : 1,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`product-card glass-panel ${config.hidden.includes(product.id) ? 'cms-hidden' : ''} ${isDragging ? 'is-dragging' : ''}`}
    >
      <div className="product-image-placeholder">
        {product.image ? (
          <img 
            src={product.image.startsWith('http') ? product.image : `${import.meta.env.BASE_URL}${product.image}`} 
            alt={product.name} 
          />
        ) : (
          <span className="placeholder-icon">{category.icon}</span>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-actions">
          <span className="product-price">Consultar</span>
          <button onClick={() => onOpenQuote(product, category)} className="btn-primary-small">Cotizar Proyecto</button>
        </div>
      </div>

      {userRole && (
        <div className="cms-controls">
          <div className="drag-handle" {...attributes} {...listeners} title="Arrastrar para reordenar">
            ⠿
          </div>
          <button onClick={() => moveProduct(product.id, -1)} title="Mover izquierda/arriba">←</button>
          <button onClick={() => moveProduct(product.id, 1)} title="Mover derecha/abajo">→</button>
          <button onClick={() => toggleVisibility(product.id)} title={config.hidden.includes(product.id) ? "Mostrar" : "Ocultar"}>
            {config.hidden.includes(product.id) ? "👁️‍🗨️" : "👁️"}
          </button>
        </div>
      )}
    </div>
  );
};

const CategoryDetails = ({ category, onBack, onOpenQuote, cmsConfig, userRole, onUpdateConfig }) => {
  const pageId = `cat_${category.name.toLowerCase().replace(/\s+/g, '_')}`;
  const config = cmsConfig?.pages?.[pageId] || { order: [], hidden: [] };
  
  const rawProducts = productsData[category.name] || [];
  
  // Add unique IDs to products for CMS tracking
  const productsWithIds = rawProducts.map(p => ({
    ...p,
    id: `prod_${p.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
  }));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Prioritize config order
  const sortedProducts = [...productsWithIds].sort((a, b) => {
    const orderA = config.order.indexOf(a.id);
    const orderB = config.order.indexOf(b.id);
    if (orderA === -1 && orderB === -1) return 0;
    if (orderA === -1) return 1;
    if (orderB === -1) return -1;
    return orderA - orderB;
  });

  const visibleProducts = sortedProducts.filter(p => 
    userRole || !config.hidden.includes(p.id)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const currentOrder = config.order.length > 0 ? config.order : sortedProducts.map(p => p.id);
      const oldIndex = currentOrder.indexOf(active.id);
      const newIndex = currentOrder.indexOf(over.id);
      
      const newOrder = arrayMove(currentOrder, oldIndex, newIndex);
      onUpdateConfig(pageId, { ...config, order: newOrder });
    }
  };

  const moveProduct = (id, direction) => {
    const currentOrder = config.order.length > 0 ? config.order : sortedProducts.map(p => p.id);
    const index = currentOrder.indexOf(id);
    if (index === -1) return;

    const newOrder = [...currentOrder];
    const newPos = index + direction;
    if (newPos < 0 || newPos >= newOrder.length) return;

    [newOrder[index], newOrder[newPos]] = [newOrder[newPos], newOrder[index]];
    onUpdateConfig(pageId, { ...config, order: newOrder });
  };

  const toggleVisibility = (id) => {
    const isHidden = config.hidden.includes(id);
    const newHidden = isHidden 
      ? config.hidden.filter(hid => hid !== id)
      : [...config.hidden, id];
    onUpdateConfig(pageId, { ...config, hidden: newHidden });
  };

  return (
    <section className="category-details">
      <div className="container">
        <button onClick={onBack} className="btn-back">
          &larr; Volver al catálogo
        </button>
        
        <div className="details-header">
          <div className="details-icon glass-panel">
            <img src={category.icon} alt={category.name} />
          </div>
          <div>
            <h2 className="text-gradient">{category.name}</h2>
            <p>Explora nuestra gama de productos en esta categoría.</p>
          </div>
        </div>

        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={visibleProducts.map(p => p.id)}
            strategy={rectSortingStrategy}
          >
            <div className="products-grid">
              {visibleProducts.map((product) => (
                <SortableProductCard 
                  key={product.id}
                  product={product}
                  category={category}
                  config={config}
                  onOpenQuote={onOpenQuote}
                  userRole={userRole}
                  moveProduct={moveProduct}
                  toggleVisibility={toggleVisibility}
                />
              ))}
              {visibleProducts.length === 0 && (
                <p className="no-products">No hay productos disponibles actualmente en esta categoría.</p>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
};

export default CategoryDetails;

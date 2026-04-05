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
import './Categories.css';

const categoryData = [
  { id: 'cat_topograficos', name: 'Topográficos', icon: '⛰️', count: 34 },
  { id: 'cat_hidrologia', name: 'Hidrología', icon: '🌊', count: 8 },
  { id: 'cat_rugged', name: 'Equipos Rugged', icon: '📱', count: 6 },
  { id: 'cat_drones', name: 'Drones', icon: '🚁', count: 9 },
  { id: 'cat_software', name: 'Software', icon: '💻', count: 11 },
  { id: 'cat_servicios', name: 'Servicios por Demanda', icon: '⏳', count: 3 },
];

const SortableCategoryCard = ({ cat, config, onSelectCategory, userRole, moveCard, toggleVisibility }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cat.id, disabled: !userRole });

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
      className={`category-card glass-panel ${config.hidden.includes(cat.id) ? 'cms-hidden' : ''} ${isDragging ? 'is-dragging' : ''}`}
    >
      <div onClick={() => !isDragging && onSelectCategory(cat)}>
        <div className="cat-icon">{cat.icon}</div>
        <h3>{cat.name}</h3>
        <p className="cat-count">{cat.count} items</p>
        <div className="cat-hover-action">Ver productos &rarr;</div>
      </div>

      {userRole && (
        <div className="cms-controls">
          <div className="drag-handle" {...attributes} {...listeners} title="Arrastrar para reordenar">
            ⠿
          </div>
          <button onClick={() => moveCard(cat.id, -1)} title="Mover arriba">↑</button>
          <button onClick={() => moveCard(cat.id, 1)} title="Mover abajo">↓</button>
          <button onClick={() => toggleVisibility(cat.id)} title={config.hidden.includes(cat.id) ? "Mostrar" : "Ocultar"}>
            {config.hidden.includes(cat.id) ? "👁️‍🗨️" : "👁️"}
          </button>
        </div>
      )}
    </div>
  );
};

const Categories = ({ onSelectCategory, cmsConfig, userRole, onUpdateConfig }) => {
  const pageId = "index_home";
  const config = cmsConfig?.pages?.[pageId] || { order: [], hidden: [] };

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
  const sortedCategories = [...categoryData].sort((a, b) => {
    const orderA = config.order.indexOf(a.id);
    const orderB = config.order.indexOf(b.id);
    if (orderA === -1 && orderB === -1) return 0;
    if (orderA === -1) return 1;
    if (orderB === -1) return -1;
    return orderA - orderB;
  });

  const visibleCategories = sortedCategories.filter(cat => 
    userRole || !config.hidden.includes(cat.id)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const currentOrder = config.order.length > 0 ? config.order : sortedCategories.map(c => c.id);
      const oldIndex = currentOrder.indexOf(active.id);
      const newIndex = currentOrder.indexOf(over.id);
      
      const newOrder = arrayMove(currentOrder, oldIndex, newIndex);
      onUpdateConfig(pageId, { ...config, order: newOrder });
    }
  };

  const moveCard = (id, direction) => {
    const currentOrder = config.order.length > 0 ? config.order : sortedCategories.map(c => c.id);
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
    <section id="categorias" className="categories">
      <div className="container">
        <div className="section-header">
          <h2>Catálogo de <span className="text-gradient">Productos</span></h2>
          <p>Explora nuestra selección de alta precisión tecnológica</p>
        </div>
        
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={visibleCategories.map(cat => cat.id)}
            strategy={rectSortingStrategy}
          >
            <div className="categories-grid">
              {visibleCategories.map(cat => (
                <SortableCategoryCard 
                  key={cat.id}
                  cat={cat}
                  config={config}
                  onSelectCategory={onSelectCategory}
                  userRole={userRole}
                  moveCard={moveCard}
                  toggleVisibility={toggleVisibility}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
};

export default Categories;

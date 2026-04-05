import './Navbar.css';

const Navbar = ({ onOpenQuote, onHome, onScrollTo }) => {
  return (
    <nav className="navbar glass-panel">
      <div className="container nav-content">
        <div className="nav-brand" onClick={onHome} style={{ cursor: 'pointer' }}>
          <span className="logo-text text-gradient">Geos</span> Marketplace
        </div>
        <ul className="nav-links">
          <li><a href="#categorias" onClick={(e) => { e.preventDefault(); onScrollTo('categorias'); }}>Tienda</a></li>
          <li><a href="#home" onClick={(e) => { e.preventDefault(); onScrollTo('home'); }}>Inicio</a></li>
          <li><a href="#quote" onClick={(e) => { e.preventDefault(); onOpenQuote(); }}>Inspiración 3D</a></li>
        </ul>
        <div className="nav-actions">
          <button onClick={onOpenQuote} className="btn-quote">Cotizar</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

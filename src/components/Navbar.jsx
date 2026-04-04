import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="container nav-content">
        <div className="nav-brand">
          <span className="logo-text text-gradient">Geos</span> Marketplace
        </div>
        <ul className="nav-links">
          <li><a href="#home">Inicio</a></li>
          <li><a href="#categorias">Tienda</a></li>
          <li><a href="https://form.jotform.com/231100629098856" target="_blank" rel="noreferrer">Impresión 3D</a></li>
        </ul>
        <div className="nav-actions">
          <a href="#contact" className="btn-quote">Cotizar</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

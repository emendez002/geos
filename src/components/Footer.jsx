import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="logo-text text-gradient">Geos Marketplace</h2>
            <p>Eslogan Geos Marketplace. Elevando la precisión y la tecnología espacial a nuevas alturas.</p>
          </div>
          <div className="footer-links">
            <h3>Navegación</h3>
            <ul>
              <li><a href="#home">Inicio</a></li>
              <li><a href="#categorias">Tienda</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contacto</h3>
            <ul>
              <li>De la Iglesia Católica 300mts Este, 50mts Norte y 100mts Oeste. San Pedro, San José, CR.</li>
              <li>Teléfono: +506 7247-9596</li>
              <li>Email: info@geos.market</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Geos Marketplace. Desarrollado para GeoSolutions Consulting.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

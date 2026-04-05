import './Hero.css';

const Hero = ({ onContact, onExplore }) => {
  return (
    <section id="home" className="hero hero-gradient">
      <div className="container hero-content animate-fade-in">
        <h1 className="hero-title">
          Soluciones Espaciales de <br />
          <span className="text-gradient">Última Generación</span>
        </h1>
        <p className="hero-subtitle delay-100 animate-fade-in">
          Equipamiento topográfico, hidrológico y de inteligencia espacial de alta precisión. 
          Tu aliado tecnológico en campo y oficina.
        </p>
        <div className="hero-actions delay-200 animate-fade-in">
          <button onClick={onExplore} className="btn-primary">Ver Catálogo</button>
          <button onClick={onContact} className="btn-secondary glass-panel">Contactar Asesor</button>
        </div>
      </div>
      <div className="hero-assets glass-panel delay-300 animate-fade-in">
         {/* Representational visual - could be replaced with actual image */}
         <div className="hero-orbit">
           <div className="orbit-item i1" />
           <div className="orbit-item i2" />
           <div className="orbit-item i3" />
         </div>
      </div>
    </section>
  );
};

export default Hero;

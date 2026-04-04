import React, { useState } from 'react';
import { validateUser } from '../utils/cmsAuth';
import './LoginForm.css';

const LoginForm = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await validateUser(email);
    if (result.success) {
      onLogin(result.role);
      onClose();
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content glass-panel">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Acceso <span className="text-gradient">CMS</span></h2>
        <p>Ingresa tu correo autorizado para gestionar el contenido del sitio.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="nombre@geociencias.net" 
              required 
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="btn-primary full-width" disabled={loading}>
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

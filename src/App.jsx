import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import CategoryDetails from './components/CategoryDetails';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import QuoteForm from './components/QuoteForm';
import LoginForm from './components/LoginForm';
import { fetchCMSConfig, saveCMSConfig } from './utils/cmsConfig';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteMetadata, setQuoteMetadata] = useState(null);
  const [cmsConfig, setCmsConfig] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem('geos_user_role') || null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      const config = await fetchCMSConfig();
      setCmsConfig(config);
    };
    loadConfig();
  }, []);

  useEffect(() => {
    if (userRole) {
      document.body.classList.add('admin-active');
    } else {
      document.body.classList.remove('admin-active');
    }
  }, [userRole]);

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('geos_user_role', role);
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('geos_user_role');
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setShowQuote(false);
    setQuoteMetadata(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setShowQuote(false);
    setQuoteMetadata(null);
  };

  const handleOpenQuote = (product = null, category = null) => {
    setQuoteMetadata(product ? { 
      productName: product.name, 
      categoryName: category?.name || product.category,
      url: window.location.href 
    } : null);
    setShowQuote(true);
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateConfig = (pageId, pageConfig) => {
    const newConfig = {
      ...cmsConfig,
      pages: {
        ...(cmsConfig?.pages || {}),
        [pageId]: pageConfig
      }
    };
    setCmsConfig(newConfig);
  };

  const handleSaveCMS = async () => {
    const result = await saveCMSConfig(cmsConfig);
    if (result.success) {
      alert("Configuración guardada exitosamente en Google Sheets.");
    } else {
      alert("Error al guardar la configuración.");
    }
  };

  return (
    <>
      <Navbar onOpenQuote={() => handleOpenQuote()} onHome={() => { setSelectedCategory(null); setShowQuote(false); }} />
      <main>
        {showQuote ? (
          <QuoteForm 
            onClose={() => setShowQuote(false)} 
            metadata={quoteMetadata} 
          />
        ) : !selectedCategory ? (
          <>
            <Hero />
            <Categories 
              onSelectCategory={handleSelectCategory} 
              cmsConfig={cmsConfig} 
              userRole={userRole}
              onUpdateConfig={handleUpdateConfig}
            />
          </>
        ) : (
          <CategoryDetails 
            category={selectedCategory} 
            onBack={handleBack} 
            onOpenQuote={handleOpenQuote}
            cmsConfig={cmsConfig}
            userRole={userRole}
            onUpdateConfig={handleUpdateConfig}
          />
        )}
      </main>
      
      {showLogin && <LoginForm onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      
      {userRole && (
        <div className="admin-status-bar">
          <div className="admin-info">
            <span className="badge">Modo {userRole}</span>
            <span>{cmsConfig ? "Configuración cargada" : "Cargando..."}</span>
          </div>
          <div className="admin-actions">
            <button onClick={handleSaveCMS} className="btn-save-cms" disabled={!cmsConfig}>
              💾 Guardar Cambios en Google
            </button>
            <button onClick={handleLogout} className="btn-logout-small">Cerrar Sesión</button>
          </div>
        </div>
      )}

      <WhatsAppWidget />
      <Footer onOpenLogin={() => setShowLogin(true)} />
    </>
  );
}

export default App;

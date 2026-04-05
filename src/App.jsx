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
import { fetchExternalProducts } from './utils/productService';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteMetadata, setQuoteMetadata] = useState(null);
  const [cmsConfig, setCmsConfig] = useState(null);
  const [externalProducts, setExternalProducts] = useState({});
  const [userRole, setUserRole] = useState(localStorage.getItem('geos_user_role') || null);
  const [showLogin, setShowLogin] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Robust scroll after view transition
    if (!selectedCategory && !showQuote && scrollTarget) {
      // Need a small frame delay to ensure DOM is ready
      requestAnimationFrame(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setScrollTarget(null);
        } else {
          // Fallback if not found yet
          setTimeout(() => {
            const elRetry = document.getElementById(scrollTarget);
            if (elRetry) {
              elRetry.scrollIntoView({ behavior: 'smooth' });
            }
            setScrollTarget(null);
          }, 100);
        }
      });
    }
  }, [selectedCategory, showQuote, scrollTarget]);

  useEffect(() => {
    const loadData = async () => {
      const [config, products] = await Promise.all([
        fetchCMSConfig(),
        fetchExternalProducts()
      ]);
      setCmsConfig(config);
      setExternalProducts(products);
    };
    loadData();
  }, []);

  const handleRefreshData = async () => {
    setIsSyncing(true);
    const [config, products] = await Promise.all([
      fetchCMSConfig(),
      fetchExternalProducts()
    ]);
    setCmsConfig(config);
    setExternalProducts(products);
    setIsSyncing(false);
  };

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
    setScrollTarget('categorias');
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
      <Navbar 
        onOpenQuote={() => handleOpenQuote()} 
        onHome={() => { 
          setSelectedCategory(null); 
          setShowQuote(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        onScrollTo={(id) => {
          setSelectedCategory(null);
          setShowQuote(false);
          setScrollTarget(id);
        }}
      />
      <main>
        {showQuote ? (
          <QuoteForm 
            onClose={() => setShowQuote(false)} 
            metadata={quoteMetadata} 
          />
        ) : !selectedCategory ? (
          <>
            <Categories 
              onSelectCategory={handleSelectCategory} 
              cmsConfig={cmsConfig} 
              userRole={userRole}
              onUpdateConfig={handleUpdateConfig}
            />
            <Hero 
              onContact={() => handleOpenQuote()} 
              onExplore={() => {
                const element = document.getElementById('categorias');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
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
            externalProducts={externalProducts[selectedCategory.name] || []}
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
            <button onClick={handleRefreshData} className="btn-sync-cms" disabled={isSyncing}>
              {isSyncing ? "⌛ Sincronizando..." : "🔄 Sincronizar Datos"}
            </button>
            <button onClick={handleSaveCMS} className="btn-save-cms" disabled={!cmsConfig || isSyncing}>
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

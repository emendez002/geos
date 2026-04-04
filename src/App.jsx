import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import CategoryDetails from './components/CategoryDetails';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import QuoteForm from './components/QuoteForm';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteMetadata, setQuoteMetadata] = useState(null);

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
            <Categories onSelectCategory={handleSelectCategory} />
          </>
        ) : (
          <CategoryDetails category={selectedCategory} onBack={handleBack} onOpenQuote={handleOpenQuote} />
        )}
      </main>
      <WhatsAppWidget />
      <Footer />
    </>
  );
}

export default App;


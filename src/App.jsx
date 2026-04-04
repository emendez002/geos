import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import CategoryDetails from './components/CategoryDetails';
import Footer from './components/Footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <Navbar />
      <main>
        {!selectedCategory ? (
          <>
            <Hero />
            <Categories onSelectCategory={handleSelectCategory} />
          </>
        ) : (
          <CategoryDetails category={selectedCategory} onBack={handleBack} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;


import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
      </main>
      <Footer />
    </>
  );
}

export default App;

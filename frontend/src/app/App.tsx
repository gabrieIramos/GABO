import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PagePlaceholder } from './components/PagePlaceholder';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { About } from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/category/:category" element={<Home />} />
            <Route path="/about" element={<About /> } />                        
            <Route path="/returns" element={
              <PagePlaceholder 
                title="Trocas e Devoluções" 
                description="Política de trocas e devoluções da Hubra." 
              />
            } />
            <Route path="/shipping" element={
              <PagePlaceholder 
                title="Frete e Entrega" 
                description="Informações sobre frete e prazos de entrega." 
              />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  {
    id: 1,
    title: 'LANÇAMENTO SELEÇÃO BRASILEIRA',
    subtitle: 'Nova camisa oficial 2024',
    image: 'https://images.unsplash.com/photo-1571190894029-caa26b1f4c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    cta: 'Comprar Agora',
    link: '/product/ada3837e-3346-4f85-b46f-9bad6edffc5d'
  },
  {
    id: 2,
    title: 'OFERTAS DA CHAMPIONS LEAGUE',
    subtitle: 'Até 30% de desconto em camisas selecionadas',
    image: 'https://images.unsplash.com/photo-1676746424114-56d38af59256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    cta: 'Ver Ofertas',
    link: '/products?category=Clubes'
  },
  {
    id: 3,
    title: 'COLEÇÃO RETRÔ',
    subtitle: 'Reviva os momentos históricos',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    cta: 'Explorar',
    link: '/products?category=Seleções'
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-4xl">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl tracking-tighter mb-4"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl mb-8"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to={slides[currentSlide].link}
                  className="inline-block bg-white text-black px-12 py-4 hover:bg-black hover:text-white border-2 border-white transition-all uppercase tracking-wider"
                >
                  {slides[currentSlide].cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 transition-colors"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

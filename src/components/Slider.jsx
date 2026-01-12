import { useState, useEffect } from 'react';
import '../styles/Slider.css';

/**
 * Componente HeroSlider Informativo
 * Dimensiones: 100dvw x 90dvh
 * Paleta: Rojo (#dc2626), Gris (#f3f4f6), Blanco (#ffffff)
 */
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Estima Tu Costo Real",
      subtitle: "Permite a los usuarios dominicanos estimar el costo real y final de traer un producto desde tiendas en linea de USA a RepúblicaDominicana.",
      cta: "Comenzar Ahora",
    },
    {
      id: 2,
      title: "Estima con tus tiendas en línea favoritas",
      subtitle: "Desde Amazon hasta eBay, calcula costos de envío, impuestos y más.",
      cta: "Comenzar Ahora",
    },
    {
      id: 3,
      title: "Seguridad Integral",
      subtitle: "Protegemos tu información con los protocolos más avanzados del mercado.",
      cta: "Comenzar Ahora",
    }
  ];

  // Cambio automático cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-slider">
      <div className="slides-wrapper">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundColor: "var(--red)", color: "#ffffff" }}
          >
            <div className="slide-content">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button className="slide-cta btn-white" onClick={() => window.location.href = "/auth/sign-in"}>
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas de Navegación */}
      <button className="slider-arrow arrow-left" onClick={prevSlide} style={{ color: slides[currentSlide].textColor }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <button className="slider-arrow arrow-right" onClick={nextSlide} style={{ color: slides[currentSlide].textColor }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

      {/* Indicadores */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''} light`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
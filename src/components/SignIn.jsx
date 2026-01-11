import { useState, useEffect } from 'react';
const api = import.meta.env.PUBLIC_AUTH_ROUTE;

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Gestiona con precisión",
      description: "Nuestra plataforma te permite visualizar cada métrica de tu negocio en tiempo real."
    },
    {
      title: "Colaboración total",
      description: "Conecta a tu equipo en un solo lugar y aumenta la productividad significativamente."
    },
    {
      title: "Seguridad avanzada",
      description: "Tus datos están protegidos con los estándares más altos de cifrado actual."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Login exitoso');
    }, 1500);
  };

  return (
    <div className="app-container">
      <style>{`
        .app-container {
          width: 80%;
          min-width: 350px;
          max-width: 600px;
          height: auto;
          display: flex;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #ffffff;
          margin: 0 auto;
          overflow-x: hidden;
        }

        .slider-section {
          background-color: #dc2626;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px;
          position: relative;
          overflow: hidden;
        }

        .slider-content {
          position: relative;
          z-index: 2;
          max-width: 500px;
        }

        .slide-item {
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .slide-item.active {
          opacity: 1;
          transform: translateX(0);
          position: relative;
          pointer-events: auto;
        }

        .brand-logo {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 80px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .slide-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .slide-desc {
          font-size: 1.25rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .slider-nav {
          display: flex;
          gap: 12px;
          margin-top: 60px;
        }

        .nav-dot {
          width: 30px;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .nav-dot.active {
          background-color: #ffffff;
        }

        .form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background-color: #ffffff;
          z-index: 5;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-header {
          margin-bottom: 40px;
        }

        /* Logo visible solo en mobile para mantener identidad */
        .mobile-logo {
          display: none;
          width: 50px;
          height: 50px;
          background-color: #dc2626;
          color: white;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.5rem;
          margin-bottom: 24px;
        }

        .form-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 10px 0;
        }

        .form-header p {
          color: #6b7280;
          font-size: 1rem;
          margin: 0;
        }

        /* Campos de Entrada */
        .input-group {
          margin-bottom: 24px;
        }

        .input-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .input-group input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #f3f4f6;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          background-color: #f9fafb;
        }

        .input-group input:focus {
          border-color: #dc2626;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.05);
        }

        .btn-login {
          width: 100%;
          padding: 16px;
          background-color: #dc2626;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-login:hover {
          background-color: #b91c1c;
        }

        .btn-login:active {
          transform: scale(0.98);
        }

        .btn-login:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

        .form-footer {
          margin-top: 32px;
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .footer-link {
          color: #dc2626;
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .slider-section {
            display: none; /* Oculta el slider en móviles */
          }

          .form-section {
            padding: 24px;
            background-color: #f3f4f6; /* Fondo gris claro para el contenedor */
          }

          .login-card {
            background-color: #ffffff;
            padding: 40px 30px;
            border-radius: 20px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          }

          .mobile-logo {
            display: flex; /* Muestra el logo en mobile */
          }

          .form-header h2 {
            font-size: 1.75rem;
          }
        }
      `}</style>

      <aside className="slider-section">
        <div className="slider-content">
          <div className="brand-logo">PROJECT.ALPHA</div>
          
          <div className="slides-container">
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className={`slide-item ${index === currentSlide ? 'active' : ''}`}
              >
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-desc">{slide.description}</p>
              </div>
            ))}
          </div>

          <div className="slider-nav">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </aside>

      <main className="form-section">
        <div className="login-card">
          <div className="mobile-logo">A</div>
          
          <header className="form-header">
            <h2>Bienvenido</h2>
            <p>Ingresa tus datos para continuar</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Correo electrónico</label>
              <input 
                type="email" 
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn-login" type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Entrar al Sistema'}
            </button>
          </form>

          <footer className="form-footer">
            <p>¿Olvidaste tu acceso? <a href="#" className="footer-link">Recupéralo aquí</a></p>
            <p style={{marginTop: '15px'}}>¿Nuevo aquí? <a href="#" className="footer-link">Crea una cuenta</a></p>
          </footer>
        </div>
      </main>
    </div>
  );
}
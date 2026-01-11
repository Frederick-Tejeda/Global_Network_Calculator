import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/SignIn.css";
const api = import.meta.env.PUBLIC_AUTH_ROUTE;

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\:;"'<>,.?\/_₹])(?!.*\s).{8,32}$/

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be 8-32 characters long, include uppercase and lowercase letters, a number, and a special character.");
      return;
    }
    setLoading(true);
    axios.post(`${api}/api/v1/Auth/login`, { email, password })
    .then((response) => {
        setLoading(false);
        const { token } = response.data;
        const { email } = response.data;
        const { role } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("role", role);
        window.location.href = "/";
    })
    .catch((err) => {
        setLoading(false);
        alert("Inicio de sesión fallido. Por favor, verifica tus credenciales e inténtalo de nuevo.");
        return;
    });
  };

  return (
    <div className="app-container">
      <aside className="slider-section">
        <div className="slider-content">
          <div className="brand-logo">Global Network Calculator</div>
          
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
          <div className="mobile-logo">G</div>
          
          <div className="form-header">
            <h2>Bienvenido</h2>
            <p>Ingresa tus datos para continuar</p>
          </div>

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
            <p>¿Olvidaste tu acceso? <a href="/" className="footer-link">Recupéralo aquí</a></p>
            <p style={{marginTop: '15px'}}>¿Nuevo aquí? <a href="/auth/sign-up" className="footer-link">Crea una cuenta</a></p>
          </footer>
        </div>
      </main>
    </div>
  );
}
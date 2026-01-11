import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/SignUp.css";
import { set } from 'astro:schema';
const api = import.meta.env.PUBLIC_AUTH_ROUTE;

const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(firstName.trim() === ""){
            alert("El primer nombre no puede estar vacío.");
            return;
        }
        if(lastName.trim() === ""){
            alert("El primer apellido no puede estar vacío.");
            return;
        }
        if(!emailRegex.test(email)){
            alert("Por favor ingresa una dirección de correo electrónico válida.");
            return;
        }
        if(!passwordRegex.test(password)){
            alert("La contraseña debe tener entre 8 y 32 caracteres, incluir letras mayúsculas y minúsculas, un número y un carácter especial.");
            return;
        }
        console.log("Submitting:", firstName, lastName, email, password);
        setLoading(true);
        axios.post(`${api}/api/v1/Auth/register`, { email, password, firstName, lastName })
        .then((response) => {
            setLoading(false);
            location.href = '/auth/sign-in';
        })
        .catch((error) => {
            setLoading(false);
            alert("Algo salió mal. Por favor, inténtalo de nuevo.");
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        document.querySelector("form").reset();
    }

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
              <label>Primer Nombre</label>
              <input 
                type="text" 
                placeholder="Frederick"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Primer Apellido</label>
              <input 
                type="text" 
                placeholder="Tejeda"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
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
            <p style={{marginTop: '15px'}}>¿Tienes una cuenta? <a href="/auth/sign-in" className="footer-link">Inicia sesión</a></p>
          </footer>
        </div>
      </main>
    </div>
    );
}

export default SignUp;
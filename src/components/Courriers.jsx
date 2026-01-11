import { useState, useRef, useEffect } from "react";
import "../styles/Courrier.css";
import Map from './Courrier_map.jsx';

const courriersData = [
  { id: 1, name: "Sucursal Principal", desc: "Av. Winston Churchill", coords: [18.48616138136144, -69.96631688445295] },
  { id: 2, name: "Zona Oriental", desc: "Av. Sabana Larga", coords: [18.47393122416622, -69.96041256896142] },
  { id: 3, name: "Centro Ciudad", desc: "Calle El Conde", coords: [18.471524299019073, -69.95392996637759] },
];

const Courriers = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // -- Lógica Móvil --
  const [sheetHeight, setSheetHeight] = useState(40); 
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startHeight = useRef(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    if (isMobile) setSheetHeight(30); 
  };

  const filteredCourriers = courriersData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    startHeight.current = sheetHeight;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isMobile) return;
    const currentY = e.touches[0].clientY;
    const diffY = startY.current - currentY; 
    const diffVh = (diffY / window.innerHeight) * 100;
    
    let newHeight = startHeight.current + diffVh;
    if (newHeight > 92) newHeight = 92;
    if (newHeight < 15) newHeight = 15;
    setSheetHeight(newHeight);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setIsDragging(false);
    if (sheetHeight > 60) setSheetHeight(92);
    else if (sheetHeight < 25) setSheetHeight(15);
    else setSheetHeight(40);
  };

  return (
    <section id="courier-container">
      <aside id="sidebar">
        <h2>Courriers</h2>
        <p id="subtitle">Consulta los Courriers en tu ciudad. Haz clic en el nombre para ver detalles en el mapa.</p>

        <div id="second-block">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque nostrum vel eum vitae!</p>
        </div>

        <div className="locations-scroll-area">
            <div className="locations-list">
            {filteredCourriers.map((item) => (
                <div 
                    key={item.id} 
                    className={`location-item ${selectedLocation?.id === item.id ? 'active' : ''}`}
                    onClick={() => handleSelectLocation(item)}
                >
                    <svg className="icon-pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div className="location-text-container">
                        <h3>{item.name}</h3>
                        <p>{item.desc}</p>
                    </div>
                </div>
            ))}
            </div>
            <div className="action-buttons">
                <button className="btn-save">Guardar Selección</button>
            </div>
        </div>
      </aside>

      
      <div id="map-container">
         <Map locations={courriersData} selectedLocation={selectedLocation} />
      </div>   
  
    </section>
  );
}
export default Courriers;
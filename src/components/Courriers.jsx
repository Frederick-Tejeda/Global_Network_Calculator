import { useState } from "react";
import "../styles/Courrier.css";
import Map from './Courrier_map.jsx';

const courriersData = [
  {
    id: 1,
    name: "Ejemplo Courrier 1",
    desc: "Ejemplo",
    coords: [18.48616138136144, -69.96631688445295]
  },
  {
    id: 2,
    name: "Ejemplo Courrier 2",
    desc: "Ejemplo",
    coords: [18.47393122416622, -69.96041256896142]
  },
  {
    id: 3,
    name: "Ejemplo Courrier 3",
    desc: "Ejemplo",
    coords: [18.471524299019073, -69.95392996637759]
  }
];

const Courriers = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const filteredCourriers = courriersData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="courier-container">
      <aside id="sidebar">
        <h2>Courriers</h2>
        <p id="subtitle">Consulta los Courriers en tu ciudad. Haz clic en el nombre para ver detalles en el mapa.</p>

        <div id="second-block">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque nostrum vel eum vitae!</p>
        </div>
        
        <hr id="Line"/>

        <div id="dots">
            <div id="dot"></div>
            <div id="dot"></div>
            <div id="dot"></div>
            <div id="dot"></div>                
        </div>
        <br/>
        <h2>Lista de Sucursales</h2>
        <hr className="Line"/>

        <input type="text" placeholder="Buscar Courrier" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px"
          }}
        />

        <div className="locations-list">
          {filteredCourriers.length > 0 ? (
            filteredCourriers.map((item) => (
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
                  <strong><h2>{item.name}</h2></strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#666" }}>No se encontraron resultados.</p>
          )}
        </div>
        <br/>
        <button>Guardar Courrier</button>

      </aside>
    
      <div id="map-container">
         <Map locations={courriersData} selectedLocation={selectedLocation} />
      </div>   
    </section>
  );
}

export default Courriers;
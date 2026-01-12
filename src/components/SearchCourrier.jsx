import "../styles/SearchCourrier.css";

const SearchCourrier = () => {

    const data = [{name: "EPS", imgUrl: "eps.png", pricePerLb: 225.0}, {name: "DOMEX", imgUrl: "domex.png", pricePerLb: 245.0}, {name: "BMCargo", imgUrl: "BMCargo.png", pricePerLb: 230.0}];

    const handleSelectCourier = (name) => {
        const courierParam = encodeURIComponent(name.toLowerCase());
        window.location.href = `/courriers?courrier=${courierParam}`;
    };

    return (
        <div className="container">
            <div className="header">
                <h2>Compara precios por Courrier</h2>
            </div>

            <div className="courier-grid">
                {data.map((courier, index) => (
                <article id={`Courrier#${index}`} key={index} className="card">
                    <div className="logo-wrapper">
                    {/* Intenta cargar la imagen, si falla muestra la inicial */}
                    <img 
                        className="logo-img" 
                        src={courier.imgUrl} 
                        alt={courier.name}
                        onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <span className="logo-placeholder" style={{display: 'none'}}>
                        {courier.name.charAt(0)}
                    </span>
                    </div>

                    <div className="info">
                    <h3 className="courier-name">{courier.name}</h3>
                    <div className="price-tag">
                        <span className="price-label">Precio por Libra</span>
                        <span className="price-value">
                        RD${courier.pricePerLb.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    </div>

                    <button className="card-btn" onClick={() => handleSelectCourier(courier.name)}>
                    Seleccionar Courier
                    </button>
                </article>
                ))}
            </div>
        </div>
    );
}

export default SearchCourrier;
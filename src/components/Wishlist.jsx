import { useState } from "react";
import "../styles/Wishlist.css";

const initialProducts = [
  {
    id: 1,
    name: "Ejemplo1",
    price: "$50.00",
    img: "/images/item1.jpg",
  },
  {
    id: 2,
    name: "Ejemplo2",
    price: "$500.00",
    img: "/images/item2.jpg",
  },
  {
    id: 3,
    name: "Ejemplo3",
    price: "$27.99",
    img: "/images/item3.jpg",
  },
  {
    id: 4,
    name: "Ejemplo4",
    price: "$30.00",
    img: "/images/no-existe.jpg",
  },
];

export default function Wishlist() {
  const [products, setProducts] = useState(initialProducts);

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section id="wishlist-container">
      <div id="wishlist-header">
        <h2>My Wishlist</h2>
      </div>

      {products.length === 0 ? (
        <p id="empty-wishlist">La Wishlist esta Vacia</p>
      ) : (
        <div id="wishlist-grid">
          {products.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              onRemove={removeProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function WishlistCard({ product, onRemove }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article id="wishlist-card">
      {!imgError ? (
        <img
          src={product.img}
          alt={product.name}
          onError={() => setImgError(true)}
        />
      ) : (
        <div id="img-placeholder" />
      )}

      <h3>{product.name}</h3>
      <span id="price">{product.price}</span>

      <div id="actions">
        <button id="btn-cart">Comparar</button>

        <button id="icon-btn" aria-label="Remove" onClick={() => onRemove(product.id)}>🗑️</button>
      </div>
    </article>
  );
}

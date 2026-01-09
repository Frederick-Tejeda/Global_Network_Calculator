
import { useState,useEffect } from "react";
import axios from "axios";
import '../styles/Search_product.css';


const Search_product = () => {
  
    return (
    <section id="Search">

  <h1>Busqueda</h1>

  <div id="search-box">
    <input 
      type="text" 
      placeholder="Pega el enlace del producto (Amazon, eBay, AliExpress...)"
    />
    <button>Buscar</button>
  </div>

  <p id="terms">
    El sistema obtiene el precio mediante scraping y aplica impuestos según el país.
  </p>

  
  <div id="results">

    
    <div id="product">
      <img src="https://via.placeholder.com/300x200" alt="Producto"/>
      <h3>Nombre del producto obtenido por scraping</h3>
      <p>Precio base: <strong>USD 199.99</strong></p>
    </div>
  
    <div id="summary">
      <table>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Precio convertido</td>
            <td>DOP 11,700.00</td>
          </tr>
          <tr>
            <td>Arancel (10%)</td>
            <td>DOP 1,170.00</td>
          </tr>
          <tr>
            <td>ITBIS (18%)</td>
            <td>DOP 2,316.60</td>
          </tr>
          <tr id="total">
            <td>Total a pagar</td>
            <td>DOP 15,186.60</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</section>
    )};
export default Search_product;
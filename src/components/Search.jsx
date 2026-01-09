import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Search.css";

const Search = () => {
    return (
        <div id="search-container">
            <h1>Search Component</h1>
            <button>
                <a href="/courriers">
                Courriers
                </a>
            </button>
            <button>
                <a href="/Search_product">
                Buscar
                </a>
            </button>
            <button>
                <a href="/Wishlist">
                Wishlist
                </a>
            </button>
                
        </div>
        
    );
}

export default Search;
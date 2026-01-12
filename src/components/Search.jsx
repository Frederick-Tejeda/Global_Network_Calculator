import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Search.css";
import Search_product from './Search_product';
import SearchCourrier from './SearchCourrier';

const Search = () => {
    return (
        <section id="search-components">
            <Search_product />
            <SearchCourrier />
        </section>
    );
}

export default Search;
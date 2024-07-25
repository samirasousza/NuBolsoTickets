import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className="searchbar-container" onSubmit={handleSearch}>
            <div className="search-bar" >
                <input
                    type="text"
                    placeholder="Pesquise..."
                    value={query}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    <IoSearch className="search-button-icon"/>
                </button>
            </div>
        </form>
    );
}

export default SearchBar;

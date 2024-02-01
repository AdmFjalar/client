// FilterMenu.jsx
import React, { useState, useEffect } from "react";

const FilterMenu = ({
  availableGenres,
  filterGenres,
  handleFilterCheckboxChange,
  resetFilters,
  Capitalize,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  availableGenres.sort();

  return (
    <div className="filter-menu">
      <button onClick={toggleMenu} className="menu-toggle-btn">
        Filter ☰
      </button>
      <div className={`filter-options ${isMenuOpen ? "visible" : ""}`}>
        {availableGenres.map((genre) => (
          <label key={genre} className="filter-option">
            <input
              type="checkbox"
              checked={filterGenres.includes(genre)}
              onChange={(event) => handleFilterCheckboxChange(event, genre)}
              className="filter__button"
            />
            {Capitalize(genre)}
          </label>
        ))}
        <button onClick={resetFilters} className="reset-filters-btn">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;

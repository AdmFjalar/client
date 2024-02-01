import React from "react";

const SortMenu = ({ sortOption, handleSortChange }) => {
  return (
    <div className="sortMenu">
      <label htmlFor="sortOptions">Sort by: </label>
      <select
        id="sortOptions"
        onChange={handleSortChange}
        value={`${sortOption.sortBy}-${sortOption.sortOrder}`}
      >
        <option value="lastupdated-desc">Last Updated (Newest First)</option>
        <option value="lastupdated-asc">Last Updated (Oldest First)</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="genres-asc">Genres (A-Z)</option>
        <option value="genres-desc">Genres (Z-A)</option>
      </select>
    </div>
  );
};

export default SortMenu;

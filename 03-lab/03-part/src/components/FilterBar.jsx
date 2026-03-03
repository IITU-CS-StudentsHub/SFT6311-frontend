import React from 'react';
import './FilterBar.css';

const FilterBar = ({
    categories,
    activeCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
    sortOrder,
    onSortChange
}) => {
    return (
        <div className="filter-bar glass-panel">
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="filter-section">
                <button
                    className={`filter-btn ${activeCategory === 'All' ? 'active' : ''}`}
                    onClick={() => onCategoryChange('All')}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => onCategoryChange(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="sort-section">
                <select
                    value={sortOrder}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="sort-select"
                >
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                    <option value="date_new">Newest First</option>
                    <option value="date_old">Oldest First</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;

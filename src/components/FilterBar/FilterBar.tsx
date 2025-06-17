import React, { useState } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
    onSearch?: (query: string) => void;
    onFilterChange?: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(searchQuery);
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterSection}>
                <button 
                    className={styles.moreFilters}
                    onClick={() => setShowFilters(!showFilters)}
                    aria-expanded={showFilters}
                >
                    More Filters {showFilters ? '⌃' : '⌄'}
                </button>
                <form onSubmit={handleSearchSubmit} className={styles.searchSection}>
                    <input 
                        type="text" 
                        placeholder="Search strategies..." 
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        aria-label="Search strategies"
                    />
                    <button 
                        type="submit" 
                        className={styles.searchButton}
                        aria-label="Search"
                    >
                        🔍
                    </button>
                </form>
                <div className={styles.pageIndicator}>
                    <span className={styles.pageCount}>1342 • 383</span>
                </div>
            </div>
            {showFilters && (
                <div className={styles.filtersPanel}>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel} htmlFor="strategy-type-select">Strategy Type:</label>
                        <select 
                            id="strategy-type-select"
                            className={styles.filterSelect}
                            aria-label="Filter by strategy type"
                        >
                            <option value="">All Types</option>
                            <option value="model">Model</option>
                            <option value="tax-smart-sma">Tax-Smart SMA</option>
                            <option value="traditional-sma">Traditional SMA</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel} htmlFor="provider-select">Provider:</label>
                        <select 
                            id="provider-select"
                            className={styles.filterSelect}
                            aria-label="Filter by provider"
                        >
                            <option value="">All Providers</option>
                            <option value="jpmorgan">JPMorgan</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;
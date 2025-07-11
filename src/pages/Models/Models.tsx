import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Models.module.css';

const modelsData = [
    {
        name: 'BlackRock Large Cap Equity',
        family: 'BR Equity Models',
        type: 'Equity',
        subType: 'Large cap',
        benchmark: 'S&P 500',
        taxManagement: 'Yes'
    },
    {
        name: 'BlackRock Fixed Income Core',
        family: 'BR Fixed Income Models',
        type: 'Fixed income',
        subType: 'Core',
        benchmark: 'Russell 1000',
        taxManagement: 'No'
    },
    {
        name: 'BlackRock Growth Strategy',
        family: 'BR Growth Models',
        type: 'Equity',
        subType: 'Growth',
        benchmark: 'Bloomberg Barclays Aggregate',
        taxManagement: 'Yes'
    },
    {
        name: 'BlackRock Balanced Portfolio',
        family: 'BR Balanced Models',
        type: 'Multi-asset',
        subType: 'Balanced',
        benchmark: 'S&P 500',
        taxManagement: 'No'
    },
    {
        name: 'BlackRock International Fund',
        family: 'BR International Models',
        type: 'Equity',
        subType: 'International',
        benchmark: 'MSCI EAFE',
        taxManagement: 'Yes'
    },
    {
        name: 'BlackRock Large Cap Equity',
        family: 'BR Equity Models',
        type: 'Equity',
        subType: 'Large cap',
        benchmark: 'S&P 500',
        taxManagement: 'Yes'
    },
    {
        name: 'BlackRock Fixed Income Core',
        family: 'BR Fixed Income Models',
        type: 'Fixed income',
        subType: 'Core',
        benchmark: 'Russell 1000',
        taxManagement: 'No'
    },
    {
        name: 'BlackRock Growth Strategy',
        family: 'BR Growth Models',
        type: 'Equity',
        subType: 'Growth',
        benchmark: 'Bloomberg Barclays Aggregate',
        taxManagement: 'Yes'
    },
    {
        name: 'BlackRock Balanced Portfolio',
        family: 'BR Balanced Models',
        type: 'Multi-asset',
        subType: 'Balanced',
        benchmark: 'S&P 500',
        taxManagement: 'No'
    },
    {
        name: 'BlackRock International Fund',
        family: 'BR International Models',
        type: 'Equity',
        subType: 'International',
        benchmark: 'MSCI EAFE',
        taxManagement: 'Yes'
    },
    {
        name: 'BlackRock Large Cap Equity',
        family: 'BR Equity Models',
        type: 'Equity',
        subType: 'Large cap',
        benchmark: 'S&P 500',
        taxManagement: 'Yes'
    },
    {
        name: 'BlackRock International Fund',
        family: 'BR International Models',
        type: 'Equity',
        subType: 'International',
        benchmark: 'MSCI EAFE',
        taxManagement: 'Yes'
    }
];

const Models: React.FC = () => {
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState('');
    const [groupByFamily, setGroupByFamily] = useState(false);
    const [modelFamily, setModelFamily] = useState('All');
    const [benchmark, setBenchmark] = useState('Any');
    const [taxManagement, setTaxManagement] = useState('');

    const filteredModels = modelsData.filter(model => {
        const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            model.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            model.type.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFamily = modelFamily === 'All' || model.family === modelFamily;
        const matchesBenchmark = benchmark === 'Any' || model.benchmark === benchmark;
        
        return matchesSearch && matchesFamily && matchesBenchmark;
    });

    return (
        <div className={styles.modelsContainer}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h3>MODEL FILTERS</h3>
                    <button 
                        type="button"
                        className={styles.collapseBtn}
                        aria-label="Collapse filters"
                        title="Collapse filters"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div className={styles.filterSection}>
                    <label className={styles.filterLabel}>MODEL FAMILY</label>
                    <select 
                        className={styles.filterSelect}
                        value={modelFamily}
                        onChange={(e) => setModelFamily(e.target.value)}
                        aria-label="Filter by model family"
                    >
                        <option value="All">All</option>
                        <option value="BR Equity Models">BR Equity Models</option>
                        <option value="BR Fixed Income Models">BR Fixed Income Models</option>
                        <option value="BR Growth Models">BR Growth Models</option>
                        <option value="BR Balanced Models">BR Balanced Models</option>
                        <option value="BR International Models">BR International Models</option>
                    </select>
                </div>

                <div className={styles.filterSection}>
                    <label className={styles.filterLabel}>BENCHMARK</label>
                    <select 
                        className={styles.filterSelect}
                        value={benchmark}
                        onChange={(e) => setBenchmark(e.target.value)}
                        aria-label="Filter by benchmark"
                    >
                        <option value="Any">Any</option>
                        <option value="S&P 500">S&P 500</option>
                        <option value="Russell 1000">Russell 1000</option>
                        <option value="Bloomberg Barclays Aggregate">Bloomberg Barclays Aggregate</option>
                        <option value="MSCI EAFE">MSCI EAFE</option>
                    </select>
                </div>

                <div className={styles.filterSection}>
                    <label className={styles.filterLabel}>MODEL TYPE</label>
                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Equity <span className={styles.count}>3</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Fixed income <span className={styles.count}>1</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Multi-asset <span className={styles.count}>1</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Alternatives <span className={styles.count}>0</span>
                        </label>
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <label className={styles.filterLabel}>SUB MODEL TYPE</label>
                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Equity <span className={styles.count}>3</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Fixed income <span className={styles.count}>1</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Multi-asset <span className={styles.count}>1</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Alternatives <span className={styles.count}>0</span>
                        </label>
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <label className={styles.filterLabel}>TAX MANAGEMENT</label>
                    <select 
                        className={styles.filterSelect}
                        value={taxManagement}
                        onChange={(e) => setTaxManagement(e.target.value)}
                        aria-label="Filter by tax management"
                    >
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>

            <div className={styles.mainContent}>
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <span 
                        className={styles.breadcrumbLink}
                        onClick={() => history.push('/')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                history.push('/');
                            }
                        }}
                    >
                        Home
                    </span>
                    <span className={styles.separator}>{'>'}</span>
                    <span>Manage Models</span>
                </div>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h1>Manage models</h1>
                        <p className={styles.description}>
                            Browse, filter, and manage your investment models
                        </p>
                    </div>
                    <button 
                        type="button"
                        className={styles.addModelBtn}
                        onClick={() => history.push('/models/add')}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        ADD MODEL(S)
                    </button>
                    <button 
                        type="button"
                        className={styles.reviewModelBtn}
                        onClick={() => history.push('/models/review/blackrock-core-equity')}
                    >
                        📋 REVIEW MODEL (DEMO)
                    </button>
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                    <div className={styles.leftControls}>
                        <span className={styles.resultsCount}>{filteredModels.length} models in view.</span>
                        
                        <div className={styles.searchContainer}>
                            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M14 14L10.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <label className={styles.groupByToggle}>
                            <input
                                type="checkbox"
                                checked={groupByFamily}
                                onChange={(e) => setGroupByFamily(e.target.checked)}
                            />
                            <span className={styles.toggleLabel}>GROUP BY FAMILY</span>
                        </label>
                    </div>

                    <div className={styles.rightControls}>
                        <button type="button" className={styles.exportBtn}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 12L8 8L12 12M8 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Export
                        </button>
                        <button type="button" className={styles.customizeBtn}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <rect x="2" y="2" width="12" height="2" fill="currentColor"/>
                                <rect x="2" y="7" width="12" height="2" fill="currentColor"/>
                                <rect x="2" y="12" width="12" height="2" fill="currentColor"/>
                            </svg>
                            Customize columns
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Model name</th>
                                <th>Model family</th>
                                <th>Model type</th>
                                <th>Sub model type</th>
                                <th>Benchmark</th>
                                <th>
                                    <div className={styles.taxHeader}>
                                        <span className={styles.taxIcon}>⚙</span>
                                        Tax Management
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredModels.map((model, index) => (
                                <tr key={index}>
                                    <td>
                                        <button 
                                            type="button"
                                            className={styles.modelLink}
                                            onClick={() => history.push(`/models/${encodeURIComponent(model.name)}`)}
                                        >
                                            {model.name}
                                        </button>
                                    </td>
                                    <td>{model.family}</td>
                                    <td>{model.type}</td>
                                    <td>{model.subType}</td>
                                    <td>{model.benchmark}</td>
                                    <td>{model.taxManagement}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Models;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FilterBar from '../../components/FilterBar/FilterBar';
import UploadSection from '../../components/UploadSection/UploadSection';
import styles from './Strategies.module.css';

const strategies = [
    {
        title: 'J.P. Morgan Tax-Smart - U.S. Value Strategy',
        description: 'Designed to provide long-term capital growth by investing in U.S. value stocks, enhanced by active tax management.',
        type: 'Tax Smart SMA',
        provider: 'JPMorgan'
    },
    {
        title: 'J.P. Morgan Strategic Tax Aware ETF',
        description: 'Total Portfolio solution designed for investors looking for a tax aware globally diversified portfolio with a long-term asset...see more',
        type: 'Model',
        provider: 'JPMorgan'
    },
    {
        title: 'J.P. Morgan Tax-Smart - U.S. Large-Mid Cap Index Strategy',
        description: 'Designed to provide total returns in line with the Russell 1000 Index by investing in U.S. large- and mid-cap stocks...see more',
        type: 'Tax Smart SMA',
        provider: 'JPMorgan'
    },
    {
        title: 'J.P. Morgan Strategic ETF',
        description: 'Total portfolio solution designed for investors looking for a globally diversified portfolio with a long-term asset...see more',
        type: 'Model',
        provider: 'JPMorgan'
    },
    {
        title: 'J.P. Morgan Strategic US-only ETF',
        description: 'Total portfolio solution designed for investors looking for a domestically diversified portfolio with a long-...see more',
        type: 'Model',
        provider: 'JPMorgan'
    },
    {
        title: 'J.P. Morgan Multi-Asset Income ETF',
        description: 'Income oriented, globally diversified portfolio designed for investors in need of a consistent income stream...see more',
        type: 'Model',
        provider: 'JPMorgan'
    },
    {
        title: 'J.P. Morgan Tactical ETF',
        description: 'Total portfolio solution designed for investors looking for a globally diversified portfolio that seeks to take...see more',
        type: 'Model',
        provider: 'JPMorgan'
    },
    {
        title: 'J.P. Morgan Tax-Smart - U.S. Large Cap Index Strategy',
        description: 'Designed to deliver returns in line with the S&P 500 Index by investing in a sub-set of approximately 350 stocks while...see more',
        type: 'Tax Smart SMA',
        provider: 'JPMorgan'
    }
];

const Strategies: React.FC = () => {
    const history = useHistory();
    const [activeTab, setActiveTab] = useState('All Strategies');
    const [bookmarkedStrategies, setBookmarkedStrategies] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStrategies, setFilteredStrategies] = useState(strategies);

    const tabs = ['All Strategies', 'Models', 'Tax Smart SMA', 'Traditional SMA', 'My Favorites'];

    const toggleBookmark = (index: number) => {
        setBookmarkedStrategies(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const handleTabChange = (tab: string) => {
        setIsLoading(true);
        setActiveTab(tab);
        
        // Filter strategies based on active tab
        let filtered = strategies;
        if (tab === 'Models') {
            filtered = strategies.filter(strategy => strategy.type === 'Model');
        } else if (tab === 'Tax Smart SMA') {
            filtered = strategies.filter(strategy => strategy.type === 'Tax Smart SMA');
        } else if (tab === 'Traditional SMA') {
            filtered = strategies.filter(strategy => strategy.type === 'Traditional SMA');
        } else if (tab === 'My Favorites') {
            filtered = strategies.filter((_, index) => bookmarkedStrategies.has(index));
        } else {
            // 'All Strategies' - show all
            filtered = strategies;
        }
        
        // Apply search query if exists
        if (searchQuery.trim() !== '') {
            filtered = filtered.filter(strategy =>
                strategy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                strategy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                strategy.type.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        setFilteredStrategies(filtered);
        
        // Simulate API call delay
        setTimeout(() => setIsLoading(false), 500);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        
        // First apply tab filter
        let filtered = strategies;
        if (activeTab === 'Models') {
            filtered = strategies.filter(strategy => strategy.type === 'Model');
        } else if (activeTab === 'Tax Smart SMA') {
            filtered = strategies.filter(strategy => strategy.type === 'Tax Smart SMA');
        } else if (activeTab === 'Traditional SMA') {
            filtered = strategies.filter(strategy => strategy.type === 'Traditional SMA');
        } else if (activeTab === 'My Favorites') {
            filtered = strategies.filter((_, index) => bookmarkedStrategies.has(index));
        }
        
        // Then apply search filter
        if (query.trim() !== '') {
            filtered = filtered.filter(strategy =>
                strategy.title.toLowerCase().includes(query.toLowerCase()) ||
                strategy.description.toLowerCase().includes(query.toLowerCase()) ||
                strategy.type.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        setFilteredStrategies(filtered);
    };

    const strategyTypeCards = [
        {
            title: 'Model',
            features: [
                'Run on-demand tax transition proposals',
                'Onboard accounts seamlessly'
            ]
        },
        {
            title: 'Tax-Smart SMA',
            features: [
                'Run on-demand tax transition proposals',
                'Onboard accounts seamlessly'
            ]
        },
        {
            title: 'Traditional SMA',
            features: [
                'Run on-demand equity SMA transition proposals',
                'Request municipal fixed income transition proposals (3-5 day turnaround)'
            ]
        }
    ];

    return (
        <div className={styles.strategiesContainer}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <span 
                    className={styles.breadcrumbLink}
                    onClick={() => history.push('/models')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            history.push('/models');
                        }
                    }}
                >
                    Models
                </span>
                <span className={styles.separator}>{'>'}</span>
                <span>Strategies</span>
            </div>

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Strategies</h1>
                    <p className={styles.description}>
                        Select a Model Portfolio or Separately Managed Account (SMA) strategy below to learn more about the investment approach, 
                        initiate a transition proposal, or to begin onboarding an account to access tax management and customization capabilities (if available).
                    </p>
                </div>
            </div>

            {/* Strategy Type Cards */}
            <div className={styles.strategyTypeCards}>
                {strategyTypeCards.map((card, index) => (
                    <div 
                        key={index} 
                        className={`${styles.strategyTypeCard} ${styles[card.title.replace(/[\s-]+/g, '').toLowerCase()]}`}
                        tabIndex={0}
                        role="button"
                        aria-label={`Learn more about ${card.title} strategies`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                // Handle card selection
                                console.log(`Selected ${card.title}`);
                            }
                        }}
                    >
                        <h3>{card.title}</h3>
                        <div className={styles.features}>
                            <strong>Features: ⓘ</strong>
                            <ul>
                                {card.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.typeCardsIndicator}>
                <span className={styles.typeCardsCount}>980 • 518</span>
            </div>

            {/* Tab Navigation */}
            <div className={styles.tabNavigation}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                        onClick={() => handleTabChange(tab)}
                        disabled={isLoading}
                    >
                        {tab}
                    </button>
                ))}
                <div className={styles.resultCount}>
                    {isLoading ? 'Loading...' : `${filteredStrategies.length} • ${filteredStrategies.length}`}
                </div>
            </div>

            {/* Filter and Search */}
            <FilterBar onSearch={handleSearch} />

            {/* Strategy Cards Grid */}
            <div className={`${styles.strategyGrid} ${isLoading ? styles.loading : ''}`}>
                {/* Strategies Column (4fr) */}
                <div className={styles.strategiesColumn}>
                    {isLoading ? (
                        // Loading skeleton
                        Array.from({ length: 8 }).map((_, index) => (
                            <div key={`skeleton-${index}`} className={styles.skeletonCard}>
                                <div className={styles.skeletonHeader}></div>
                                <div className={styles.skeletonTitle}></div>
                                <div className={styles.skeletonDescription}></div>
                                <div className={styles.skeletonType}></div>
                            </div>
                        ))
                    ) : (
                        filteredStrategies.map((strategy, index) => (
                            <div key={index} className={styles.strategyCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.providerLogo}>
                                        <span>JPMorgan</span>
                                        <span className={styles.assetManagement}>ASSET MANAGEMENT</span>
                                    </div>
                                    <button 
                                        type="button"
                                        className={styles.bookmarkBtn}
                                        onClick={() => toggleBookmark(index)}
                                        aria-label={bookmarkedStrategies.has(index) ? 'Remove bookmark' : 'Add bookmark'}
                                    >
                                        {bookmarkedStrategies.has(index) ? '☑' : '☐'}
                                    </button>
                                </div>
                                <h3 className={styles.strategyTitle}>{strategy.title}</h3>
                                <p className={styles.strategyDescription}>{strategy.description}</p>
                                <div className={styles.strategyType}>
                                    <span className={`${styles.typeLabel} ${styles[strategy.type.replace(/[\s-]+/g, '').toLowerCase()]}`}>
                                        {strategy.type}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Separator */}
                <div className={styles.verticalSeparator}></div>

                {/* Upload Column (1fr) */}
                <div className={styles.uploadColumn}>
                    <UploadSection />
                </div>
            </div>
        </div>
    );
};

export default Strategies;
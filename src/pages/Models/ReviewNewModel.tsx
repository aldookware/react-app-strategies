import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ReviewNewModel.module.css';

interface Holding {
    ticker: string;
    name: string;
    weight: number;
    proxy: string;
}

interface ReviewNewModelProps {
    modelName?: string;
}

const ReviewNewModel: React.FC<ReviewNewModelProps> = ({ modelName = 'BlackRock Core Equity 80/20' }) => {
    const history = useHistory();
    const [reviewedHoldings, setReviewedHoldings] = useState(false);
    const [reviewedProxy, setReviewedProxy] = useState(false);

    const holdings: Holding[] = [
        { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 35.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
        { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 27.5, proxy: 'IXUS - iShares Core MSCI Total Int...' },
        { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 20.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
        { ticker: 'AMZN', name: 'Amazon.com, Inc.', weight: 2.5, proxy: 'FCOM - Fidelity MSCI Communica...' },
        { ticker: 'BRK.B', name: 'Berkshire Hathaway Inc. Class B', weight: 2.5, proxy: '-' },
        { ticker: 'COST', name: 'Costco Wholesale Corporation', weight: 2.5, proxy: 'XLP - Consumer Staples ETF' },
        { ticker: 'GOOGL', name: 'Alphabet Inc. Class C', weight: 2.5, proxy: 'XLY - Consumer Discretionary Se...' },
        { ticker: 'LLY', name: 'Eli Lilly and Company', weight: 2.5, proxy: 'VHT - Vanguard Health Care ETF' },
        { ticker: 'NVDA', name: 'NVIDIA Corporation', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
        { ticker: 'META', name: 'Meta Platforms, Inc.', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
        { ticker: 'MSFT', name: 'Microsoft Corporation', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
        { ticker: 'V', name: 'Visa Inc. Class A', weight: 2.5, proxy: 'IYF - iShares U.S. Financials ETF' }
    ];

    const handleCancel = () => {
        history.goBack();
    };

    const handleReject = () => {
        // Handle reject logic
        console.log('Model rejected');
    };

    const handleApproveAll = () => {
        if (reviewedHoldings && reviewedProxy) {
            // Handle approve all logic
            console.log('All models approved');
        }
    };

    const totalWeight = holdings.reduce((sum, holding) => sum + holding.weight, 0);

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <span className={styles.breadcrumbLink}>Models</span>
                <span className={styles.separator}>›</span>
                <span className={styles.breadcrumbLink}>Manage Strategies</span>
                <span className={styles.separator}>›</span>
                <span className={styles.breadcrumbLink}>Review Models</span>
                <span className={styles.separator}>›</span>
                <span className={styles.breadcrumbCurrent}>BlackRock Core Equity</span>
            </div>

            <div className={styles.header}>
                <h1 className={styles.title}>Review New Model — BlackRock Core Equity</h1>
            </div>

            <div className={styles.statusBanner}>
                <div className={styles.statusIcon}>⚠️</div>
                <div className={styles.statusContent}>
                    <span className={styles.statusTitle}>Awaiting Approval</span>
                    <span className={styles.statusDescription}>
                        Confirm holdings, weights, and other information about this model family. If there are any issues reject them and send it back with a note.
                    </span>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.leftPanel}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>REVIEW TYPE</h2>
                        <div className={styles.reviewType}>
                            <div className={styles.reviewTypeLabel}>New models - Manual upload</div>
                            <div className={styles.reviewTypeDescription}>
                                Manual upload sent by Maker: E1 M617/2025
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>BLACKROCK CORE EQUITY FAMILY MODELS</h2>
                        <div className={styles.modelList}>
                            <div className={styles.modelItem}>View All - Blackrock Core Equity Family</div>
                            <div className={styles.modelItem}>Blackrock Core Equity 100/0</div>
                            <div className={styles.modelItem}>Blackrock Core Equity 90/10</div>
                            <div className={`${styles.modelItem} ${styles.modelItemActive}`}>
                                Blackrock Core Equity 80/20
                                <span className={styles.modelItemArrow}>›</span>
                            </div>
                            <div className={styles.modelItem}>Blackrock Core Equity 75/25</div>
                            <div className={styles.modelItem}>Blackrock Core Equity 70/30</div>
                            <div className={styles.modelItem}>Blackrock Core Equity 60/40</div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>PROXY SET</h2>
                        <div className={styles.proxyInfo}>
                            <div className={styles.proxyTitle}>Selected from list</div>                        <div className={styles.proxyLink}>
                            <button className={styles.link}>Blackrock_large_cap</button>
                            <span className={styles.viewLink}>VIEW</span>
                        </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>CLIENTS ENTITLED</h2>
                        <div className={styles.clientsInfo}>
                            <div className={styles.clientsDescription}>
                                There are 7 clients entitled to this model
                            </div>
                            <button className={styles.expandButton}>⌄</button>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>AS OF DATE</h2>
                        <div className={styles.dateInfo}>
                            <div className={styles.dateDescription}>
                                This will represent the date these changes go into effect.
                            </div>
                            <div className={styles.date}>1/01/2025</div>
                        </div>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.tableContainer}>
                        <h2 className={styles.tableTitle}>{modelName}</h2>
                        <div className={styles.tableHeader}>
                            <div className={styles.holdingsCount}>12 holdings</div>
                            <div className={styles.totalWeight}>{totalWeight.toFixed(1)}%</div>
                            <div className={styles.proxiesCount}>11 proxies</div>
                        </div>
                        
                        <div className={styles.table}>
                            <div className={styles.tableHeaderRow}>
                                <div className={styles.tableHeaderCell}>Ticker</div>
                                <div className={styles.tableHeaderCell}>Name</div>
                                <div className={styles.tableHeaderCell}>Weight</div>
                                <div className={styles.tableHeaderCell}>Proxy</div>
                            </div>
                            
                            {holdings.map((holding, index) => (
                                <div key={holding.ticker} className={styles.tableRow}>
                                    <div className={styles.tableCell}>{holding.ticker}</div>
                                    <div className={styles.tableCell}>{holding.name}</div>
                                    <div className={styles.tableCell}>{holding.weight.toFixed(1)}%</div>
                                    <div className={styles.tableCell}>
                                        {holding.proxy === '-' ? (
                                            <span className={styles.warningIcon}>⚠️</span>
                                        ) : (
                                            holding.proxy
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.affirmSection}>
                        <h2 className={styles.affirmTitle}>AFFIRM</h2>
                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={reviewedHoldings}
                                    onChange={(e) => setReviewedHoldings(e.target.checked)}
                                />
                                <span className={styles.checkboxLabel}>
                                    I have reviewed the holdings, weights, as of date, rebalance selection.
                                </span>
                            </label>
                            
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={reviewedProxy}
                                    onChange={(e) => setReviewedProxy(e.target.checked)}
                                />
                                <span className={styles.checkboxLabel}>
                                    I have reviewed the proxy set and confirm that all proxies make sense for this model.
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.cancelButton} onClick={handleCancel}>
                            CANCEL
                        </button>
                        <button className={styles.rejectButton} onClick={handleReject}>
                            REJECT
                        </button>
                        <button
                            className={`${styles.approveButton} ${(!reviewedHoldings || !reviewedProxy) ? styles.disabled : ''}`}
                            onClick={handleApproveAll}
                            disabled={!reviewedHoldings || !reviewedProxy}
                        >
                            APPROVE ALL MODELS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewNewModel;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ActionModal from '../../components/Modal/ActionModal';
import styles from './ReviewNewModel.module.css';

interface Holding {
    ticker: string;
    name: string;
    weight: number;
    proxy: string;
}

interface ModelData {
    id: string;
    name: string;
    displayName: string;
    holdings: Holding[];
    totalWeight: number;
    proxyCount: number;
}

interface ReviewNewModelProps {
    modelName?: string;
}

const ReviewNewModel: React.FC<ReviewNewModelProps> = ({ modelName = 'BlackRock Core Equity 80/20' }) => {
    const history = useHistory();
    const [reviewedHoldings, setReviewedHoldings] = useState(false);
    const [reviewedProxy, setReviewedProxy] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedModelId, setSelectedModelId] = useState('80-20');

    const modelData: ModelData[] = [
        {
            id: '100-0',
            name: 'Blackrock Core Equity 100/0',
            displayName: 'BlackRock Core Equity 100/0',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 60.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 40.0, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'AMZN', name: 'Amazon.com, Inc.', weight: 0.0, proxy: 'FCOM - Fidelity MSCI Communica...' },
                { ticker: 'GOOGL', name: 'Alphabet Inc. Class C', weight: 0.0, proxy: 'XLY - Consumer Discretionary Se...' },
                { ticker: 'MSFT', name: 'Microsoft Corporation', weight: 0.0, proxy: 'VGT - Vanguard Information Tech...' },
            ],
            totalWeight: 100.0,
            proxyCount: 3
        },
        {
            id: '90-10',
            name: 'Blackrock Core Equity 90/10',
            displayName: 'BlackRock Core Equity 90/10',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 50.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 30.0, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 10.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
                { ticker: 'AMZN', name: 'Amazon.com, Inc.', weight: 3.0, proxy: 'FCOM - Fidelity MSCI Communica...' },
                { ticker: 'GOOGL', name: 'Alphabet Inc. Class C', weight: 3.0, proxy: 'XLY - Consumer Discretionary Se...' },
                { ticker: 'MSFT', name: 'Microsoft Corporation', weight: 4.0, proxy: 'VGT - Vanguard Information Tech...' },
            ],
            totalWeight: 100.0,
            proxyCount: 6
        },
        {
            id: '80-20',
            name: 'Blackrock Core Equity 80/20',
            displayName: 'BlackRock Core Equity 80/20',
            holdings: [
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
            ],
            totalWeight: 100.0,
            proxyCount: 11
        },
        {
            id: '75-25',
            name: 'Blackrock Core Equity 75/25',
            displayName: 'BlackRock Core Equity 75/25',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 30.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 25.0, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 25.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
                { ticker: 'AMZN', name: 'Amazon.com, Inc.', weight: 4.0, proxy: 'FCOM - Fidelity MSCI Communica...' },
                { ticker: 'GOOGL', name: 'Alphabet Inc. Class C', weight: 4.0, proxy: 'XLY - Consumer Discretionary Se...' },
                { ticker: 'MSFT', name: 'Microsoft Corporation', weight: 4.0, proxy: 'VGT - Vanguard Information Tech...' },
                { ticker: 'TSLA', name: 'Tesla, Inc.', weight: 4.0, proxy: 'VGT - Vanguard Information Tech...' },
                { ticker: 'NVDA', name: 'NVIDIA Corporation', weight: 4.0, proxy: 'VGT - Vanguard Information Tech...' },
            ],
            totalWeight: 100.0,
            proxyCount: 8
        },
        {
            id: '70-30',
            name: 'Blackrock Core Equity 70/30',
            displayName: 'BlackRock Core Equity 70/30',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 25.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 20.0, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 30.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
                { ticker: 'VTEB', name: 'Vanguard Tax-Exempt Bond ETF', weight: 15.0, proxy: 'MUB - iShares National Muni Bond...' },
                { ticker: 'AMZN', name: 'Amazon.com, Inc.', weight: 2.5, proxy: 'FCOM - Fidelity MSCI Communica...' },
                { ticker: 'GOOGL', name: 'Alphabet Inc. Class C', weight: 2.5, proxy: 'XLY - Consumer Discretionary Se...' },
                { ticker: 'MSFT', name: 'Microsoft Corporation', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
                { ticker: 'AAPL', name: 'Apple Inc.', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
            ],
            totalWeight: 100.0,
            proxyCount: 8
        },
        {
            id: '60-40',
            name: 'Blackrock Core Equity 60/40',
            displayName: 'BlackRock Core Equity 60/40',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 20.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 15.0, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 25.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
                { ticker: 'VTEB', name: 'Vanguard Tax-Exempt Bond ETF', weight: 15.0, proxy: 'MUB - iShares National Muni Bond...' },
                { ticker: 'VGIT', name: 'Vanguard Intermediate-Term Treasury ETF', weight: 10.0, proxy: 'IEF - iShares 7-10 Year Treasury...' },
                { ticker: 'VNQ', name: 'Vanguard Real Estate ETF', weight: 5.0, proxy: 'SCHH - Schwab US REIT ETF' },
                { ticker: 'AMZN', name: 'Amazon.com, Inc.', weight: 2.5, proxy: 'FCOM - Fidelity MSCI Communica...' },
                { ticker: 'GOOGL', name: 'Alphabet Inc. Class C', weight: 2.5, proxy: 'XLY - Consumer Discretionary Se...' },
                { ticker: 'MSFT', name: 'Microsoft Corporation', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
                { ticker: 'AAPL', name: 'Apple Inc.', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
            ],
            totalWeight: 100.0,
            proxyCount: 10
        }
    ];

    const currentModel = modelData.find(model => model.id === selectedModelId) || modelData[2]; // Default to 80/20

    const handleModelSelect = (modelId: string) => {
        setSelectedModelId(modelId);
        // Reset checkboxes when switching models
        setReviewedHoldings(false);
        setReviewedProxy(false);
    };

    const handleCancel = () => {
        history.goBack();
    };

    const handleReject = () => {
        setShowRejectModal(true);
    };

    const handleApproveAll = () => {
        if (reviewedHoldings && reviewedProxy) {
            setShowApproveModal(true);
        }
    };

    const handleRejectSubmit = async (reason: string) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Model rejected with reason:', reason);
            
            // Close modal and redirect
            setShowRejectModal(false);
            history.push('/models');
        } catch (error) {
            console.error('Error rejecting model:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApproveSubmit = async (reason: string) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Models approved with notes:', reason);
            
            // Close modal and redirect
            setShowApproveModal(false);
            history.push('/models');
        } catch (error) {
            console.error('Error approving models:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <span className={styles.breadcrumbLink}>Models</span>
                <span className={styles.separator}>›</span>
                <span className={styles.breadcrumbLink}>Manage Strategies</span>
                <span className={styles.separator}>›</span>
                <span className={styles.breadcrumbLink}>Review Models</span>
                <span className={styles.separator}>›</span>
                <span className={styles.breadcrumbCurrent}>{currentModel.displayName}</span>
            </div>

            <div className={styles.header}>
                <h1 className={styles.title}>Review New Model — {currentModel.displayName}</h1>
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

                    <div className={styles.modelSection}>
                        <h2 className={styles.sectionTitle}>BLACKROCK CORE EQUITY FAMILY MODELS</h2>
                        <div className={styles.modelList}>
                            <div className={`${styles.modelItem} ${styles.modelItemHeader}`}>
                                View All - Blackrock Core Equity Family
                            </div>
                            {modelData.map((model) => (
                                <div 
                                    key={model.id}
                                    className={`${styles.modelItem} ${selectedModelId === model.id ? styles.modelItemActive : ''}`}
                                    onClick={() => handleModelSelect(model.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleModelSelect(model.id);
                                        }
                                    }}
                                >
                                    {model.name}
                                    {selectedModelId === model.id && <span className={styles.modelItemArrow}>›</span>}
                                </div>
                            ))}
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
                        <h2 className={styles.tableTitle}>{currentModel.displayName}</h2>
                        <div className={styles.tableHeader}>
                            <div className={styles.holdingsCount}>{currentModel.holdings.length} holdings</div>
                            <div className={styles.totalWeight}>{currentModel.totalWeight.toFixed(1)}%</div>
                            <div className={styles.proxiesCount}>{currentModel.proxyCount} proxies</div>
                        </div>
                        
                        <div className={styles.table}>
                            <div className={styles.tableHeaderRow}>
                                <div className={styles.tableHeaderCell}>Ticker</div>
                                <div className={styles.tableHeaderCell}>Name</div>
                                <div className={styles.tableHeaderCell}>Weight</div>
                                <div className={styles.tableHeaderCell}>Proxy</div>
                            </div>
                            
                            {currentModel.holdings.map((holding: Holding, index: number) => (
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

            {/* Reject Modal */}
            <ActionModal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                onSubmit={handleRejectSubmit}
                title="REJECT MODEL"
                subtitle={`Add a note to send with a rejection for ${currentModel.displayName}`}
                actionType="reject"
                isLoading={isLoading}
            />

            {/* Approve Modal */}
            <ActionModal
                isOpen={showApproveModal}
                onClose={() => setShowApproveModal(false)}
                onSubmit={handleApproveSubmit}
                title="APPROVE ALL MODELS"
                actionType="approve"
                isLoading={isLoading}
            />
        </div>
    );
};

export default ReviewNewModel;

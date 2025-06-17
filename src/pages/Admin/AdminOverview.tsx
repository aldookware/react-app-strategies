import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './AdminOverview.module.css';

interface ModelFamily {
    id: string;
    name: string;
    description: string;
    provider: string;
    modelsCount: number;
    createdDate: string;
    status: 'active' | 'inactive';
}

interface ModelStats {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}

const AdminOverview: React.FC = () => {
    const history = useHistory();

    const [modelStats] = useState<ModelStats>({
        total: 45,
        pending: 3,
        approved: 38,
        rejected: 4
    });

    const [modelFamilies] = useState<ModelFamily[]>([
        {
            id: '1',
            name: 'BlackRock Equity Models',
            description: 'Comprehensive equity strategies from BlackRock including large-cap, mid-cap, and growth funds',
            provider: 'BlackRock',
            modelsCount: 12,
            createdDate: '2025-01-15',
            status: 'active'
        },
        {
            id: '2',
            name: 'Vanguard Index Models',
            description: 'Low-cost index tracking strategies covering various market segments',
            provider: 'Vanguard',
            modelsCount: 8,
            createdDate: '2025-02-20',
            status: 'active'
        },
        {
            id: '3',
            name: 'Fidelity ESG Models',
            description: 'Environmental, Social, and Governance focused investment strategies',
            provider: 'Fidelity',
            modelsCount: 5,
            createdDate: '2025-03-10',
            status: 'active'
        },
        {
            id: '4',
            name: 'State Street Multi-Asset',
            description: 'Diversified multi-asset allocation strategies for balanced portfolios',
            provider: 'State Street',
            modelsCount: 7,
            createdDate: '2025-04-05',
            status: 'active'
        },
        {
            id: '5',
            name: 'JPMorgan Fixed Income',
            description: 'Bond and fixed income strategies across various durations and credit qualities',
            provider: 'JPMorgan',
            modelsCount: 9,
            createdDate: '2025-05-12',
            status: 'inactive'
        },
        {
            id: '6',
            name: 'Goldman Sachs Alternative',
            description: 'Alternative investment strategies including commodities and REITs',
            provider: 'Goldman Sachs',
            modelsCount: 4,
            createdDate: '2025-06-01',
            status: 'active'
        }
    ]);

    return (
        <div className={styles.adminOverview}>
            {/* Header */}
            <div className={styles.header}>
                <h1>Admin Overview</h1>
                <p className={styles.description}>
                    Centralized management for models and approval workflows
                </p>
            </div>

            {/* Admin Tiles */}
            <div className={styles.tilesSection}>
                <div className={styles.tilesGrid}>
                    <div 
                        className={styles.tile}
                        onClick={() => history.push('/approvals')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                history.push('/approvals');
                            }
                        }}
                    >
                        <div className={styles.tileIcon}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="#007bff">
                                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                            </svg>
                        </div>
                        <h3>Model Approvals</h3>
                        <p>Review and approve pending model submissions</p>
                        <div className={styles.tileStats}>
                            <span className={styles.pendingCount}>{modelStats.pending} pending</span>
                        </div>
                    </div>

                    <div 
                        className={styles.tile}
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
                        <div className={styles.tileIcon}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="#28a745">
                                <path d="M12 2L3 7L12 12L21 7L12 2M3 17L12 22L21 17M3 12L12 17L21 12"/>
                            </svg>
                        </div>
                        <h3>Manage Models</h3>
                        <p>View, edit, and organize investment models</p>
                        <div className={styles.tileStats}>
                            <span className={styles.totalCount}>{modelStats.total} total models</span>
                        </div>
                    </div>

                    <div 
                        className={styles.tile}
                        role="button"
                        tabIndex={0}
                        onClick={() => history.push('/admin/model-families')}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                history.push('/admin/model-families');
                            }
                        }}
                    >
                        <div className={styles.tileIcon}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="#17a2b8">
                                <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M20 16H8V4H20V16Z"/>
                            </svg>
                        </div>
                        <h3>Model Families</h3>
                        <p>Organize models into families and categories</p>
                        <div className={styles.tileStats}>
                            <span className={styles.familyCount}>{modelFamilies.length} families</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AdminOverview;

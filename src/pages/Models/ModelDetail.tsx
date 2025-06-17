import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './ModelDetail.module.css';

interface ModelDetailParams {
    modelId: string;
}

const ModelDetail: React.FC = () => {
    const history = useHistory();
    const { modelId } = useParams<ModelDetailParams>();
    
    // Decode the model name from URL
    const modelName = decodeURIComponent(modelId);

    return (
        <div className={styles.modelDetailContainer}>

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <button 
                        className={styles.backBtn}
                        onClick={() => history.goBack()}
                        aria-label="Go back to models list"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Back
                    </button>
                    <h1>{modelName}</h1>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.editBtn}>Edit Model</button>
                    <button className={styles.deleteBtn}>Delete Model</button>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.modelInfo}>
                    <h2>Model Information</h2>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <label>Model Family:</label>
                            <span>BR Equity Models</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Model Type:</label>
                            <span>Equity</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Sub Model Type:</label>
                            <span>Large cap</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Benchmark:</label>
                            <span>S&P 500</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Tax Management:</label>
                            <span>Yes</span>
                        </div>
                    </div>
                </div>

                <div className={styles.modelDescription}>
                    <h2>Description</h2>
                    <p>
                        This model is designed to provide long-term capital growth by investing in U.S. large-cap equity stocks. 
                        The strategy focuses on value-oriented investments with active tax management to optimize after-tax returns.
                    </p>
                </div>

                <div className={styles.modelPerformance}>
                    <h2>Performance & Holdings</h2>
                    <p>Performance data and holdings information would be displayed here.</p>
                </div>
            </div>
        </div>
    );
};

export default ModelDetail;

import React from 'react';
import styles from './UploadSection.module.css';

const UploadSection: React.FC = () => {
    const handleManageStrategies = () => {
        console.log('Go to Manage Strategies clicked');
    };

    return (
        <div className={styles.uploadContainer}>
            <div className={styles.uploadCard}>
                <div className={styles.uploadIcon}>
                    <div className={styles.plusIcon}>+</div>
                </div>
                <h3 className={styles.uploadTitle}>Add / Upload Strategies</h3>
                <p className={styles.uploadDescription}>
                    Upload or edit strategies & parameters via .xlsx and .csv, connect to your strategy provider(s), and more.
                </p>
            </div>
            <button 
                type="button"
                className={styles.manageLink}
                onClick={handleManageStrategies}
            >
                Go to Manage Strategies →
            </button>
        </div>
    );
};

export default UploadSection;
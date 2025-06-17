import React from 'react';
import styles from './ManageSidebar.module.css';

const ManageSidebar: React.FC = () => {
    const handleAddUpload = () => {
        console.log('Add/upload strategies clicked');
    };

    const handleManageStrategies = () => {
        console.log('Go to Manage Strategies clicked');
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                <h3 className={styles.sidebarTitle}>Manage Strategies</h3>
                
                <button 
                    className={styles.addUploadButton}
                    onClick={handleAddUpload}
                    aria-label="Add or upload strategies"
                >
                    Add/upload strategies
                </button>
                
                <button 
                    className={styles.manageButton}
                    onClick={handleManageStrategies}
                    aria-label="Go to Manage Strategies"
                >
                    Go to Manage Strategies →
                </button>
            </div>
        </div>
    );
};

export default ManageSidebar;
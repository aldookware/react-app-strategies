import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Manage Strategies</h3>
                <button className={styles.sidebarButton}>
                    Add/upload strategies
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

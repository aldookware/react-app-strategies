import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BreadcrumbBar.module.css';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbBarProps {
    breadcrumbs: BreadcrumbItem[];
}

const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({ breadcrumbs }) => {
    if (breadcrumbs.length === 0) return null;

    return (
        <div className={styles.breadcrumbBar}>
            <div className={styles.container}>
                <nav className={styles.breadcrumb}>
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span className={styles.separator}>›</span>}
                            {item.href ? (
                                <Link to={item.href} className={styles.breadcrumbLink}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={styles.breadcrumbCurrent}>{item.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default BreadcrumbBar;
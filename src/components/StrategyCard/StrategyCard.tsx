import React from 'react';
import styles from './StrategyCard.module.css';

interface StrategyCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ title, description, imageUrl }) => {
    return (
        <div className={styles.card}>
            <img src={imageUrl} alt={title} className={styles.image} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default StrategyCard;
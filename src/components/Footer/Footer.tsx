import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
    content?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ content }) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {content || (
                    <>
                        <p className={styles.leftText}>
                            © 2025 55ip. All rights reserved.
                        </p>
                        <p className={styles.rightText}>
                            Solution designed by Openinvest.
                        </p>
                    </>
                )}
            </div>
        </footer>
    );
};

export default Footer;
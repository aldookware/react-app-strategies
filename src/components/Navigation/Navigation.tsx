import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationContext';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
    const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const manageDropdownRef = useRef<HTMLDivElement>(null);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const { pendingApprovalsCount } = useNotifications();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (manageDropdownRef.current && !manageDropdownRef.current.contains(event.target as Node)) {
                setIsManageDropdownOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
        };

        if (isManageDropdownOpen || isUserDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isManageDropdownOpen, isUserDropdownOpen]);

    return (
        <nav className={styles.navigation}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <img src="/logo.svg" alt="Company Logo" className={styles.logoImage} />
                </div>
                <div className={styles.navItems}>
                    <Link to="/" className={styles.navItem}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M3 3v6h6V3H3zm2 2h2v2H5V5zm6-2v6h6V3h-6zm2 2h2v2h-2V5zM3 13v6h6v-6H3zm2 2h2v2H5v-2zm8 0v6h6v-6h-6zm2 2h2v2h-2v-2z"/>
                        </svg>
                        <span>Dashboard</span>
                    </Link>
                    <div className={styles.dropdown} ref={manageDropdownRef}>
                        <button
                            className={styles.dropdownButton}
                            onClick={() => setIsManageDropdownOpen(!isManageDropdownOpen)}
                            aria-expanded={isManageDropdownOpen}
                            aria-haspopup="true"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M12 15.5C13.1 15.5 14 14.6 14 13.5S13.1 11.5 12 11.5 10 12.4 10 13.5 10.9 15.5 12 15.5M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.72 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.72 19.04 4.95 18.95L7.44 17.95C7.96 18.35 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.27 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z"/>
                            </svg>
                            <span>Manage</span>
                            {pendingApprovalsCount > 0 && (
                                <span className={styles.navNotificationBubble}>
                                    {pendingApprovalsCount}
                                </span>
                            )}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>
                        {isManageDropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                <Link to="/approvals" className={styles.dropdownItem}>
                                    <span>Approvals</span>
                                    {pendingApprovalsCount > 0 && (
                                        <span className={styles.notificationBadge}>
                                            {pendingApprovalsCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/models" className={styles.dropdownItem}>
                                    <span>Manage Strategies</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={styles.dropdown} ref={userDropdownRef}>
                        <button
                            className={styles.userButton}
                            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            aria-expanded={isUserDropdownOpen}
                            aria-haspopup="true"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z"/>
                            </svg>
                            <span>Michael</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>
                        {isUserDropdownOpen && (
                            <div className={styles.userDropdownMenu}>
                                <div className={styles.dropdownItem}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.79 14 8 15.79 8 18V20H16V18C16 15.79 14.21 14 12 14Z"/>
                                    </svg>
                                    <span>Profile</span>
                                </div>
                                <div className={styles.dropdownItem}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 4A3.5 3.5 0 0 0 12.5 7.5M15.5 11L18.5 14L22 10.5L20.5 9L18.5 11L16.5 9L15.5 11Z"/>
                                    </svg>
                                    <span>Logout</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
    pendingApprovalsCount: number;
    setPendingApprovalsCount: (count: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [pendingApprovalsCount, setPendingApprovalsCount] = useState(0);

    return (
        <NotificationContext.Provider value={{
            pendingApprovalsCount,
            setPendingApprovalsCount
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

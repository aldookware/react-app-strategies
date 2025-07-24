import React, { useState } from 'react';
import Modal from './Modal';
import styles from './ActionModal.module.css';

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reason: string) => void;
    title: string;
    subtitle?: string;
    actionType: 'approve' | 'reject';
    isLoading?: boolean;
}

const ActionModal: React.FC<ActionModalProps> = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    title, 
    subtitle,
    actionType,
    isLoading = false 
}) => {
    const [reason, setReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (reason.trim()) {
            onSubmit(reason.trim());
        }
    };

    const handleClose = () => {
        setReason('');
        onClose();
    };

    const isApprove = actionType === 'approve';
    const buttonText = isApprove ? 'APPROVE ALL MODELS' : 'SEND REJECTION WITH NOTE';

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={title}>
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="reason" className={styles.label}>
                        {isApprove ? 'Approval Notes (Optional)' : 'Notes'}
                    </label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className={styles.textarea}
                        placeholder={
                            isApprove 
                                ? 'Add any additional notes about this approval...'
                                : 'Add a reason for rejection...'
                        }
                        required={!isApprove}
                        disabled={isLoading}
                    />
                    {!isApprove && (
                        <div className={styles.helperText}>
                            Please provide a clear reason for rejection to help the submitter understand what needs to be corrected.
                        </div>
                    )}
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        CANCEL
                    </button>
                    <button
                        type="submit"
                        className={`${styles.submitButton} ${isApprove ? styles.approve : styles.reject}`}
                        disabled={isLoading || (!isApprove && !reason.trim())}
                    >
                        {isLoading ? (
                            <span className={styles.loadingText}>
                                <span className={styles.spinner}></span>
                                Processing...
                            </span>
                        ) : (
                            buttonText
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ActionModal;

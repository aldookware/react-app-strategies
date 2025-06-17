import React, { useState, useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import styles from './AdminDashboard.module.css';

interface Comment {
    id: string;
    text: string;
    author: string;
    timestamp: string;
    action?: 'approved' | 'rejected' | 'comment';
}

interface PendingModel {
    id: string;
    name: string;
    family: string;
    type: string;
    subType: string;
    benchmark: string;
    taxManagement: string;
    submittedBy: string;
    submittedDate: string;
    status: 'pending' | 'approved' | 'rejected';
    comments: Comment[];
}

const AdminDashboard: React.FC = () => {
    const { setPendingApprovalsCount } = useNotifications();
    const [pendingModels, setPendingModels] = useState<PendingModel[]>([
        {
            id: '1',
            name: 'Vanguard Total Stock Market Index',
            family: 'Vanguard Index Models',
            type: 'Equity',
            subType: 'Total market',
            benchmark: 'CRSP US Total Market',
            taxManagement: 'No',
            submittedBy: 'john.doe@example.com',
            submittedDate: '2025-06-15',
            status: 'pending',
            comments: [
                {
                    id: '1',
                    text: 'Initial review completed. Awaiting final approval.',
                    author: 'reviewer@55ip.com',
                    timestamp: '2025-06-15T14:30:00Z',
                    action: 'comment'
                }
            ]
        },
        {
            id: '2',
            name: 'Fidelity ESG Core Bond Fund',
            family: 'Fidelity ESG Models',
            type: 'Fixed income',
            subType: 'Core bond',
            benchmark: 'Bloomberg US Aggregate',
            taxManagement: 'Yes',
            submittedBy: 'jane.smith@example.com',
            submittedDate: '2025-06-14',
            status: 'pending',
            comments: []
        },
        {
            id: '3',
            name: 'State Street Global Allocation',
            family: 'State Street Multi-Asset',
            type: 'Multi-asset',
            subType: 'Global allocation',
            benchmark: 'Custom benchmark',
            taxManagement: 'Yes',
            submittedBy: 'mike.johnson@example.com',
            submittedDate: '2025-06-13',
            status: 'pending',
            comments: [
                {
                    id: '2',
                    text: 'Please review the allocation percentages in the documentation.',
                    author: 'compliance@55ip.com',
                    timestamp: '2025-06-13T16:45:00Z',
                    action: 'comment'
                },
                {
                    id: '3',
                    text: 'Updated documentation has been submitted.',
                    author: 'mike.johnson@example.com',
                    timestamp: '2025-06-14T09:15:00Z',
                    action: 'comment'
                }
            ]
        }
    ]);

    const [showCommentModal, setShowCommentModal] = useState(false);
    const [currentModelId, setCurrentModelId] = useState<string>('');
    const [currentAction, setCurrentAction] = useState<'approve' | 'reject' | 'comment'>('comment');
    const [commentText, setCommentText] = useState('');

    // Update notification count whenever models change
    useEffect(() => {
        const pendingCount = pendingModels.filter(model => model.status === 'pending').length;
        setPendingApprovalsCount(pendingCount);
    }, [pendingModels, setPendingApprovalsCount]);

    const addComment = (modelId: string, text: string, action?: 'approved' | 'rejected' | 'comment') => {
        const newComment: Comment = {
            id: Date.now().toString(),
            text,
            author: 'current.user@55ip.com', // In real app, this would come from auth
            timestamp: new Date().toISOString(),
            action
        };

        setPendingModels(prev => 
            prev.map(model => 
                model.id === modelId 
                    ? { 
                        ...model, 
                        comments: [...model.comments, newComment],
                        ...(action === 'approved' && { status: 'approved' as const }),
                        ...(action === 'rejected' && { status: 'rejected' as const })
                    }
                    : model
            )
        );
    };

    const handleApproveModel = (modelId: string) => {
        setCurrentModelId(modelId);
        setCurrentAction('approve');
        setShowCommentModal(true);
    };

    const handleRejectModel = (modelId: string) => {
        setCurrentModelId(modelId);
        setCurrentAction('reject');
        setShowCommentModal(true);
    };

    const handleAddComment = (modelId: string) => {
        setCurrentModelId(modelId);
        setCurrentAction('comment');
        setShowCommentModal(true);
    };

    const handleSubmitComment = () => {
        if (commentText.trim()) {
            const action = currentAction === 'approve' ? 'approved' : 
                         currentAction === 'reject' ? 'rejected' : 'comment';
            addComment(currentModelId, commentText.trim(), action);
            setCommentText('');
            setShowCommentModal(false);
        }
    };

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className={styles.adminDashboard}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Approvals</h1>
                    <p className={styles.description}>
                        Review and approve or reject submitted models
                    </p>
                </div>
            </div>

            {/* Pending Models Content */}
            <div className={styles.tabContent}>
                <div className={styles.modelsGrid}>
                    {pendingModels.filter(model => model.status === 'pending').map(model => (
                        <div key={model.id} className={styles.modelCard}>
                            <div className={styles.modelHeader}>
                                <h3>{model.name}</h3>
                                <span className={`${styles.status} ${styles[model.status]}`}>
                                    {model.status}
                                </span>
                            </div>
                            
                            <div className={styles.modelDetails}>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Family:</span>
                                    <span>{model.family}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Type:</span>
                                    <span>{model.type} - {model.subType}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Benchmark:</span>
                                    <span>{model.benchmark}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Tax Management:</span>
                                    <span>{model.taxManagement}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Submitted by:</span>
                                    <span>{model.submittedBy}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Date:</span>
                                    <span>{new Date(model.submittedDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Comments Section */}
                            {model.comments.length > 0 && (
                                <div className={styles.commentsSection}>
                                    <h4>Comments</h4>
                                    <div className={styles.commentsList}>
                                        {model.comments.map(comment => (
                                            <div key={comment.id} className={styles.comment}>
                                                <div className={styles.commentHeader}>
                                                    <span className={styles.commentAuthor}>{comment.author}</span>
                                                    <span className={styles.commentTime}>{formatTimestamp(comment.timestamp)}</span>
                                                    {comment.action && (
                                                        <span className={`${styles.commentAction} ${styles[comment.action]}`}>
                                                            {comment.action}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className={styles.commentText}>{comment.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className={styles.modelActions}>
                                <button 
                                    type="button"
                                    className={styles.approveBtn}
                                    onClick={() => handleApproveModel(model.id)}
                                >
                                    Approve
                                </button>
                                <button 
                                    type="button"
                                    className={styles.rejectBtn}
                                    onClick={() => handleRejectModel(model.id)}
                                >
                                    Reject
                                </button>
                                <button 
                                    type="button"
                                    className={styles.commentBtn}
                                    onClick={() => handleAddComment(model.id)}
                                >
                                    Add Comment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {pendingModels.filter(model => model.status === 'pending').length === 0 && (
                    <div className={styles.emptyState}>
                        <p>No pending models to review</p>
                    </div>
                )}
            </div>

            {/* Comment Modal */}
            {showCommentModal && (
                <div className={styles.modalOverlay} onClick={() => setShowCommentModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>
                                {currentAction === 'approve' ? 'Approve Model' : 
                                 currentAction === 'reject' ? 'Reject Model' : 'Add Comment'}
                            </h3>
                            <button 
                                className={styles.closeBtn}
                                onClick={() => setShowCommentModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <textarea
                                className={styles.commentTextarea}
                                placeholder={`Add a comment${currentAction !== 'comment' ? ` for ${currentAction}ing this model` : ''}...`}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div className={styles.modalFooter}>
                            <button 
                                className={styles.cancelBtn}
                                onClick={() => setShowCommentModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className={`${styles.submitBtn} ${
                                    currentAction === 'approve' ? styles.approve : 
                                    currentAction === 'reject' ? styles.reject : styles.comment
                                }`}
                                onClick={handleSubmitComment}
                                disabled={!commentText.trim()}
                            >
                                {currentAction === 'approve' ? 'Approve' : 
                                 currentAction === 'reject' ? 'Reject' : 'Add Comment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

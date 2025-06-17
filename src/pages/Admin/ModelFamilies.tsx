import React, { useState } from 'react';
import styles from './ModelFamilies.module.css';

interface ModelFamily {
    id: string;
    name: string;
    description: string;
    provider: string;
    modelsCount: number;
    createdDate: string;
    status: 'active' | 'inactive';
}

const ModelFamilies: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterProvider, setFilterProvider] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const [modelFamilies, setModelFamilies] = useState<ModelFamily[]>([
        {
            id: '1',
            name: 'BlackRock Equity Models',
            description: 'Comprehensive equity strategies from BlackRock including large cap, mid cap, and growth focused portfolios',
            provider: 'BlackRock',
            modelsCount: 12,
            createdDate: '2025-01-15',
            status: 'active'
        },
        {
            id: '2',
            name: 'Vanguard Index Models',
            description: 'Low-cost index tracking strategies covering broad market exposure and sector-specific investments',
            provider: 'Vanguard',
            modelsCount: 8,
            createdDate: '2025-02-20',
            status: 'active'
        },
        {
            id: '3',
            name: 'Fidelity ESG Models',
            description: 'Environmental, Social, and Governance focused strategies for sustainable investing',
            provider: 'Fidelity',
            modelsCount: 5,
            createdDate: '2025-03-10',
            status: 'active'
        },
        {
            id: '4',
            name: 'State Street Multi-Asset',
            description: 'Diversified multi-asset allocation strategies for balanced portfolio construction',
            provider: 'State Street',
            modelsCount: 7,
            createdDate: '2025-04-05',
            status: 'active'
        },
        {
            id: '5',
            name: 'JPMorgan Fixed Income',
            description: 'Comprehensive fixed income strategies including government, corporate, and municipal bonds',
            provider: 'JPMorgan',
            modelsCount: 3,
            createdDate: '2025-05-12',
            status: 'inactive'
        }
    ]);

    const [newFamily, setNewFamily] = useState({
        name: '',
        description: '',
        provider: ''
    });

    const [editingFamily, setEditingFamily] = useState<ModelFamily | null>(null);

    // Get unique providers for filter dropdown
    const providers = Array.from(new Set(modelFamilies.map(family => family.provider)));

    // Filter families based on search and filters
    const filteredFamilies = modelFamilies.filter(family => {
        const matchesSearch = family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            family.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            family.provider.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesProvider = filterProvider === 'all' || family.provider === filterProvider;
        const matchesStatus = filterStatus === 'all' || family.status === filterStatus;
        
        return matchesSearch && matchesProvider && matchesStatus;
    });

    const handleAddFamily = () => {
        if (newFamily.name && newFamily.description && newFamily.provider) {
            const family: ModelFamily = {
                id: Date.now().toString(),
                name: newFamily.name,
                description: newFamily.description,
                provider: newFamily.provider,
                modelsCount: 0,
                createdDate: new Date().toISOString().split('T')[0],
                status: 'active'
            };
            setModelFamilies(prev => [family, ...prev]);
            setNewFamily({ name: '', description: '', provider: '' });
            setIsDialogOpen(false);
        }
    };

    const handleEditFamily = (family: ModelFamily) => {
        setEditingFamily(family);
        setNewFamily({
            name: family.name,
            description: family.description,
            provider: family.provider
        });
        setIsDialogOpen(true);
    };

    const handleUpdateFamily = () => {
        if (editingFamily && newFamily.name && newFamily.description && newFamily.provider) {
            setModelFamilies(prev => prev.map(family => 
                family.id === editingFamily.id 
                    ? { ...family, name: newFamily.name, description: newFamily.description, provider: newFamily.provider }
                    : family
            ));
            setNewFamily({ name: '', description: '', provider: '' });
            setEditingFamily(null);
            setIsDialogOpen(false);
        }
    };

    const handleDeleteFamily = (familyId: string) => {
        if (window.confirm('Are you sure you want to delete this model family?')) {
            setModelFamilies(prev => prev.filter(family => family.id !== familyId));
        }
    };

    const handleToggleStatus = (familyId: string) => {
        setModelFamilies(prev => prev.map(family => 
            family.id === familyId 
                ? { ...family, status: family.status === 'active' ? 'inactive' : 'active' }
                : family
        ));
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingFamily(null);
        setNewFamily({ name: '', description: '', provider: '' });
    };

    return (
        <div className={styles.modelFamilies}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Model Families</h1>
                    <p className={styles.description}>
                        Manage model families and organize your investment strategies
                    </p>
                </div>
                <button 
                    className={styles.addButton}
                    onClick={() => setIsDialogOpen(true)}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Add Family
                </button>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.searchContainer}>
                    <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search families..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                
                <select 
                    value={filterProvider} 
                    onChange={(e) => setFilterProvider(e.target.value)}
                    className={styles.filterSelect}
                    aria-label="Filter by provider"
                    title="Filter families by provider"
                >
                    <option value="all">All Providers</option>
                    {providers.map(provider => (
                        <option key={provider} value={provider}>{provider}</option>
                    ))}
                </select>

                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={styles.filterSelect}
                    aria-label="Filter by status"
                    title="Filter families by status"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <span className={styles.statNumber}>{modelFamilies.length}</span>
                    <span className={styles.statLabel}>Total Families</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNumber}>{modelFamilies.filter(f => f.status === 'active').length}</span>
                    <span className={styles.statLabel}>Active</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNumber}>{modelFamilies.reduce((sum, f) => sum + f.modelsCount, 0)}</span>
                    <span className={styles.statLabel}>Total Models</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNumber}>{providers.length}</span>
                    <span className={styles.statLabel}>Providers</span>
                </div>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Family Name</th>
                            <th>Provider</th>
                            <th>Description</th>
                            <th>Models</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFamilies.map(family => (
                            <tr key={family.id}>
                                <td className={styles.nameCell}>
                                    <div className={styles.familyName}>{family.name}</div>
                                </td>
                                <td>{family.provider}</td>
                                <td className={styles.descriptionCell}>
                                    <div className={styles.description}>{family.description}</div>
                                </td>
                                <td className={styles.modelsCell}>
                                    <span className={styles.modelCount}>{family.modelsCount}</span>
                                </td>
                                <td>
                                    <span className={`${styles.statusBadge} ${styles[family.status]}`}>
                                        {family.status}
                                    </span>
                                </td>
                                <td>{new Date(family.createdDate).toLocaleDateString()}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button 
                                            className={styles.editButton}
                                            onClick={() => handleEditFamily(family)}
                                            aria-label={`Edit ${family.name}`}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button 
                                            className={styles.toggleButton}
                                            onClick={() => handleToggleStatus(family.id)}
                                            aria-label={`${family.status === 'active' ? 'Deactivate' : 'Activate'} ${family.name}`}
                                        >
                                            {family.status === 'active' ? (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M10 12V17L15 12H13V7L8 12H10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M8 12L13 7V10H18V14H13V17L8 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            )}
                                        </button>
                                        <button 
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteFamily(family.id)}
                                            aria-label={`Delete ${family.name}`}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredFamilies.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>No model families found matching your criteria</p>
                    </div>
                )}
            </div>

            {/* Dialog */}
            {isDialogOpen && (
                <div className={styles.dialogOverlay} onClick={handleCloseDialog}>
                    <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.dialogHeader}>
                            <h2>{editingFamily ? 'Edit Model Family' : 'Add New Model Family'}</h2>
                            <button 
                                className={styles.closeButton}
                                onClick={handleCloseDialog}
                                aria-label="Close dialog"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div className={styles.dialogContent}>
                            <div className={styles.formGroup}>
                                <label htmlFor="familyName">Family Name *</label>
                                <input
                                    id="familyName"
                                    type="text"
                                    value={newFamily.name}
                                    onChange={(e) => setNewFamily(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g., BlackRock Equity Models"
                                    required
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="provider">Provider *</label>
                                <input
                                    id="provider"
                                    type="text"
                                    value={newFamily.provider}
                                    onChange={(e) => setNewFamily(prev => ({ ...prev, provider: e.target.value }))}
                                    placeholder="e.g., BlackRock"
                                    required
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="description">Description *</label>
                                <textarea
                                    id="description"
                                    value={newFamily.description}
                                    onChange={(e) => setNewFamily(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Brief description of the model family"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.dialogActions}>
                            <button 
                                className={styles.cancelButton}
                                onClick={handleCloseDialog}
                            >
                                Cancel
                            </button>
                            <button 
                                className={styles.saveButton}
                                onClick={editingFamily ? handleUpdateFamily : handleAddFamily}
                                disabled={!newFamily.name || !newFamily.description || !newFamily.provider}
                            >
                                {editingFamily ? 'Update Family' : 'Add Family'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModelFamilies;

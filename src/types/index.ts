// Legacy types (keeping for existing functionality)
export interface Strategy {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
}

export interface FilterOptions {
    searchTerm: string;
    category: string;
}

export interface UploadData {
    file: File;
    description: string;
}

// Django Backend Integration Types
export interface TickerMapping {
    ticker: string;
    proxy_ticker: string | null;
    proxy_name: string | null;
}

export interface ProxySet {
    id: string;
    name: string;
    description: string;
    ticker_mappings: TickerMapping[];
    created_at: string;
    is_active: boolean;
}

export interface ModelHolding {
    ticker: string;
    name: string;
    weight: number;
    proxy_ticker: string | null;
    proxy_name: string | null;
    order: number;
}

export interface Model {
    id: string;
    name: string;
    display_name: string;
    holdings: ModelHolding[];
    total_weight: number;
    proxy_count: number;
    family?: string; // Family ID reference
}

export interface ModelFamily {
    id: string;
    name: string;
    display_name: string;
    models: Model[];
    proxy_set: string;
    proxy_set_name: string;
    description?: string;
    created_at?: string;
    is_active?: boolean;
}

// Legacy interface for backward compatibility (maps to Model)
export interface ModelData {
    id: string;
    name: string;
    displayName: string;
    holdings: Holding[];
    totalWeight: number;
    proxyCount: number;
}

// Legacy interface for backward compatibility (maps to ModelHolding)
export interface Holding {
    ticker: string;
    name: string;
    weight: number;
    proxy: string;
}

// Review and approval types
export interface ReviewStatus {
    reviewedHoldings: boolean;
    reviewedProxy: boolean;
}

export interface ApprovalRequest {
    modelId: string;
    notes?: string;
}

export interface RejectionRequest {
    modelId: string;
    reason: string;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// Error types
export interface ApiError {
    message: string;
    status: number;
    field_errors?: Record<string, string[]>;
}

// Form validation types
export interface ValidationError {
    field: string;
    message: string;
}

// UI State types
export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

export interface ModalState {
    isOpen: boolean;
    type: 'approve' | 'reject' | null;
    data?: any;
}
/**
 * API Service Layer for Django Backend Integration
 * Handles all HTTP requests to the Django REST API
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Helper function for making API requests
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`API Request failed for ${endpoint}:`, error);
        throw error;
    }
}

// Proxy Set Service
export const proxySetService = {
    async getAll() {
        return apiRequest<ProxySetResponse[]>('/proxy-sets/');
    },

    async getById(id: string) {
        return apiRequest<ProxySetResponse>(`/proxy-sets/${id}/`);
    },

    async create(data: CreateProxySetRequest) {
        return apiRequest<ProxySetResponse>('/proxy-sets/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async update(id: string, data: UpdateProxySetRequest) {
        return apiRequest<ProxySetResponse>(`/proxy-sets/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async delete(id: string) {
        return apiRequest<void>(`/proxy-sets/${id}/`, {
            method: 'DELETE',
        });
    },

    async addTickerMapping(proxySetId: string, mapping: TickerMappingRequest) {
        return apiRequest<TickerMappingResponse>(`/proxy-sets/${proxySetId}/add-ticker-mapping/`, {
            method: 'POST',
            body: JSON.stringify(mapping),
        });
    },
};

// Model Family Service
export const modelFamilyService = {
    async getAll() {
        return apiRequest<ModelFamilyResponse[]>('/model-families/');
    },

    async getById(id: string) {
        return apiRequest<ModelFamilyResponse>(`/model-families/${id}/`);
    },

    async create(data: CreateModelFamilyRequest) {
        return apiRequest<ModelFamilyResponse>('/model-families/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async update(id: string, data: UpdateModelFamilyRequest) {
        return apiRequest<ModelFamilyResponse>(`/model-families/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async delete(id: string) {
        return apiRequest<void>(`/model-families/${id}/`, {
            method: 'DELETE',
        });
    },

    async getReviewModels(familyId: string) {
        return apiRequest<ModelResponse[]>(`/model-families/${familyId}/review-models/`);
    },
};

// Model Service
export const modelService = {
    async getAll() {
        return apiRequest<ModelResponse[]>('/models/');
    },

    async getById(id: string) {
        return apiRequest<ModelResponse>(`/models/${id}/`);
    },

    async create(data: CreateModelRequest) {
        return apiRequest<ModelResponse>('/models/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async update(id: string, data: UpdateModelRequest) {
        return apiRequest<ModelResponse>(`/models/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async delete(id: string) {
        return apiRequest<void>(`/models/${id}/`, {
            method: 'DELETE',
        });
    },

    async approve(modelId: string, notes?: string) {
        return apiRequest<ApprovalResponse>(`/models/${modelId}/approve/`, {
            method: 'POST',
            body: JSON.stringify({ notes }),
        });
    },

    async reject(modelId: string, reason: string) {
        return apiRequest<RejectionResponse>(`/models/${modelId}/reject/`, {
            method: 'POST',
            body: JSON.stringify({ reason }),
        });
    },
};

// Type definitions for API requests and responses
export interface TickerMappingResponse {
    ticker: string;
    proxy_ticker: string | null;
    proxy_name: string | null;
}

export interface ProxySetResponse {
    id: string;
    name: string;
    description: string;
    ticker_mappings: TickerMappingResponse[];
    created_at: string;
    is_active: boolean;
}

export interface ModelHoldingResponse {
    ticker: string;
    name: string;
    weight: number;
    proxy_ticker: string | null;
    proxy_name: string | null;
    order: number;
}

export interface ModelResponse {
    id: string;
    name: string;
    display_name: string;
    holdings: ModelHoldingResponse[];
    total_weight: number;
    proxy_count: number;
}

export interface ModelFamilyResponse {
    id: string;
    name: string;
    display_name: string;
    models: ModelResponse[];
    proxy_set: string;
    proxy_set_name: string;
}

export interface CreateProxySetRequest {
    id: string;
    name: string;
    description?: string;
}

export interface UpdateProxySetRequest {
    name?: string;
    description?: string;
    is_active?: boolean;
}

export interface TickerMappingRequest {
    ticker: string;
    proxy_ticker?: string;
    proxy_name?: string;
}

export interface CreateModelFamilyRequest {
    id: string;
    name: string;
    display_name: string;
    description?: string;
    proxy_set: string;
}

export interface UpdateModelFamilyRequest {
    name?: string;
    display_name?: string;
    description?: string;
    proxy_set?: string;
    is_active?: boolean;
}

export interface CreateModelRequest {
    id: string;
    family: string;
    name: string;
    display_name: string;
    description?: string;
    holdings: CreateModelHoldingRequest[];
}

export interface CreateModelHoldingRequest {
    ticker: string;
    name: string;
    weight: number;
    order?: number;
}

export interface UpdateModelRequest {
    name?: string;
    display_name?: string;
    description?: string;
    holdings?: CreateModelHoldingRequest[];
    is_active?: boolean;
}

export interface ApprovalResponse {
    status: 'approved';
    notes: string;
    timestamp: string;
}

export interface RejectionResponse {
    status: 'rejected';
    reason: string;
    timestamp: string;
}

// Error handling
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public response?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

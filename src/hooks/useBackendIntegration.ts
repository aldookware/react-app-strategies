/**
 * Custom React hooks for Django backend integration
 */

import { useState, useEffect } from 'react';
import { modelFamilyService, modelService } from '../services/api';
import { transformModelsData, generateMockModelData, handleApiError } from '../utils/dataTransforms';
import { ModelData, LoadingState } from '../types';

/**
 * Hook for loading model family data for review
 */
export function useModelFamilyReview(familyId: string) {
    const [modelData, setModelData] = useState<ModelData[]>([]);
    const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });

    useEffect(() => {
        const loadModelData = async () => {
            setLoading({ isLoading: true, error: null });
            
            try {
                // Try to load from Django backend first
                const response = await modelFamilyService.getReviewModels(familyId);
                const transformedData = transformModelsData(response);
                setModelData(transformedData);
            } catch (error) {
                console.warn('Failed to load from backend, using mock data:', error);
                // Fallback to mock data for development
                const mockData = generateMockModelData();
                setModelData(mockData);
            } finally {
                setLoading({ isLoading: false, error: null });
            }
        };

        loadModelData();
    }, [familyId]);

    const refetch = async () => {
        const loadModelData = async () => {
            setLoading({ isLoading: true, error: null });
            
            try {
                const response = await modelFamilyService.getReviewModels(familyId);
                const transformedData = transformModelsData(response);
                setModelData(transformedData);
            } catch (error) {
                console.warn('Failed to load from backend, using mock data:', error);
                const mockData = generateMockModelData();
                setModelData(mockData);
            } finally {
                setLoading({ isLoading: false, error: null });
            }
        };
        
        await loadModelData();
    };

    return { modelData, loading, refetch };
}

/**
 * Hook for model approval/rejection actions
 */
export function useModelActions() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const approveModel = async (modelId: string, notes?: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await modelService.approve(modelId, notes);
            return result;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const rejectModel = async (modelId: string, reason: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await modelService.reject(modelId, reason);
            return result;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);

    return {
        isLoading,
        error,
        approveModel,
        rejectModel,
        clearError
    };
}

/**
 * Hook for managing review state (checkboxes, etc.)
 */
export function useReviewState() {
    const [reviewedHoldings, setReviewedHoldings] = useState(false);
    const [reviewedProxy, setReviewedProxy] = useState(false);
    
    const canApprove = reviewedHoldings && reviewedProxy;
    
    const reset = () => {
        setReviewedHoldings(false);
        setReviewedProxy(false);
    };

    return {
        reviewedHoldings,
        setReviewedHoldings,
        reviewedProxy,
        setReviewedProxy,
        canApprove,
        reset
    };
}

/**
 * Hook for modal state management
 */
export function useModalState() {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);

    const openRejectModal = () => setShowRejectModal(true);
    const closeRejectModal = () => setShowRejectModal(false);
    const openApproveModal = () => setShowApproveModal(true);
    const closeApproveModal = () => setShowApproveModal(false);

    const closeAllModals = () => {
        setShowRejectModal(false);
        setShowApproveModal(false);
    };

    return {
        showRejectModal,
        showApproveModal,
        openRejectModal,
        closeRejectModal,
        openApproveModal,
        closeApproveModal,
        closeAllModals
    };
}

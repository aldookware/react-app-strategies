/**
 * Data transformation utilities for converting between Django API responses 
 * and React component interfaces
 */

import { 
    ModelData, 
    Holding, 
    Model, 
    ModelHolding, 
    ModelFamily,
    TickerMapping 
} from '../types';
import { ModelResponse, ModelHoldingResponse, ModelFamilyResponse } from '../services/api';

/**
 * Transform Django ModelHoldingResponse to legacy Holding interface
 */
export function transformHolding(holding: ModelHoldingResponse): Holding {
    return {
        ticker: holding.ticker,
        name: holding.name,
        weight: holding.weight,
        proxy: holding.proxy_ticker 
            ? `${holding.proxy_ticker} - ${holding.proxy_name || ''}`
            : '-'
    };
}

/**
 * Transform Django ModelResponse to legacy ModelData interface
 */
export function transformModelData(model: ModelResponse): ModelData {
    return {
        id: model.id,
        name: model.name,
        displayName: model.display_name,
        holdings: model.holdings.map(transformHolding),
        totalWeight: model.total_weight,
        proxyCount: model.proxy_count
    };
}

/**
 * Transform array of Django ModelResponse to legacy ModelData array
 */
export function transformModelsData(models: ModelResponse[]): ModelData[] {
    return models.map(transformModelData);
}

/**
 * Transform Django ModelHoldingResponse to new ModelHolding interface
 */
export function transformModelHolding(holding: ModelHoldingResponse): ModelHolding {
    return {
        ticker: holding.ticker,
        name: holding.name,
        weight: holding.weight,
        proxy_ticker: holding.proxy_ticker,
        proxy_name: holding.proxy_name,
        order: holding.order
    };
}

/**
 * Transform Django ModelResponse to new Model interface
 */
export function transformModel(model: ModelResponse): Model {
    return {
        id: model.id,
        name: model.name,
        display_name: model.display_name,
        holdings: model.holdings.map(transformModelHolding),
        total_weight: model.total_weight,
        proxy_count: model.proxy_count
    };
}

/**
 * Transform Django ModelFamilyResponse to ModelFamily interface
 */
export function transformModelFamily(family: ModelFamilyResponse): ModelFamily {
    return {
        id: family.id,
        name: family.name,
        display_name: family.display_name,
        models: family.models.map(transformModel),
        proxy_set: family.proxy_set,
        proxy_set_name: family.proxy_set_name
    };
}

/**
 * Generate mock data for development/testing (preserves existing functionality)
 */
export function generateMockModelData(): ModelData[] {
    return [
        {
            id: '100-0',
            name: 'Blackrock Core Equity 100/0',
            displayName: 'BlackRock Core Equity 100/0',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 60.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 40.0, proxy: 'IXUS - iShares Core MSCI Total Int...' },
            ],
            totalWeight: 100.0,
            proxyCount: 2
        },
        {
            id: '90-10',
            name: 'Blackrock Core Equity 90/10',
            displayName: 'BlackRock Core Equity 90/10',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 54.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 36.0, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 10.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
            ],
            totalWeight: 100.0,
            proxyCount: 3
        },
        {
            id: '80-20',
            name: 'Blackrock Core Equity 80/20',
            displayName: 'BlackRock Core Equity 80/20',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 35.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 27.5, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 20.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
                { ticker: 'AMZN', name: 'Amazon.com, Inc.', weight: 2.5, proxy: 'FCOM - Fidelity MSCI Communica...' },
                { ticker: 'BRK.B', name: 'Berkshire Hathaway Inc. Class B', weight: 2.5, proxy: '-' },
                { ticker: 'COST', name: 'Costco Wholesale Corporation', weight: 2.5, proxy: 'XLP - Consumer Staples Select...' },
                { ticker: 'GOOGL', name: 'Alphabet Inc. Class C', weight: 2.5, proxy: 'XLY - Consumer Discretionary Se...' },
                { ticker: 'LLY', name: 'Eli Lilly and Company', weight: 2.5, proxy: 'VHT - Vanguard Health Care ETF' },
                { ticker: 'NVDA', name: 'NVIDIA Corporation', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
                { ticker: 'META', name: 'Meta Platforms, Inc.', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
                { ticker: 'MSFT', name: 'Microsoft Corporation', weight: 2.5, proxy: 'VGT - Vanguard Information Tech...' },
                { ticker: 'V', name: 'Visa Inc. Class A', weight: 2.5, proxy: 'IYF - iShares U.S. Financial ETF' },
            ],
            totalWeight: 100.0,
            proxyCount: 11
        },
        {
            id: '75-25',
            name: 'Blackrock Core Equity 75/25',
            displayName: 'BlackRock Core Equity 75/25',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 33.75, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 26.25, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 25.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
                { ticker: 'VTEB', name: 'Vanguard Tax-Exempt Bond Index Fund ETF', weight: 15.0, proxy: 'MUB - iShares National Muni Bond ETF' },
            ],
            totalWeight: 100.0,
            proxyCount: 4
        },
        {
            id: '70-30',
            name: 'Blackrock Core Equity 70/30',
            displayName: 'BlackRock Core Equity 70/30',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 31.5, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 24.5, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 30.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
                { ticker: 'VGIT', name: 'Vanguard Intermediate-Term Treasury Index Fund ETF', weight: 14.0, proxy: 'IEF - iShares 7-10 Year Treasury ETF' },
            ],
            totalWeight: 100.0,
            proxyCount: 4
        },
        {
            id: '60-40',
            name: 'Blackrock Core Equity 60/40',
            displayName: 'BlackRock Core Equity 60/40',
            holdings: [
                { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: 27.0, proxy: 'SCHB - Schwab U.S. Broad Market' },
                { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', weight: 21.0, proxy: 'IXUS - iShares Core MSCI Total Int...' },
                { ticker: 'BND', name: 'Vanguard Total Bond Market Index Fund ETF', weight: 40.0, proxy: 'AGG - iShares Core U.S. Aggregat...' },
                { ticker: 'VNQ', name: 'Vanguard Real Estate Index Fund ETF', weight: 12.0, proxy: 'SCHH - Schwab US REIT ETF' },
            ],
            totalWeight: 100.0,
            proxyCount: 4
        }
    ];
}

/**
 * Create sample proxy mappings for development
 */
export function generateSampleProxyMappings(): Record<string, TickerMapping> {
    return {
        'VTI': { ticker: 'VTI', proxy_ticker: 'SCHB', proxy_name: 'Schwab U.S. Broad Market' },
        'VXUS': { ticker: 'VXUS', proxy_ticker: 'IXUS', proxy_name: 'iShares Core MSCI Total International' },
        'BND': { ticker: 'BND', proxy_ticker: 'AGG', proxy_name: 'iShares Core U.S. Aggregate Bond' },
        'AMZN': { ticker: 'AMZN', proxy_ticker: 'FCOM', proxy_name: 'Fidelity MSCI Communication Services' },
        'GOOGL': { ticker: 'GOOGL', proxy_ticker: 'XLY', proxy_name: 'Consumer Discretionary Select Sector' },
        'MSFT': { ticker: 'MSFT', proxy_ticker: 'VGT', proxy_name: 'Vanguard Information Technology' },
        'NVDA': { ticker: 'NVDA', proxy_ticker: 'VGT', proxy_name: 'Vanguard Information Technology' },
        'META': { ticker: 'META', proxy_ticker: 'VGT', proxy_name: 'Vanguard Information Technology' },
        'BRK.B': { ticker: 'BRK.B', proxy_ticker: null, proxy_name: null },
        'COST': { ticker: 'COST', proxy_ticker: 'XLP', proxy_name: 'Consumer Staples Select Sector' },
        'LLY': { ticker: 'LLY', proxy_ticker: 'VHT', proxy_name: 'Vanguard Health Care ETF' },
        'V': { ticker: 'V', proxy_ticker: 'IYF', proxy_name: 'iShares U.S. Financial ETF' },
        'VTEB': { ticker: 'VTEB', proxy_ticker: 'MUB', proxy_name: 'iShares National Muni Bond ETF' },
        'VGIT': { ticker: 'VGIT', proxy_ticker: 'IEF', proxy_name: 'iShares 7-10 Year Treasury ETF' },
        'VNQ': { ticker: 'VNQ', proxy_ticker: 'SCHH', proxy_name: 'Schwab US REIT ETF' }
    };
}

/**
 * Error handling utility for API responses
 */
export function handleApiError(error: any): string {
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }
    if (error?.message) {
        return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
}

/**
 * Validation utilities
 */
export function validateModelData(model: Partial<Model>): string[] {
    const errors: string[] = [];
    
    if (!model.name?.trim()) {
        errors.push('Model name is required');
    }
    
    if (!model.display_name?.trim()) {
        errors.push('Display name is required');
    }
    
    if (!model.holdings || model.holdings.length === 0) {
        errors.push('At least one holding is required');
    }
    
    if (model.holdings) {
        const totalWeight = model.holdings.reduce((sum, holding) => sum + holding.weight, 0);
        if (Math.abs(totalWeight - 100) > 0.01) {
            errors.push('Total weight must equal 100%');
        }
    }
    
    return errors;
}

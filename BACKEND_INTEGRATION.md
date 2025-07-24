# Django Backend Integration - React App Strategies

This document describes the Django backend integration for the React App Strategies project, specifically for the proxy set and model family management system.

## Overview

The integration provides a complete CRUD system for managing:
- **Proxy Sets**: Collections of ticker-to-proxy mappings
- **Model Families**: Groups of related financial models
- **Models**: Individual financial models with holdings
- **Model Holdings**: Specific ticker allocations within models

## Architecture

```
React Frontend ←→ Django REST API ←→ PostgreSQL Database
     ↓                    ↓                    ↓
- ReviewNewModel     - ViewSets           - Models
- API Services       - Serializers       - Relationships
- Custom Hooks       - Validation        - Constraints
```

## File Structure

```
src/
├── services/
│   └── api.ts                 # Django REST API client
├── utils/
│   └── dataTransforms.ts      # Data transformation utilities
├── hooks/
│   └── useBackendIntegration.ts # Custom React hooks
├── types/
│   └── index.ts               # TypeScript interfaces
└── pages/Models/
    └── ReviewNewModel.tsx     # Updated component with backend integration
```

## Key Features

### 1. API Service Layer (`src/services/api.ts`)

Provides a clean interface to the Django REST API:

```typescript
// Example usage
import { modelFamilyService, modelService } from '../services/api';

// Load models for review
const models = await modelFamilyService.getReviewModels('blackrock-core-equity');

// Approve a model
await modelService.approve('model-id', 'Approved after review');
```

### 2. Data Transformation (`src/utils/dataTransforms.ts`)

Converts between Django API responses and React component interfaces:

```typescript
// Transform Django response to component format
const componentData = transformModelsData(djangoResponse);

// Fallback to mock data for development
const mockData = generateMockModelData();
```

### 3. Custom Hooks (`src/hooks/useBackendIntegration.ts`)

Encapsulates backend logic in reusable hooks:

```typescript
// Load model family data
const { modelData, loading, refetch } = useModelFamilyReview(familyId);

// Handle approve/reject actions
const { approveModel, rejectModel, isLoading } = useModelActions();
```

### 4. Updated ReviewNewModel Component

The component now:
- Loads data from Django backend (with fallback to mock data)
- Handles loading and error states
- Integrates with approval/rejection APIs
- Maintains backward compatibility

## Django Backend Structure

### Models

```python
# Proxy Set Management
class ProxySet(models.Model):
    id = models.CharField(primary_key=True)
    name = models.CharField(max_length=200)
    # ... other fields

class TickerProxyMapping(models.Model):
    proxy_set = models.ForeignKey(ProxySet)
    ticker = models.CharField(max_length=10)
    proxy_ticker = models.CharField(max_length=10, null=True)
    # ... other fields

# Model Family Management
class ModelFamily(models.Model):
    id = models.CharField(primary_key=True)
    name = models.CharField(max_length=200)
    proxy_set = models.ForeignKey(ProxySet)
    # ... other fields

class Model(models.Model):
    id = models.CharField(primary_key=True)
    family = models.ForeignKey(ModelFamily)
    name = models.CharField(max_length=200)
    # ... other fields

class ModelHolding(models.Model):
    model = models.ForeignKey(Model)
    ticker = models.CharField(max_length=10)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    # ... other fields
```

### API Endpoints

```
# Proxy Set Management
GET    /api/proxy-sets/                    # List proxy sets
POST   /api/proxy-sets/                    # Create proxy set
GET    /api/proxy-sets/{id}/               # Get proxy set
PUT    /api/proxy-sets/{id}/               # Update proxy set
POST   /api/proxy-sets/{id}/add-ticker-mapping/  # Add ticker mapping

# Model Family Management
GET    /api/model-families/                # List model families
POST   /api/model-families/                # Create model family
GET    /api/model-families/{id}/           # Get model family
GET    /api/model-families/{id}/review-models/  # Get models for review

# Model Management
GET    /api/models/                        # List models
POST   /api/models/                        # Create model
GET    /api/models/{id}/                   # Get model
POST   /api/models/{id}/approve/           # Approve model
POST   /api/models/{id}/reject/            # Reject model
```

## Environment Configuration

Add to your `.env` file:

```bash
# Django API Configuration
REACT_APP_API_URL=http://localhost:8000/api
```

## Usage Examples

### Loading Model Data

```typescript
import { useModelFamilyReview } from '../hooks/useBackendIntegration';

function ReviewComponent() {
    const { modelData, loading, refetch } = useModelFamilyReview('blackrock-core-equity');
    
    if (loading.isLoading) return <div>Loading...</div>;
    if (loading.error) return <div>Error: {loading.error}</div>;
    
    return (
        <div>
            {modelData.map(model => (
                <div key={model.id}>{model.displayName}</div>
            ))}
        </div>
    );
}
```

### Handling Approvals

```typescript
import { useModelActions } from '../hooks/useBackendIntegration';

function ApprovalComponent() {
    const { approveModel, rejectModel, isLoading } = useModelActions();
    
    const handleApprove = async (modelId: string) => {
        try {
            await approveModel(modelId, 'Approved after thorough review');
            // Handle success
        } catch (error) {
            // Handle error
        }
    };
    
    return (
        <button onClick={() => handleApprove('model-id')} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Approve'}
        </button>
    );
}
```

## Development Workflow

1. **Backend Development**: Create Django models, serializers, and views
2. **API Integration**: Update `api.ts` with new endpoints
3. **Data Transformation**: Add transformation functions in `dataTransforms.ts`
4. **Component Integration**: Update React components to use new APIs
5. **Testing**: Test with both real and mock data

## Error Handling

The integration includes comprehensive error handling:

- **Network errors**: Graceful fallback to mock data
- **API errors**: User-friendly error messages
- **Loading states**: Proper loading indicators
- **Validation errors**: Field-specific error display

## Backward Compatibility

The integration maintains backward compatibility by:
- Keeping existing interfaces intact
- Providing fallback to mock data
- Preserving component behavior
- Supporting incremental migration

## Future Enhancements

- Real-time updates via WebSockets
- Caching with React Query
- Optimistic updates
- Offline support
- Enhanced error recovery

## Testing

### Mock Data for Development

When the Django backend is not available, the system automatically falls back to mock data defined in `dataTransforms.ts`:

```typescript
// Automatically used when backend is unavailable
const mockData = generateMockModelData();
```

### Integration Testing

Test both backend integration and fallback scenarios:

```typescript
// Test with real backend
const realData = await modelFamilyService.getReviewModels('family-id');

// Test with mock data
const mockData = generateMockModelData();
```

## Deployment

1. **Environment Variables**: Configure `REACT_APP_API_URL`
2. **CORS Settings**: Ensure Django allows React app origin
3. **Authentication**: Add token-based auth if required
4. **Error Monitoring**: Set up error tracking for production

This integration provides a robust foundation for managing financial model data with a modern React frontend backed by a scalable Django API.

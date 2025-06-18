# Testing Setup Documentation

## ✅ Setup Complete & Working

Your React project now has a fully functional testing environment using Jest and React Testing Library. All tests are passing and the setup is ready for development.

## Testing Stack

- **Jest**: JavaScript testing framework (included with create-react-app)
- **React Testing Library**: Simple and complete testing utilities for React components  
- **@testing-library/jest-dom**: Custom Jest matchers for DOM elements
- **@testing-library/user-event**: Advanced user interaction simulation
- **TypeScript Support**: Full type safety in tests with @types/jest

## Current Test Status

```bash
✓ 9 tests passing
✓ 3 test suites passing  
✓ All dependencies compatible with React 17
```

## Project Structure

```
src/
├── setupTests.ts              # Global test configuration
├── utils/
│   ├── test-utils.tsx         # Custom render function with providers
│   └── test-helpers.ts        # Common test data and utilities
├── basic.test.tsx             # Basic testing verification
├── testing-verification.test.tsx  # Framework capability tests
└── App.test.tsx               # App component tests
```

## Available Test Scripts

### Run Tests
```bash
npm test                    # Run tests in watch mode
npm run test:ci            # Run tests once (CI mode)
npm run test:coverage      # Run tests with coverage report
```

### Test Commands Examples
```bash
# Run specific test file
npm test Navigation.test.tsx

# Run tests matching pattern
npm test --testNamePattern="renders"

# Run tests with verbose output
npm test --verbose
```

## Testing Patterns

### 1. Component Testing
Test components in isolation with proper mocking:

```tsx
import { render, screen } from '../utils/test-utils';
import MyComponent from './MyComponent';

test('renders component correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### 2. User Interaction Testing
Test user interactions like clicks, typing, etc:

```tsx
import { fireEvent } from '@testing-library/react';

test('handles button click', () => {
  render(<MyComponent />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getByText('Button Clicked')).toBeInTheDocument();
});
```

### 3. Context Testing
Test React contexts and providers:

```tsx
import { renderHook, act } from '@testing-library/react';

test('context provides correct values', () => {
  const { result } = renderHook(() => useMyContext(), { wrapper });
  expect(result.current.value).toBe('expected');
});
```

### 4. Router Testing
Test components that use React Router:

```tsx
// Uses custom render with BrowserRouter wrapper
import { render } from '../utils/test-utils';

test('navigation works', () => {
  render(<NavigationComponent />);
  const link = screen.getByRole('link', { name: /dashboard/i });
  expect(link).toHaveAttribute('href', '/');
});
```

## Testing Best Practices

### 1. What to Test
- ✅ Component renders without crashing
- ✅ User interactions work correctly
- ✅ Props are handled properly
- ✅ State changes behave as expected
- ✅ Error boundaries work
- ✅ Accessibility features

### 2. What NOT to Test
- ❌ Implementation details
- ❌ Third-party library internals
- ❌ Styling specifics (unless functional)
- ❌ Console logs

### 3. Testing Query Priorities
1. **getByRole** - Most accessible queries
2. **getByLabelText** - Good for form elements
3. **getByText** - For content
4. **getByTestId** - Last resort

### 4. Async Testing
```tsx
import { waitFor } from '@testing-library/react';

test('async operation', async () => {
  render(<AsyncComponent />);
  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument();
  });
});
```

## Mock Patterns

### 1. Module Mocking
```tsx
jest.mock('./MyModule', () => ({
  myFunction: jest.fn(() => 'mocked result'),
}));
```

### 2. Context Mocking
```tsx
jest.mock('../../contexts/NotificationContext', () => ({
  useNotifications: () => ({
    pendingApprovalsCount: 2,
  }),
}));
```

### 3. Router Mocking
```tsx
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/test' }),
}));
```

## Coverage Configuration
Coverage reports include:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

Coverage thresholds can be configured in `jest.config.json`.

## Common Testing Issues & Solutions

### Issue: CSS Modules
**Solution**: Already configured with `identity-obj-proxy`

### Issue: Window/DOM APIs
**Solution**: Mocked in `setupTests.ts`

### Issue: Router Dependencies
**Solution**: Custom render with router wrapper

### Issue: Context Dependencies
**Solution**: Custom render with provider wrapper

## Running Specific Tests

```bash
# Test a specific component
npm test Navigation

# Test with pattern matching
npm test --testNamePattern="dropdown"

# Test with file watching disabled
npm test --watchAll=false

# Test with coverage for specific files
npm test --coverage --collectCoverageFrom="src/components/**/*.{ts,tsx}"
```

## Continuous Integration
For CI/CD pipelines, use:
```bash
npm run test:ci
```

This ensures tests run once without watch mode and pass even if no tests are found.

## Next Steps
1. Add more component tests as you build new features
2. Set up integration tests for complete user flows
3. Configure coverage thresholds for quality gates
4. Add visual regression testing (optional)
5. Set up performance testing (optional)

## Debugging Tests
- Use `screen.debug()` to see the current DOM
- Add `--verbose` flag for detailed output
- Use Chrome DevTools with `--inspect-brk` flag

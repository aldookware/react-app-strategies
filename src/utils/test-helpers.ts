// Common test data and helpers
export const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin'
};

export const mockModels = [
  {
    id: 1,
    name: 'Test Model 1',
    status: 'pending',
    description: 'A test model for approval',
    submittedBy: 'user1',
    submittedAt: '2025-06-16T10:00:00Z'
  },
  {
    id: 2,
    name: 'Test Model 2',
    status: 'approved',
    description: 'An approved test model',
    submittedBy: 'user2',
    submittedAt: '2025-06-15T14:30:00Z'
  }
];

export const mockBreadcrumbs = [
  { label: 'Dashboard', href: '/' },
  { label: 'Models', href: '/models' },
  { label: 'Add Models' }
];

// Helper function to create mock functions
export const createMockFn = () => jest.fn();

// Helper to simulate delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Common assertions
export const expectElementToBeVisible = (element: HTMLElement) => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
};

// Test ID helpers
export const getTestId = (testId: string) => `[data-testid="${testId}"]`;

// Mock local storage
export const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

// Replace the real localStorage with mock
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

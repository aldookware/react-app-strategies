import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Simple test component
const TestComponent: React.FC = () => (
  <div>
    <h1>Test Header</h1>
    <button>Test Button</button>
    <a href="/test">Test Link</a>
  </div>
);

// Test with router wrapper
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Testing Framework Verification', () => {
  test('can render basic elements', () => {
    render(<TestComponent />);
    
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  test('can query by role', () => {
    render(<TestComponent />);
    
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  test('can test with router', () => {
    renderWithRouter(<TestComponent />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  test('jest matchers work correctly', () => {
    expect(2 + 2).toBe(4);
    expect('hello world').toContain('world');
    expect(['apple', 'banana']).toHaveLength(2);
  });
});

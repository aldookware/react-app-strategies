import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Basic Testing Setup', () => {
  test('basic test works', () => {
    expect(true).toBe(true);
  });

  test('can render a simple component', () => {
    render(<div data-testid="test-element">Hello World</div>);
    expect(screen.getByTestId('test-element')).toBeInTheDocument();
  });
});

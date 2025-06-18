import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './utils/test-utils';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    const navElements = screen.getAllByRole('navigation');
    expect(navElements.length).toBeGreaterThan(0);
  });

  test('renders navigation component', () => {
    render(<App />);
    const logo = screen.getByAltText('Company Logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders main content area', () => {
    render(<App />);
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });
});

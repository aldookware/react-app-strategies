import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import BreadcrumbBar from './BreadcrumbBar';

const mockBreadcrumbs = [
  { label: 'Dashboard', href: '/' },
  { label: 'Models', href: '/models' },
  { label: 'Add Models' }
];

describe('BreadcrumbBar Component', () => {
  test('renders breadcrumb bar', () => {
    render(<BreadcrumbBar breadcrumbs={mockBreadcrumbs} />);
    const breadcrumbNav = screen.getByRole('navigation');
    expect(breadcrumbNav).toBeInTheDocument();
  });

  test('renders all breadcrumb items', () => {
    render(<BreadcrumbBar breadcrumbs={mockBreadcrumbs} />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Models')).toBeInTheDocument();
    expect(screen.getByText('Add Models')).toBeInTheDocument();
  });

  test('renders links for items with href', () => {
    render(<BreadcrumbBar breadcrumbs={mockBreadcrumbs} />);
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    const modelsLink = screen.getByRole('link', { name: /^models$/i });
    
    expect(dashboardLink).toHaveAttribute('href', '/');
    expect(modelsLink).toHaveAttribute('href', '/models');
  });

  test('renders current page without link', () => {
    render(<BreadcrumbBar breadcrumbs={mockBreadcrumbs} />);
    
    const currentPage = screen.getByText('Add Models');
    expect(currentPage).not.toHaveAttribute('href');
  });

  test('renders separators between items', () => {
    render(<BreadcrumbBar breadcrumbs={mockBreadcrumbs} />);
    
    const separators = screen.getAllByText('›');
    expect(separators).toHaveLength(2); // Should have 2 separators for 3 items
  });

  test('returns null when no breadcrumbs provided', () => {
    const { container } = render(<BreadcrumbBar breadcrumbs={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import Navigation from './Navigation';

// Mock the NotificationContext to avoid dependency issues
jest.mock('../../contexts/NotificationContext', () => ({
  useNotifications: () => ({
    pendingApprovalsCount: 2,
  }),
}));

describe('Navigation Component', () => {
  test('renders navigation bar', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  test('renders logo', () => {
    render(<Navigation />);
    const logo = screen.getByAltText('Company Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.svg');
  });

  test('renders Dashboard link', () => {
    render(<Navigation />);
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/');
  });

  test('renders Manage dropdown button', () => {
    render(<Navigation />);
    const manageButton = screen.getByRole('button', { name: /manage/i });
    expect(manageButton).toBeInTheDocument();
  });

  test('renders user dropdown button', () => {
    render(<Navigation />);
    const userButton = screen.getByRole('button', { name: /michael/i });
    expect(userButton).toBeInTheDocument();
  });
});

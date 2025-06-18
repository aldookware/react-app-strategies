import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { NotificationProvider, useNotifications } from './NotificationContext';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NotificationProvider>{children}</NotificationProvider>
);

describe('NotificationContext', () => {
  test('provides initial state', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });
    
    expect(result.current.pendingApprovalsCount).toBe(0);
  });

  test('updates pending approvals count', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });
    
    act(() => {
      result.current.setPendingApprovalsCount(5);
    });
    
    expect(result.current.pendingApprovalsCount).toBe(5);
  });

  test('increments pending approvals count', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });
    
    act(() => {
      result.current.setPendingApprovalsCount(3);
    });
    
    act(() => {
      result.current.incrementPendingApprovals();
    });
    
    expect(result.current.pendingApprovalsCount).toBe(4);
  });

  test('decrements pending approvals count', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });
    
    act(() => {
      result.current.setPendingApprovalsCount(3);
    });
    
    act(() => {
      result.current.decrementPendingApprovals();
    });
    
    expect(result.current.pendingApprovalsCount).toBe(2);
  });

  test('does not decrement below 0', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });
    
    act(() => {
      result.current.decrementPendingApprovals();
    });
    
    expect(result.current.pendingApprovalsCount).toBe(0);
  });
});

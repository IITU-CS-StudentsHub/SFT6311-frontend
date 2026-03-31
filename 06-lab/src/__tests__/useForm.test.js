import { renderHook, act } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { useForm } from '../hooks/useForm';

describe('useForm custom hook', () => {
  it('should initialize with provided values', () => {
    const { result } = renderHook(() => useForm({ name: 'Test' }));
    expect(result.current.values).toEqual({ name: 'Test' });
  });

  it('should update state on handleChange for text input', () => {
    const { result } = renderHook(() => useForm({ username: '' }));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'username', value: 'john_doe', type: 'text' }
      });
    });

    expect(result.current.values.username).toBe('john_doe');
  });

  it('should update state on handleChange for checkbox input', () => {
    const { result } = renderHook(() => useForm({ accept: false }));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'accept', checked: true, type: 'checkbox' }
      });
    });

    expect(result.current.values.accept).toBe(true);
  });

  it('should reset form to initial values', () => {
    const { result } = renderHook(() => useForm({ name: 'Initial' }));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Changed', type: 'text' }
      });
    });
    expect(result.current.values.name).toBe('Changed');

    act(() => {
      result.current.resetForm();
    });
    expect(result.current.values.name).toBe('Initial');
  });
});

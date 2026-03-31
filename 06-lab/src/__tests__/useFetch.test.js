import { renderHook, waitFor } from '@testing-library/react';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import { useFetch } from '../hooks/useFetch';

describe('useFetch custom hook', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('should fetch data successfully', async () => {
    const mockData = [{ id: 1, title: 'Service 1' }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('http://api.test/data'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    const { result } = renderHook(() => useFetch('http://api.test/error'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Error: 404 Not Found');
    expect(result.current.data).toBe(null);
  });
});

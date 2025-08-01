// useDeviceType.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useDeviceType } from './hooks';

describe('useDeviceType', () => {
  const resizeWindow = (width: number) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
  };

  it('should detect mobile', () => {
    resizeWindow(500);
    const { result } = renderHook(() => useDeviceType());
    expect(result.current).toBe('mobile');
  });

  it('should detect tablet', () => {
    resizeWindow(800);
    const { result } = renderHook(() => useDeviceType());
    expect(result.current).toBe('tablet');
  });

  it('should detect desktop', () => {
    resizeWindow(1300);
    const { result } = renderHook(() => useDeviceType());
    expect(result.current).toBe('desktop');
  });

  it('should update on resize', () => {
    resizeWindow(1300);
    const { result } = renderHook(() => useDeviceType());
    expect(result.current).toBe('desktop');

    act(() => resizeWindow(600));
    expect(result.current).toBe('mobile');
  });
});

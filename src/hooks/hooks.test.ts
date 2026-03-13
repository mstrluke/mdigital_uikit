import { renderHook, act, waitFor } from '@testing-library/react'
import { useDebounce } from './useDebounce'
import { useThrottle } from './useThrottle'
import { useControllable } from './useControllable'
import { useMediaQuery } from './useMediaQuery'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    expect(result.current).toBe('initial')

    rerender({ value: 'changed', delay: 500 })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(250)
    })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(250)
    })
    expect(result.current).toBe('changed')
  })

  it('should reset timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    rerender({ value: 'change1', delay: 500 })
    act(() => {
      vi.advanceTimersByTime(250)
    })

    rerender({ value: 'change2', delay: 500 })
    act(() => {
      vi.advanceTimersByTime(250)
    })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(250)
    })
    expect(result.current).toBe('change2')
  })
})

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should throttle value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, interval }) => useThrottle(value, interval),
      { initialProps: { value: 'initial', interval: 500 } }
    )

    expect(result.current).toBe('initial')

    rerender({ value: 'changed', interval: 500 })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(400)
    })
    expect(result.current).toBe('changed')
  })

  it('should not update during throttle interval', () => {
    const { result, rerender } = renderHook(
      ({ value, interval }) => useThrottle(value, interval),
      { initialProps: { value: 'initial', interval: 500 } }
    )

    rerender({ value: 'change1', interval: 500 })
    act(() => {
      vi.advanceTimersByTime(100)
    })

    rerender({ value: 'change2', interval: 500 })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('change2')
  })
})

describe('useControllable', () => {
  it('should use external value when controlled', () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      (props) => useControllable(props),
      { initialProps: { value: 'controlled', defaultValue: 'default', onChange } }
    )

    expect(result.current[0]).toBe('controlled')

    act(() => {
      result.current[1]('new value')
    })
    expect(onChange).toHaveBeenCalledWith('new value')
    expect(result.current[0]).toBe('controlled')

    rerender({ value: 'updated', defaultValue: 'default', onChange })
    expect(result.current[0]).toBe('updated')
  })

  it('should use internal state when uncontrolled', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllable({ defaultValue: 'default', onChange })
    )

    expect(result.current[0]).toBe('default')

    act(() => {
      result.current[1]('new value')
    })
    expect(onChange).toHaveBeenCalledWith('new value')
    expect(result.current[0]).toBe('new value')
  })

  it('should support function updater', () => {
    const { result } = renderHook(() =>
      useControllable({ defaultValue: 5 })
    )

    act(() => {
      result.current[1]((prev) => (prev ?? 0) + 10)
    })
    expect(result.current[0]).toBe(15)
  })

  it('should not call onChange if not provided', () => {
    const { result } = renderHook(() =>
      useControllable({ defaultValue: 'test' })
    )

    expect(() => {
      act(() => {
        result.current[1]('new')
      })
    }).not.toThrow()
  })
})

describe('useMediaQuery', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    matchMediaMock = vi.fn()
    window.matchMedia = matchMediaMock as any
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return initial match state', () => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = []
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: (event: string, listener: (e: MediaQueryListEvent) => void) => {
        listeners.push(listener)
      },
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('should update when media query changes', () => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = []
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: (event: string, listener: (e: MediaQueryListEvent) => void) => {
        listeners.push(listener)
      },
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    act(() => {
      listeners.forEach((listener) =>
        listener({ matches: true } as MediaQueryListEvent)
      )
    })
    expect(result.current).toBe(true)
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListenerMock = vi.fn()
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerMock,
    })

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    unmount()

    expect(removeEventListenerMock).toHaveBeenCalled()
  })

  it('should re-subscribe when query changes', () => {
    const listeners: Map<string, Array<(e: MediaQueryListEvent) => void>> = new Map()
    const removeListenerMock = vi.fn()

    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      addEventListener: (event: string, listener: (e: MediaQueryListEvent) => void) => {
        if (!listeners.has(query)) {
          listeners.set(query, [])
        }
        listeners.get(query)!.push(listener)
      },
      removeEventListener: removeListenerMock,
    }))

    const { rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: '(min-width: 768px)' } }
    )

    expect(matchMediaMock).toHaveBeenCalledWith('(min-width: 768px)')

    rerender({ query: '(min-width: 1024px)' })
    expect(matchMediaMock).toHaveBeenCalledWith('(min-width: 1024px)')
    expect(removeListenerMock).toHaveBeenCalled()
  })
})

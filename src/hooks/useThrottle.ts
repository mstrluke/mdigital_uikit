import { useEffect, useRef, useState } from 'react'

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastUpdated = useRef(Date.now())

  useEffect(() => {
    const now = Date.now()
    if (now - lastUpdated.current >= interval) {
      lastUpdated.current = now
      setThrottledValue(value)
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now()
        setThrottledValue(value)
      }, interval - (now - lastUpdated.current))
      return () => clearTimeout(timer)
    }
  }, [value, interval])

  return throttledValue
}

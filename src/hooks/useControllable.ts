import { useCallback, useEffect, useRef, useState } from 'react'

type SetValue<T> = (next: T | ((prev: T | undefined) => T)) => void

// Overload: when defaultValue is provided, return type is T (not T | undefined)
export function useControllable<T>(opts: {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}): readonly [T, SetValue<T>]

// Overload: when defaultValue may be undefined, return type is T | undefined
export function useControllable<T>(opts: {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}): readonly [T | undefined, SetValue<T>]

export function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)

  const currentValue = isControlled ? value : internalValue

  // Warn if component switches between controlled and uncontrolled
  // Always call hooks (Rules of Hooks), but only log in dev
  const wasControlledRef = useRef(isControlled)
  useEffect(() => {
    if (wasControlledRef.current !== isControlled) {
      // Only warn in dev — Vite/tsup strip this via dead code elimination
      if (import.meta.env?.DEV) {
        console.warn(
          `[useControllable] Component switched from ${wasControlledRef.current ? 'controlled' : 'uncontrolled'} to ${isControlled ? 'controlled' : 'uncontrolled'}. This is likely a bug. Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        )
      }
    }
    wasControlledRef.current = isControlled
  })

  // Refs to avoid stale closures in setValue
  const isControlledRef = useRef(isControlled)
  const valueRef = useRef(value)
  const onChangeRef = useRef(onChange)

  isControlledRef.current = isControlled
  valueRef.current = value
  onChangeRef.current = onChange

  const setValue = useCallback(
    (next: T | ((prev: T | undefined) => T)) => {
      if (isControlledRef.current) {
        // Controlled: resolve the next value using the latest prop value
        const nextValue = typeof next === 'function'
          ? (next as (prev: T | undefined) => T)(valueRef.current)
          : next
        onChangeRef.current?.(nextValue)
      } else {
        // Uncontrolled: use functional setState to get the true latest value
        setInternalValue((prev) => {
          const nextValue = typeof next === 'function'
            ? (next as (prev: T | undefined) => T)(prev)
            : next
          onChangeRef.current?.(nextValue)
          return nextValue
        })
      }
    },
    [], // stable forever — no deps needed thanks to refs
  )

  return [currentValue, setValue] as const
}

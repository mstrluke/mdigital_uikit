import { useState, useCallback, useEffect, useRef } from 'react'

export interface UseMenuNavigationOptions {
  enabledIndices: number[]
  isOpen: boolean
  onClose: () => void
  onSelect: (index: number) => void
  onOpen?: () => void
  loop?: boolean
}

export function useMenuNavigation({
  enabledIndices,
  isOpen,
  onClose,
  onSelect,
  onOpen,
  loop = true,
}: UseMenuNavigationOptions) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const ref = useRef({ enabledIndices, highlightedIndex, onClose, onSelect, onOpen, isOpen })
  ref.current = { enabledIndices, highlightedIndex, onClose, onSelect, onOpen, isOpen }

  useEffect(() => {
    if (!isOpen) setHighlightedIndex(-1)
  }, [isOpen])

  const move = useCallback(
    (direction: 1 | -1) => {
      setHighlightedIndex((prev) => {
        const indices = ref.current.enabledIndices
        if (indices.length === 0) return -1
        const pos = indices.indexOf(prev)
        if (pos === -1) {
          return (direction === 1 ? indices[0] : indices[indices.length - 1]) ?? -1
        }
        const next = pos + direction
        if (next >= 0 && next < indices.length) return indices[next] ?? -1
        return loop ? ((direction === 1 ? indices[0] : indices[indices.length - 1]) ?? -1) : prev
      })
    },
    [loop],
  )

  const highlightFirst = useCallback(() => {
    setHighlightedIndex(ref.current.enabledIndices[0] ?? -1)
  }, [])

  const highlightLast = useCallback(() => {
    const indices = ref.current.enabledIndices
    setHighlightedIndex(indices[indices.length - 1] ?? -1)
  }, [])

  const handleKeyDown = useCallback(
    (e: { key: string; preventDefault: () => void }) => {
      const { onOpen: open, isOpen: currentIsOpen } = ref.current

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (!currentIsOpen && open) { open(); highlightFirst() }
          else move(1)
          break
        case 'ArrowUp':
          e.preventDefault()
          if (!currentIsOpen && open) { open(); highlightLast() }
          else move(-1)
          break
        case 'Home':
          if (currentIsOpen) { e.preventDefault(); highlightFirst() }
          break
        case 'End':
          if (currentIsOpen) { e.preventDefault(); highlightLast() }
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (currentIsOpen && ref.current.highlightedIndex >= 0) {
            ref.current.onSelect(ref.current.highlightedIndex)
          } else if (!currentIsOpen && open) {
            open()
          }
          break
        case 'Escape':
          e.preventDefault()
          ref.current.onClose()
          break
        case 'Tab':
          ref.current.onClose()
          break
      }
    },
    [move, highlightFirst, highlightLast],
  )

  return { highlightedIndex, setHighlightedIndex, handleKeyDown, highlightFirst }
}

import { cva } from 'class-variance-authority'

import type { TransferItem } from './types'

export const transferHeaderVariants = cva(
  'flex items-center justify-between px-4 py-2 border-b border-border bg-surface',
)

export const transferBodyVariants = cva('overflow-y-auto')

export const transferItemVariants = cva(
  'flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors hover:bg-surface',
  {
    variants: {
      selected: {
        true: 'bg-slot-10',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:bg-transparent',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  },
)

export const transferButtonVariants = cva('flex flex-col gap-2')

export const transferActionButtonVariants = cva(
  'flex items-center justify-center p-2 rounded-md border border-border bg-background text-text-secondary hover:bg-slot hover:text-slot-fg hover:border-slot transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-background disabled:hover:text-text-secondary disabled:hover:border-border',
)

export const filterItems = (
  items: TransferItem[],
  searchValue: string,
): TransferItem[] => {
  if (!searchValue) return items

  const lowerSearch = searchValue.toLowerCase()
  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(lowerSearch) ||
      item.description?.toLowerCase().includes(lowerSearch),
  )
}

export const getItemsByKeys = (
  items: TransferItem[],
  keys: string[],
): TransferItem[] => {
  const map = new Map(items.map(item => [item.key, item]))
  return keys.map(key => map.get(key)).filter(Boolean) as TransferItem[]
}

export const getEnabledItems = (items: TransferItem[]): TransferItem[] => {
  return items.filter((item) => !item.disabled)
}

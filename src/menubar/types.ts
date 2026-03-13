import type React from 'react'

export interface MenubarClassNames {
  root?: string
  menu?: string
  trigger?: string
  content?: string
  item?: string
  separator?: string
  label?: string
  shortcut?: string
  submenu?: string
  checkboxItem?: string
  radioItem?: string
}

export interface MenubarItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  shortcut?: string
  disabled?: boolean
  onClick?: () => void
  separator?: boolean
  // Group label
  type?: 'label' | 'checkbox' | 'radio'
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  // Submenu
  children?: MenubarItem[]
}

export interface MenubarMenu {
  key: string
  label: React.ReactNode
  items: MenubarItem[]
  disabled?: boolean
}

export interface MenubarProps {
  menus: MenubarMenu[]
  className?: string
  classNames?: MenubarClassNames
  ref?: React.Ref<HTMLDivElement>
}

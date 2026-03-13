'use client'

import { cva } from 'class-variance-authority'
import { Command as CommandPrimitive } from 'cmdk'
import * as React from 'react'

import { Search as SearchIcon } from 'lucide-react'

import { colorVars } from '../variants'
import { CommandSize, CommandClassNames } from './types'

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '../modal'
import { ComponentColor } from '../types'
import { cn, iconSizes } from '../utils'

const commandVariants = cva(
  'flex h-full w-full flex-col overflow-hidden rounded-md bg-background text-text-primary',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const Command = React.memo(({
  className,
  size = 'md',
  classNames,
  ...props
}: React.ComponentProps<typeof CommandPrimitive> & {
  size?: CommandSize
  classNames?: CommandClassNames
}) => {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn('command_root', commandVariants({ size }), classNames?.root, className)}
      {...props}
    />
  )
})

Command.displayName = 'Command'

const CommandModal = React.memo(({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  size = 'md',
  ...props
}: React.ComponentProps<typeof Modal> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  size?: CommandSize
}) => {
  return (
    <Modal {...props}>
      <ModalHeader className="sr-only">
        <ModalTitle>{title}</ModalTitle>
        <ModalDescription>{description}</ModalDescription>
      </ModalHeader>
      <ModalContent
        className={cn('overflow-hidden p-0', className)}
        showCloseButton={showCloseButton}
      >
        <Command
          size={size}
          className="[&_[cmdk-group-heading]]:text-text-secondary [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0"
        >
          {children}
        </Command>
      </ModalContent>
    </Modal>
  )
})

CommandModal.displayName = 'CommandModal'

const commandInputVariants = cva(
  'flex w-full bg-transparent outline-hidden disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-text-secondary/50 text-text-primary',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const commandInputWrapperVariants = cva(
  'flex items-center gap-2 border-b border-border px-3',
  {
    variants: {
      size: {
        xs: 'h-6',
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const CommandInput = React.memo(({
  className,
  size = 'md',
  classNames,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.Input>, 'size'> & {
  size?: CommandSize
  classNames?: CommandClassNames
}) => {
  return (
    <div
      data-slot="command-input-wrapper"
      className={commandInputWrapperVariants({ size })}
    >
      <SearchIcon
        data-slot="command-input-icon"
        className={cn('command_inputIcon', 'shrink-0 opacity-50 text-text-secondary', iconSizes[size], classNames?.inputIcon)}
      />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn('command_input', commandInputVariants({ size }), classNames?.input, className)}
        {...props}
      />
    </div>
  )
})

CommandInput.displayName = 'CommandInput'

const commandListVariants = cva(
  'scroll-py-1 overflow-x-hidden overflow-y-auto',
  {
    variants: {
      size: {
        xs: 'max-h-[150px]',
        sm: 'max-h-[200px]',
        md: 'max-h-[300px]',
        lg: 'max-h-[400px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const CommandList = React.memo(({
  className,
  size = 'md',
  classNames,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List> & {
  size?: CommandSize
  classNames?: CommandClassNames
}) => {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn('command_list', commandListVariants({ size }), classNames?.list, className)}
      {...props}
    />
  )
})

CommandList.displayName = 'CommandList'

const commandEmptyVariants = cva('text-center text-text-secondary', {
  variants: {
    size: {
      xs: 'py-3 text-[10px]',
      sm: 'py-4 text-xs',
      md: 'py-6 text-sm',
      lg: 'py-8 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const CommandEmpty = React.memo(({
  size = 'md',
  classNames,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty> & {
  size?: CommandSize
  classNames?: CommandClassNames
}) => {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn('command_empty', commandEmptyVariants({ size }), classNames?.empty)}
      {...props}
    />
  )
})

CommandEmpty.displayName = 'CommandEmpty'

const commandGroupVariants = cva(
  'overflow-hidden text-text-primary [&_[cmdk-group-heading]]:text-text-secondary [&_[cmdk-group-heading]]:font-medium',
  {
    variants: {
      size: {
        xs: 'p-0.5 [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-0.5 [&_[cmdk-group-heading]]:text-[9px]',
        sm: 'p-0.5 [&_[cmdk-group-heading]]:px-1.5 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-[10px]',
        md: 'p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs',
        lg: 'p-1.5 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const CommandGroup = React.memo(({
  className,
  size = 'md',
  classNames,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group> & {
  size?: CommandSize
  classNames?: CommandClassNames
}) => {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn('command_group', commandGroupVariants({ size }), classNames?.group, className)}
      {...props}
    />
  )
})

CommandGroup.displayName = 'CommandGroup'

const commandSeparatorVariants = cva('bg-border h-px', {
  variants: {
    size: {
      xs: '-mx-0',
      sm: '-mx-0.5',
      md: '-mx-1',
      lg: '-mx-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const CommandSeparator = React.memo(({
  className,
  size = 'md',
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator> & {
  size?: CommandSize
}) => {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(commandSeparatorVariants({ size }), className)}
      {...props}
    />
  )
})

CommandSeparator.displayName = 'CommandSeparator'

const commandItemVariants = cva(
  "relative flex cursor-default items-center gap-2 rounded-sm outline-hidden select-none text-text-primary data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-text-secondary transition-colors",
  {
    variants: {
      size: {
        xs: "px-1 py-0.5 text-[10px] gap-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "px-1.5 py-1 text-xs gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "px-2 py-1.5 text-sm gap-2 [&_svg:not([class*='size-'])]:size-4",
        lg: "px-3 py-2 text-base gap-2.5 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const CommandItem = React.memo(({
  className,
  size = 'md',
  color = 'primary',
  classNames,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & {
  size?: CommandSize
  color?: ComponentColor
  classNames?: CommandClassNames
}) => {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn('command_item', commandItemVariants({ size }), colorVars[color], 'data-[selected=true]:bg-slot-10 data-[selected=true]:text-slot', classNames?.item, className)}
      {...props}
    />
  )
})

CommandItem.displayName = 'CommandItem'

const commandShortcutVariants = cva(
  'ml-auto tracking-widest text-text-secondary opacity-60',
  {
    variants: {
      size: {
        xs: 'text-[9px]',
        sm: 'text-[10px]',
        md: 'text-xs',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const CommandShortcut = React.memo(({
  className,
  size = 'md',
  classNames,
  ...props
}: React.ComponentProps<'span'> & {
  size?: CommandSize
  classNames?: CommandClassNames
}) => {
  return (
    <span
      data-slot="command-shortcut"
      className={cn('command_shortcut', commandShortcutVariants({ size }), classNames?.shortcut, className)}
      {...props}
    />
  )
})

CommandShortcut.displayName = 'CommandShortcut'

export type * from './types'
export {
  Command,
  CommandModal,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

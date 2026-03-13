'use client'

import React from 'react'

import { Spinner } from '../spinner'
import { SpinnerProps } from '../spinner/types'
import { cn } from '../utils'

export interface FetchingOverlayProps extends SpinnerProps {
  isFetching: boolean
  fullscreen?: boolean
  backdropOpacity?: number
}

const FetchingOverlay = React.memo<FetchingOverlayProps>(({
  isFetching,
  size = 'lg',
  fullscreen = true,
  backdropOpacity = 30,
  className,
  ...rest
}) => {
  return (
    <div
      data-slot="root"
      className={cn(
        'fetchingOverlay_root',
        'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
        fullscreen && 'fixed w-full h-screen z-[var(--z-overlay)]',
        isFetching ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className,
      )}
      style={isFetching ? { backgroundColor: `rgba(0, 0, 0, ${backdropOpacity / 100})` } : undefined}
      role="status"
      aria-busy={isFetching}
      aria-label={isFetching ? "Loading content" : undefined}
    >
      {isFetching && (
        <Spinner
          size={size}
          {...rest}
        />
      )}
    </div>
  )
})

FetchingOverlay.displayName = 'FetchingOverlay'

export default FetchingOverlay

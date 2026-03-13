'use client'

import { CircleCheck, CircleX, Info, SearchX, TriangleAlert } from 'lucide-react'
import React from 'react'

import { cn } from '../utils'
import type { ResultProps, ResultStatus } from './types'

const statusConfig: Record<ResultStatus, { color: string; defaultTitle: string }> = {
  success: { color: 'text-success', defaultTitle: 'Successfully Done' },
  error: { color: 'text-error', defaultTitle: 'Something Went Wrong' },
  info: { color: 'text-info', defaultTitle: 'Information' },
  warning: { color: 'text-warning', defaultTitle: 'Warning' },
  '403': { color: 'text-warning', defaultTitle: '403 — Access Denied' },
  '404': { color: 'text-info', defaultTitle: '404 — Page Not Found' },
  '500': { color: 'text-error', defaultTitle: '500 — Server Error' },
}

const sizeMap = {
  xs: { icon: 'w-10 h-10', title: 'text-base font-semibold', subtitle: 'text-xs', padding: 'py-6 px-4', maxW: 'max-w-xs' },
  sm: { icon: 'w-12 h-12', title: 'text-lg font-semibold', subtitle: 'text-sm', padding: 'py-8 px-4', maxW: 'max-w-sm' },
  md: { icon: 'w-16 h-16', title: 'text-xl font-semibold', subtitle: 'text-sm', padding: 'py-12 px-6', maxW: 'max-w-md' },
  lg: { icon: 'w-20 h-20', title: 'text-2xl font-bold', subtitle: 'text-base', padding: 'py-16 px-8', maxW: 'max-w-lg' },
}

const statusIcons: Record<ResultStatus, React.ElementType> = {
  success: CircleCheck,
  error: CircleX,
  info: Info,
  warning: TriangleAlert,
  '403': TriangleAlert,
  '404': SearchX,
  '500': CircleX,
}

function StatusIcon({ status, sizeClass }: { status: ResultStatus; sizeClass: string }) {
  const Icon = statusIcons[status]
  return <Icon className={cn(sizeClass, statusConfig[status].color)} strokeWidth={1.5} />
}

const Result = React.memo<ResultProps>(
  ({
    status = 'info',
    icon,
    title,
    subtitle,
    extra,
    children,
    size = 'md',
    className,
    classNames,
  }) => {
    const config = statusConfig[status]
    const s = sizeMap[size]

    return (
      <div
        data-slot="root"
        className={cn(
          'result_root',
          'flex flex-col items-center text-center',
          s.padding,
          classNames?.root,
          className,
        )}
      >
        <div data-slot="icon" className={cn('result_icon', 'mb-6', classNames?.icon)}>
          {icon ?? <StatusIcon status={status} sizeClass={s.icon} />}
        </div>

        <h3 data-slot="title" className={cn('result_title', s.title, 'text-text-primary mb-2', classNames?.title)}>
          {title ?? config.defaultTitle}
        </h3>

        {subtitle && (
          <p data-slot="subtitle" className={cn('result_subtitle', s.subtitle, 'text-text-secondary', s.maxW, 'mb-6', classNames?.subtitle)}>
            {subtitle}
          </p>
        )}

        {extra && (
          <div data-slot="extra" className={cn('result_extra', 'flex items-center gap-3 mb-6', classNames?.extra)}>
            {extra}
          </div>
        )}

        {children && (
          <div data-slot="content" className={cn('result_content', 'w-full', s.maxW, classNames?.content)}>
            {children}
          </div>
        )}
      </div>
    )
  },
)

Result.displayName = 'Result'

export type * from './types'
export default Result

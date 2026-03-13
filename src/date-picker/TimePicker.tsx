'use client'

import React from 'react'
import { Clock, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { cn, getValidationStatus, iconSizes } from '../utils'
import { colorVars } from '../variants'
import type { ComponentColor } from '../types'
import type { TimePickerProps } from './types'
import { pickerInputVariants } from './utils'
import { pickerSelectedClasses, pickerIconLeft, pickerIconRight, pickerPaddingLeft, pickerPaddingRight } from './shared'
import { PickerWrapper } from './PickerWrapper'

interface TimeColumnProps<T extends string | number> {
  items: T[]
  selected: T
  onSelect: (item: T) => void
  onHover?: (item: T) => void
  onLeave?: () => void
}

const TimeColumn = React.memo(({ items, selected, onSelect, onHover, onLeave }: TimeColumnProps<string | number>) => (
  <div
    className="flex flex-col h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-background"
    onMouseLeave={onLeave}
  >
    {items.map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => onSelect(item)}
        onMouseEnter={() => onHover?.(item)}
        className={cn(
          'px-4 py-2 text-sm font-medium transition-colors text-center min-h-[40px] flex items-center justify-center',
          item === selected
            ? 'bg-surface text-text-primary font-semibold'
            : 'text-text-secondary hover:bg-surface/50',
        )}
      >
        {typeof item === 'number' ? String(item).padStart(2, '0') : item}
      </button>
    ))}
  </div>
))

TimeColumn.displayName = 'TimeColumn'

interface TimeColumnPickerProps {
  value: Date | null
  onChange: (date: Date) => void
  onPreview?: (preview: string) => void
  timeFormat?: string
  color?: ComponentColor
}

const TimeColumnPicker = ({
  value,
  onChange,
  onPreview,
  timeFormat = 'h:mm aa',
  color = 'primary',
}: TimeColumnPickerProps) => {
  const is12Hour = timeFormat.includes('aa')
  const currentDate = value || new Date()
  const currentHour = currentDate.getHours()
  const currentMinute = currentDate.getMinutes()

  const [selectedHour, setSelectedHour] = React.useState(
    is12Hour ? currentHour % 12 || 12 : currentHour,
  )
  const [selectedMinute, setSelectedMinute] = React.useState(currentMinute)
  const [selectedPeriod, setSelectedPeriod] = React.useState(
    currentHour >= 12 ? 'PM' : 'AM',
  )
  const [hoverHour, setHoverHour] = React.useState<number | null>(null)
  const [hoverMinute, setHoverMinute] = React.useState<number | null>(null)
  const [hoverPeriod, setHoverPeriod] = React.useState<string | null>(null)

  const hours = is12Hour
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const periods = ['AM', 'PM']

  React.useEffect(() => {
    if (hoverHour !== null || hoverMinute !== null || hoverPeriod !== null) {
      const previewHour = hoverHour ?? selectedHour
      const previewMinute = hoverMinute ?? selectedMinute
      const previewPeriod = hoverPeriod ?? selectedPeriod

      const formattedHour = String(previewHour).padStart(2, '0')
      const formattedMinute = String(previewMinute).padStart(2, '0')
      const previewString = is12Hour
        ? `${previewHour}:${formattedMinute} ${previewPeriod}`
        : `${formattedHour}:${formattedMinute}`

      onPreview?.(previewString)
    } else {
      onPreview?.('')
    }
  }, [hoverHour, hoverMinute, hoverPeriod, selectedHour, selectedMinute, selectedPeriod, is12Hour, onPreview])

  const handleOkClick = () => {
    const newDate = new Date(currentDate)
    let finalHour = selectedHour

    if (is12Hour) {
      if (selectedPeriod === 'PM' && selectedHour !== 12) finalHour = selectedHour + 12
      else if (selectedPeriod === 'AM' && selectedHour === 12) finalHour = 0
    }

    newDate.setHours(finalHour)
    newDate.setMinutes(selectedMinute)
    newDate.setSeconds(0)
    onPreview?.('')
    onChange(newDate)
  }

  const handleNowClick = () => {
    const now = new Date()
    const nowHour = now.getHours()

    setSelectedHour(is12Hour ? nowHour % 12 || 12 : nowHour)
    setSelectedMinute(now.getMinutes())
    setSelectedPeriod(nowHour >= 12 ? 'PM' : 'AM')

    onPreview?.('')
    onChange(now)
  }

  return (
    <div className={cn("flex flex-col bg-background", colorVars[color])}>
      <div className="flex gap-0">
        <TimeColumn items={hours} selected={selectedHour} onSelect={(item) => setSelectedHour(item as number)} onHover={(item) => setHoverHour(item as number)} onLeave={() => setHoverHour(null)} />
        <TimeColumn items={minutes} selected={selectedMinute} onSelect={(item) => setSelectedMinute(item as number)} onHover={(item) => setHoverMinute(item as number)} onLeave={() => setHoverMinute(null)} />
        {is12Hour && <TimeColumn items={periods} selected={selectedPeriod} onSelect={(item) => setSelectedPeriod(item as string)} onHover={(item) => setHoverPeriod(item as string)} onLeave={() => setHoverPeriod(null)} />}
      </div>
      <div className="p-3 border-t border-border flex gap-2">
        <button type="button" onClick={handleNowClick} className="flex-1 px-4 py-2 bg-surface text-text-primary rounded-md hover:bg-surface/80 transition-colors font-medium text-sm border border-border">Now</button>
        <button type="button" onClick={handleOkClick} className={cn('flex-1 px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium text-sm', pickerSelectedClasses)}>OK</button>
      </div>
    </div>
  )
}

export const TimePickerComponent = React.memo<TimePickerProps>(
  ({
    variant = 'outline',
    size = 'md',
    color = 'primary',
    label,
    error,
    warning,
    info,
    success,
    helperText,
    messagePosition = 'bottom',
    placeholder = 'Select time...',
    disabled = false,
    required = false,
    clearable = false,
    fullWidth = true,
    className,
    classNames,
    ref,
    value,
    defaultValue,
    onChange,
    timeFormat = 'h:mm aa',
  }) => {
    const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue || null)
    const currentValue = value !== undefined ? value : internalValue
    const [isOpen, setIsOpen] = React.useState(false)
    const [previewTime, setPreviewTime] = React.useState('')

    const { status } = getValidationStatus({ error, warning, info, success, helperText })

    const handleTimeChange = (date: Date | null) => {
      if (value === undefined) setInternalValue(date)
      onChange?.(date)
      setPreviewTime('')
      setIsOpen(false)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (value === undefined) setInternalValue(null)
      onChange?.(null)
    }

    const showClear = clearable && currentValue && !disabled

    const formatTime = (date: Date) =>
      new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: timeFormat.includes('aa'),
      })

    const getDisplayValue = () => {
      if (previewTime) return { confirmed: '', preview: previewTime }
      if (currentValue) return { confirmed: formatTime(currentValue), preview: '' }
      return { confirmed: '', preview: '' }
    }

    const { confirmed, preview } = getDisplayValue()

    return (
      <PickerWrapper label={label} error={error} warning={warning} info={info} success={success} helperText={helperText} messagePosition={messagePosition} required={required} fullWidth={fullWidth} classNames={classNames}>
        <div ref={ref} className={cn('datePicker_root', 'relative w-full', classNames?.root)} data-slot="root">
          <div className={cn('absolute flex items-center h-full top-0 text-text-secondary pointer-events-none z-10', pickerIconLeft[size], classNames?.icon)} data-slot="icon">
            <Clock className={iconSizes[size]} />
          </div>

          <Popover open={isOpen} onOpenChange={(open: boolean) => { setIsOpen(open); if (!open) setPreviewTime('') }}>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                className={cn('datePicker_trigger', pickerInputVariants({ variant, status, size, fullWidth }), colorVars[color], 'focus-visible:ring-slot', 'flex items-center justify-start cursor-pointer', pickerPaddingLeft[size], showClear && pickerPaddingRight[size], className, classNames?.trigger)}
                data-slot="trigger"
              >
                {confirmed || preview ? (
                  <>
                    {confirmed && <span>{confirmed}</span>}
                    {preview && <span className="text-text-secondary">{preview}</span>}
                  </>
                ) : (
                  <span className="text-text-secondary">{placeholder}</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="start" sideOffset={4} onOpenAutoFocus={(e: Event) => e.preventDefault()}>
              <TimeColumnPicker value={currentValue} onChange={handleTimeChange} onPreview={setPreviewTime} timeFormat={timeFormat} color={color} />
            </PopoverContent>
          </Popover>

          {showClear && (
            <button type="button" onClick={handleClear} className={cn('absolute flex items-center h-full top-0 text-text-secondary hover:text-text-primary z-10', pickerIconRight[size], classNames?.clear)} aria-label="Clear time" data-slot="clear">
              <X className={iconSizes[size]} />
            </button>
          )}
        </div>
      </PickerWrapper>
    )
  },
)

TimePickerComponent.displayName = 'TimePicker'

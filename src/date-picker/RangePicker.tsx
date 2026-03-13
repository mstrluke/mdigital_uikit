'use client'

import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Calendar, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { cn, getValidationStatus, iconSizes } from '../utils'
import { colorVars } from '../variants'
import type { RangePickerProps } from './types'
import { getDatePickerStyles, pickerInputVariants } from './utils'
import { pickerIconLeft, pickerIconRight, pickerPaddingLeft, pickerPaddingRight } from './shared'
import { CalendarHeader, type CalendarHeaderProps } from './CalendarHeader'
import { YearSelector } from './YearSelector'
import { MonthSelector } from './MonthSelector'
import { PickerWrapper } from './PickerWrapper'

export const RangePickerComponent = React.memo<RangePickerProps>(
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
    placeholder = 'Select date range...',
    disabled = false,
    required = false,
    clearable = false,
    fullWidth = true,
    className,
    classNames,
    ref,
    startDate,
    endDate,
    defaultStartDate,
    defaultEndDate,
    onChange,
    minDate,
    maxDate,
    dateFormat = 'MM/dd/yyyy',
  }) => {
    const [internalStartDate, setInternalStartDate] = React.useState<Date | null>(defaultStartDate || null)
    const [internalEndDate, setInternalEndDate] = React.useState<Date | null>(defaultEndDate || null)
    const currentStartDate = startDate !== undefined ? startDate : internalStartDate
    const currentEndDate = endDate !== undefined ? endDate : internalEndDate

    const [isOpen, setIsOpen] = React.useState(false)
    const [showMonthSelector, setShowMonthSelector] = React.useState(false)
    const [showYearSelector, setShowYearSelector] = React.useState(false)
    const [viewDate, setViewDate] = React.useState(currentStartDate || new Date())
    const [hoverDate, setHoverDate] = React.useState<Date | null>(null)

    const { status } = getValidationStatus({ error, warning, info, success, helperText })

    React.useEffect(() => {
      if (startDate) setViewDate(startDate)
    }, [startDate])

    const handleChange = (dates: [Date | null, Date | null]) => {
      if (startDate === undefined && endDate === undefined) {
        setInternalStartDate(dates[0])
        setInternalEndDate(dates[1])
      }
      onChange?.(dates)
      setHoverDate(null)
      if (dates[0] && dates[1]) {
        setIsOpen(false)
        setShowMonthSelector(false)
        setShowYearSelector(false)
      }
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (startDate === undefined && endDate === undefined) {
        setInternalStartDate(null)
        setInternalEndDate(null)
      }
      onChange?.([null, null])
    }

    const handleMonthSelect = (month: number) => {
      const newDate = new Date(viewDate)
      newDate.setMonth(month)
      setViewDate(newDate)
      setShowMonthSelector(false)
    }

    const handleYearSelect = (year: number) => {
      const newDate = new Date(viewDate)
      newDate.setFullYear(year)
      setViewDate(newDate)
      setShowYearSelector(false)
      setShowMonthSelector(true)
    }

    const handleYearChange = (year: number) => {
      const newDate = new Date(viewDate)
      newDate.setFullYear(year)
      setViewDate(newDate)
    }

    const handleDecadeChange = (year: number) => {
      const newDate = new Date(viewDate)
      newDate.setFullYear(year)
      setViewDate(newDate)
    }

    const showClear = clearable && (currentStartDate || currentEndDate) && !disabled

    const formatDate = React.useCallback(
      (date: Date) => {
        const d = new Date(date)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return dateFormat.replace('yyyy', String(year)).replace('MM', month).replace('dd', day)
      },
      [dateFormat],
    )

    const getDisplayValue = () => {
      if (hoverDate && currentStartDate && !currentEndDate) {
        return { confirmed: `${formatDate(currentStartDate)} - `, preview: formatDate(hoverDate) }
      }
      if (hoverDate && !currentStartDate && !currentEndDate) {
        return { confirmed: '', preview: formatDate(hoverDate) }
      }
      if (!currentStartDate && !currentEndDate) return { confirmed: '', preview: '' }
      const start = currentStartDate ? formatDate(currentStartDate) : ''
      const end = currentEndDate ? formatDate(currentEndDate) : ''
      if (start && end) return { confirmed: `${start} - ${end}`, preview: '' }
      if (start) return { confirmed: `${start}`, preview: ' - ...' }
      return { confirmed: '', preview: '' }
    }

    const { confirmed, preview } = getDisplayValue()

    const customHeader = (props: Omit<CalendarHeaderProps, 'showMonthSelector' | 'onMonthClick' | 'onYearClick' | 'headerClassName' | 'navigationClassName'>) => (
      <CalendarHeader
        {...props}
        showMonthSelector={showMonthSelector}
        onMonthClick={() => setShowMonthSelector(!showMonthSelector)}
        onYearClick={() => setShowYearSelector(true)}
        headerClassName={classNames?.header}
        navigationClassName={classNames?.navigation}
      />
    )

    return (
      <PickerWrapper label={label} error={error} warning={warning} info={info} success={success} helperText={helperText} messagePosition={messagePosition} required={required} fullWidth={fullWidth} classNames={classNames}>
        <div ref={ref} className={cn('datePicker_root', 'relative w-full', classNames?.root)} data-slot="root">
          <div className={cn('absolute flex items-center h-full top-0 text-text-secondary pointer-events-none z-10', pickerIconLeft[size], classNames?.icon)} data-slot="icon">
            <Calendar className={iconSizes[size]} />
          </div>

          <Popover open={isOpen} onOpenChange={(open: boolean) => { setIsOpen(open); if (!open) { setShowMonthSelector(false); setShowYearSelector(false); setHoverDate(null) } }}>
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
              {showYearSelector ? (
                <YearSelector date={viewDate} onYearSelect={handleYearSelect} onDecadeChange={handleDecadeChange} color={color} />
              ) : showMonthSelector ? (
                <MonthSelector date={viewDate} onMonthSelect={handleMonthSelect} onYearClick={() => setShowYearSelector(true)} onYearChange={handleYearChange} color={color} />
              ) : (
                <div className={cn('datePicker_calendar', colorVars[color], getDatePickerStyles(color, classNames), classNames?.calendar)} data-slot="calendar">
                  <ReactDatePicker
                    selectsRange
                    startDate={currentStartDate}
                    endDate={currentEndDate}
                    onChange={handleChange}
                    disabled={disabled}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat={dateFormat}
                    renderCustomHeader={customHeader}
                    openToDate={viewDate}
                    onMonthChange={setViewDate}
                    monthsShown={2}
                    onDayMouseEnter={setHoverDate}
                    inline
                  />
                </div>
              )}
            </PopoverContent>
          </Popover>

          {showClear && (
            <button type="button" onClick={handleClear} className={cn('absolute flex items-center h-full top-0 text-text-secondary hover:text-text-primary z-10', pickerIconRight[size], classNames?.clear)} aria-label="Clear date range" data-slot="clear">
              <X className={iconSizes[size]} />
            </button>
          )}
        </div>
      </PickerWrapper>
    )
  },
)

RangePickerComponent.displayName = 'RangePicker'

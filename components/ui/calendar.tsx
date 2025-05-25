'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { format } from 'date-fns'; // For formatting dates in the list view

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  onViewChange?: (view: string) => void; // Optional callback for view changes
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onViewChange,
  ...props
}: CalendarProps) {
  // State to manage the current view
  const [view, setView] = React.useState<'month' | 'week' | 'day' | 'list'>('month');
  // State to store selected dates (for list view)
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);

  // Handle view change when a filter button is clicked
  const handleViewChange = (newView: 'month' | 'week' | 'day' | 'list') => {
    setView(newView);
    if (onViewChange) {
      onViewChange(newView);
    }
  };

  // Handle date selection
  const handleDayClick = (day: Date) => {
    setSelectedDates((prev) => {
      const isSelected = prev.some((d) => d.getTime() === day.getTime());
      if (isSelected) {
        return prev.filter((d) => d.getTime() !== day.getTime());
      } else {
        return [...prev, day];
      }
    });
  };

  // Render the list view
  const renderListView = () => (
    <div className="p-3">
      <h3 className="text-lg font-medium mb-2">Selected Dates</h3>
      {selectedDates.length === 0 ? (
        <p className="text-muted-foreground">No dates selected.</p>
      ) : (
        <ul className="space-y-2">
          {selectedDates
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-accent rounded-md"
              >
                <span>{format(date, 'PPP')}</span>
                <button
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-7 w-7 p-0 text-muted-foreground'
                  )}
                  onClick={() => handleDayClick(date)}
                >
                  Remove
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );

  // Configuration for DayPicker based on view
  const dayPickerProps = {
    month: {
      mode: 'default' as const,
      numberOfMonths: 1,
    },
    week: {
      mode: 'default' as const,
      numberOfMonths: 1,
      // Note: react-day-picker doesn't have a built-in week view, so we simulate it
      // by restricting the visible dates (custom logic may be needed)
    },
    day: {
      mode: 'single' as const,
      numberOfMonths: 1,
    },
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Filter Buttons */}
      <div className="flex justify-center space-x-2 p-3">
        {['month', 'week', 'day', 'list'].map((viewOption) => (
          <button
            key={viewOption}
            className={cn(
              buttonVariants({ variant: view === viewOption ? 'default' : 'outline' }),
              'capitalize'
            )}
            onClick={() => handleViewChange(viewOption as typeof view)}
          >
            {viewOption}
          </button>
        ))}
      </div>

      {/* Calendar or List View */}
      {view === 'list' ? (
        renderListView()
      ) : (
        <DayPicker
          showOutsideDays={showOutsideDays}
          className={cn('p-3', className)}
          classNames={{
            months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center',
            caption_label: 'text-sm font-medium',
            nav: 'space-x-1 flex items-center',
            nav_button: cn(
              buttonVariants({ variant: 'outline' }),
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
            ),
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell:
              'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
            row: 'flex w-full mt-2',
            cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
            day: cn(
              buttonVariants({ variant: 'ghost' }),
              'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
            ),
            day_range_end: 'day-range-end',
            day_selected:
              'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
            day_today: 'bg-accent text-accent-foreground',
            day_outside:
              'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
            day_disabled: 'text-muted-foreground opacity-50',
            day_range_middle:
              'aria-selected:bg-accent aria-selected:text-accent-foreground',
            day_hidden: 'invisible',
            ...classNames,
          }}
          components={{
            IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
            IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
          }}
          onDayClick={handleDayClick}
          selected={selectedDates}
          {...dayPickerProps[view]}
          {...props}
        />
      )}
    </div>
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
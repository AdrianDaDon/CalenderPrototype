"use client"

import { format, addHours, startOfDay, isBefore, isAfter } from "date-fns"
import { cn } from "../lib/utils"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  startTime: Date
  endTime: Date
  type: string
}

interface HourlyTimelineProps {
  events: Event[]
}

export function HourlyTimeline({ events }: HourlyTimelineProps) {
  const now = new Date()
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = addHours(startOfDay(now), i)
    return {
      hour,
      label: format(hour, "h a"),
      isPast: isBefore(hour, now),
      isCurrent: isBefore(hour, now) && isAfter(addHours(hour, 1), now),
    }
  })

  // Function to check if an event occurs during a specific hour
  const getEventsForHour = (hour: Date) => {
    const hourEnd = addHours(hour, 1)
    return events.filter(
      (event) =>
        (isAfter(event.startTime, hour) && isBefore(event.startTime, hourEnd)) ||
        (isBefore(event.startTime, hour) && isAfter(event.endTime, hour)),
    )
  }

  return (
    <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
      {hours.map(({ hour, label, isPast, isCurrent }) => {
        const hourEvents = getEventsForHour(hour)

        return (
          <div
            key={label}
            className={cn(
              "flex items-start p-2 rounded-md",
              isPast && !isCurrent && "opacity-60",
              isCurrent && "bg-muted",
            )}
          >
            <div className="w-16 text-sm font-medium">{label}</div>
            <div className="flex-1 space-y-1">
              {hourEvents.length > 0 ? (
                hourEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs p-1.5 rounded",
                      event.type === "work" && "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
                      event.type === "personal" &&
                        "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
                      event.type === "health" && "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
                    )}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-80">
                      {format(event.startTime, "h:mm")} - {format(event.endTime, "h:mm a")}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-4" />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}


"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"
import { format, addDays, startOfToday, isSameDay, addHours, isAfter, isBefore } from "date-fns"

import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { HourlyTimeline } from "./hourlyTimeline"
import { EventDialog } from "./eventDialog"

// Sample events data - in a real app, this would come from a database
const SAMPLE_EVENTS = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly team sync",
    date: addDays(startOfToday(), 0),
    startTime: addHours(startOfToday(), 10),
    endTime: addHours(startOfToday(), 11),
    type: "work",
  },
  {
    id: "2",
    title: "Lunch with Sarah",
    description: "Discuss project collaboration",
    date: addDays(startOfToday(), 0),
    startTime: addHours(startOfToday(), 12),
    endTime: addHours(startOfToday(), 13),
    type: "personal",
  },
  {
    id: "3",
    title: "Client Call",
    description: "Quarterly review",
    date: addDays(startOfToday(), 0),
    startTime: addHours(startOfToday(), 14),
    endTime: addHours(startOfToday(), 15),
    type: "work",
  },
  {
    id: "4",
    title: "Dentist Appointment",
    description: "Regular checkup",
    date: addDays(startOfToday(), 1),
    startTime: addHours(addDays(startOfToday(), 1), 9),
    endTime: addHours(addDays(startOfToday(), 1), 10),
    type: "health",
  },
  {
    id: "5",
    title: "Project Deadline",
    description: "Submit final deliverables",
    date: addDays(startOfToday(), 2),
    startTime: addHours(addDays(startOfToday(), 2), 17),
    endTime: addHours(addDays(startOfToday(), 2), 18),
    type: "work",
  },
]

export function CalendarDashboard() {
  const [date, setDate] = useState<Date>(new Date())
  const [events, setEvents] = useState(SAMPLE_EVENTS)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)

  // Filter events for the selected date
  const eventsForSelectedDate = events.filter((event) => isSameDay(event.date, date))

  // Get upcoming events (events in the next 24 hours)
  const now = new Date()
  const upcomingEvents = events
    .filter((event) => isAfter(event.startTime, now) && isBefore(event.startTime, addHours(now, 24)))
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

  // Function to handle adding a new event
  const handleAddEvent = (newEvent: any) => {
    setEvents([...events, { id: String(events.length + 1), ...newEvent }])
    setIsEventDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <CardTitle className="">Calendar</CardTitle>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{format(date, "PPP")}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                      className=""
                      classNames={{}}
                    />
                  </PopoverContent>
                </Popover>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setDate(addDays(date, -1))}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous day</span>
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setDate(addDays(date, 1))}>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next day</span>
                </Button>
              </div>
            </div>
            <CardDescription className="">Manage your schedule and upcoming events</CardDescription>
          </CardHeader>
          <CardContent className="">
            <Tabs defaultValue="day" className="">
              <TabsList className="mb-4">
                <TabsTrigger value="day" className="">Day</TabsTrigger>
                <TabsTrigger value="week" className={""}>Week</TabsTrigger>
                <TabsTrigger value="month" className={""}>Month</TabsTrigger>
              </TabsList>
              <TabsContent value="day" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{format(date, "EEEE, MMMM d")}</h3>
                  <Button size="sm" variant="default" className="" onClick={() => setIsEventDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Event
                  </Button>
                </div>

                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-2">
                    {eventsForSelectedDate.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "p-3 rounded-lg border",
                          event.type === "work" &&
                            "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50",
                          event.type === "personal" &&
                            "border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/50",
                          event.type === "health" &&
                            "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/50",
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                          <Badge variant="outline" className="">
                            {format(event.startTime, "h:mm a")} - {format(event.endTime, "h:mm a")}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">No events scheduled</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click the "Add Event" button to create a new event.
                    </p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="week" className={""}>
                <div className="text-center py-12 text-muted-foreground">Week view would be implemented here</div>
              </TabsContent>
              <TabsContent value="month" className={""}>
                <div className="text-center py-12 text-muted-foreground">Month view would be implemented here</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 md:w-80">
          <Card className="">
            <CardHeader className="">
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Upcoming Reminders
              </CardTitle>
              <CardDescription className="">Events in the next 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-2">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "p-3 rounded-lg border",
                        event.type === "work" && "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50",
                        event.type === "personal" &&
                          "border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/50",
                        event.type === "health" &&
                          "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/50",
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {format(event.startTime, "h:mm a")}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{format(event.date, "EEE, MMM d")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">No upcoming events in the next 24 hours</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="">
              <CardTitle className="">Today's Timeline</CardTitle>
              <CardDescription className={""}>Hourly breakdown of your day</CardDescription>
            </CardHeader>
            <CardContent className={""}>
              <HourlyTimeline events={eventsForSelectedDate} />
            </CardContent>
          </Card>
        </div>
      </div>

      <EventDialog
        open={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        onAddEvent={handleAddEvent}
        selectedDate={date}
      />
    </div>
  )
}


"use client";

import type React from "react";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { FormLabel } from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { cn } from "../lib/utils";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEvent: (event: any) => void;
  selectedDate: Date;
}

export function EventDialog({
  open,
  onOpenChange,
  onAddEvent,
  selectedDate,
}: EventDialogProps) {
  const [date, setDate] = useState<Date>(selectedDate);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("work");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse times to create Date objects
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startDateTime = new Date(date);
    startDateTime.setHours(startHour, startMinute, 0);

    const endDateTime = new Date(date);
    endDateTime.setHours(endHour, endMinute, 0);

    onAddEvent({
      title,
      description,
      date,
      startTime: startDateTime,
      endTime: endDateTime,
      type,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setStartTime("09:00");
    setEndTime("10:00");
    setType("work");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className={""}>
          <DialogTitle className={""}>Add New Event</DialogTitle>
          <DialogDescription className={""}>
            Create a new event in your calendar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <FormLabel className={""} htmlFor="title">
                Event Title
              </FormLabel>
              <Input
                className=""
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>
            <div className="grid gap-2">
              <FormLabel className={""} htmlFor="description">
                Description
              </FormLabel>
              <Textarea
                className={""}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
              />
            </div>
            <div className="grid gap-2">
              <FormLabel className={""}>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="default"
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormLabel htmlFor="startTime" className={""}>
                  Start Time
                </FormLabel>
                <Input
                  className=""
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <FormLabel htmlFor="endTime" className={""}>
                  End Time
                </FormLabel>
                <Input
                  className=""
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <FormLabel htmlFor="type" className={""}>Event Type</FormLabel>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className={""}>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent className={""}>
                  <SelectItem value="work" className={""}>Work</SelectItem>
                  <SelectItem value="personal" className={""}>Personal</SelectItem>
                  <SelectItem value="health" className={""}>Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className={""}>
            <Button type="submit" className="" variant="default" size="default">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

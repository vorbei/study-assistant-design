import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  const hours = date ? date.getHours() : 0
  const minutes = date ? date.getMinutes() : 0

  const setHours = (hours: number) => {
    if (!date) {
      const newDate = new Date()
      newDate.setHours(hours)
      setDate(newDate)
      return
    }
    const newDate = new Date(date)
    newDate.setHours(hours)
    setDate(newDate)
  }

  const setMinutes = (minutes: number) => {
    if (!date) {
      const newDate = new Date()
      newDate.setMinutes(minutes)
      setDate(newDate)
      return
    }
    const newDate = new Date(date)
    newDate.setMinutes(minutes)
    setDate(newDate)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-neutral-3"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {date ? (
            `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}`
          ) : (
            <span>选择时间</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex items-end gap-2">
          <div>
            <Label htmlFor="hours" className="text-xs text-neutral-2">
              小时
            </Label>
            <Input
              id="hours"
              ref={hourRef}
              className="w-[64px]"
              value={hours.toString().padStart(2, "0")}
              onChange={(e) => {
                const value = parseInt(e.target.value)
                if (isNaN(value) || value < 0 || value > 23) return
                setHours(value)
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault()
                  setHours(hours + 1 > 23 ? 0 : hours + 1)
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  setHours(hours - 1 < 0 ? 23 : hours - 1)
                }
                if (e.key === "Enter" || e.key === "Tab") {
                  e.preventDefault()
                  minuteRef.current?.focus()
                  minuteRef.current?.select()
                }
              }}
            />
          </div>
          <div className="text-2xl text-neutral-2">:</div>
          <div>
            <Label htmlFor="minutes" className="text-xs text-neutral-2">
              分钟
            </Label>
            <Input
              id="minutes"
              ref={minuteRef}
              className="w-[64px]"
              value={minutes.toString().padStart(2, "0")}
              onChange={(e) => {
                const value = parseInt(e.target.value)
                if (isNaN(value) || value < 0 || value > 59) return
                setMinutes(value)
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault()
                  setMinutes(minutes + 1 > 59 ? 0 : minutes + 1)
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  setMinutes(minutes - 1 < 0 ? 59 : minutes - 1)
                }
                if (e.key === "Enter" || (e.key === "Tab" && !e.shiftKey)) {
                  e.preventDefault()
                  setIsOpen(false)
                }
                if (e.key === "Tab" && e.shiftKey) {
                  e.preventDefault()
                  hourRef.current?.focus()
                  hourRef.current?.select()
                }
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

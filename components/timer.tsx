"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface TimerProps {
  duration: number // in seconds
  isActive: boolean
  onComplete: () => void
  sets?: number
  exerciseName?: string // Added exercise name prop for mobile display
}

export function Timer({ duration, isActive, onComplete, sets = 1, exerciseName }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [currentSet, setCurrentSet] = useState(1)
  const [isResting, setIsResting] = useState(false)
  const restDuration = 10 // 10 seconds rest between sets

  useEffect(() => {
    setTimeLeft(duration)
    setCurrentSet(1)
    setIsResting(false)
  }, [duration])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (isResting) {
            // Rest period complete, start next set
            setIsResting(false)
            setCurrentSet(currentSet + 1)
            return duration
          } else if (currentSet < sets) {
            // Set complete, start rest period
            setIsResting(true)
            return restDuration
          } else {
            // All sets complete
            onComplete()
            return 0
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, duration, sets, currentSet, isResting, onComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = isResting
    ? ((restDuration - timeLeft) / restDuration) * 100
    : ((duration - timeLeft) / duration) * 100

  return (
    <Card className="text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-sm sm:text-base">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          Timer
        </CardTitle>
        {exerciseName && (
          <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">{exerciseName}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div
          className={`text-4xl sm:text-6xl lg:text-7xl font-bold countdown-pulse ${isResting ? "text-yellow-400" : "text-primary"}`}
        >
          {formatTime(timeLeft)}
        </div>

        <Progress value={progress} className="h-2 sm:h-3" />

        <div className="flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
          <Badge variant={isResting ? "destructive" : "default"} className="text-xs sm:text-sm">
            {isResting ? "Rest" : "Exercise"}
          </Badge>
          {sets > 1 && (
            <Badge variant="outline" className="text-xs sm:text-sm">
              Set {currentSet} of {sets}
            </Badge>
          )}
        </div>

        {isResting && <p className="text-xs sm:text-sm text-muted-foreground animate-pulse">Prepare for next set...</p>}
      </CardContent>
    </Card>
  )
}

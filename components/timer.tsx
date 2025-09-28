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
}

export function Timer({ duration, isActive, onComplete, sets = 1 }: TimerProps) {
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
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Clock className="h-5 w-5" />
          Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`text-6xl font-bold countdown-pulse ${isResting ? "text-yellow-400" : "text-primary"}`}>
            {formatTime(timeLeft)}
          </div>

          <Progress value={progress} className="h-2" />

          <div className="flex justify-between items-center">
            <Badge variant={isResting ? "destructive" : "default"}>{isResting ? "Rest" : "Exercise"}</Badge>
            {sets > 1 && (
              <Badge variant="outline">
                Set {currentSet} of {sets}
              </Badge>
            )}
          </div>

          {isResting && <p className="text-sm text-muted-foreground">Prepare for next set...</p>}
        </div>
      </CardContent>
    </Card>
  )
}

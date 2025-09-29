"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Minus, RotateCcw, Hash } from "lucide-react"

interface RepCounterProps {
  targetReps: number
  sets: number
  onComplete: () => void
  exerciseName?: string // Added exercise name prop for mobile display
}

export function RepCounter({ targetReps, sets, onComplete, exerciseName }: RepCounterProps) {
  const [currentReps, setCurrentReps] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [completedSets, setCompletedSets] = useState<number[]>([])

  const handleIncrement = () => {
    if (currentReps < targetReps) {
      setCurrentReps(currentReps + 1)
    }
  }

  const handleDecrement = () => {
    if (currentReps > 0) {
      setCurrentReps(currentReps - 1)
    }
  }

  const handleSetComplete = () => {
    if (currentReps >= targetReps) {
      const newCompletedSets = [...completedSets, currentReps]
      setCompletedSets(newCompletedSets)

      if (currentSet < sets) {
        setCurrentSet(currentSet + 1)
        setCurrentReps(0)
      } else {
        onComplete()
      }
    }
  }

  const handleReset = () => {
    setCurrentReps(0)
  }

  const progress = (currentReps / targetReps) * 100
  const totalProgress = ((completedSets.length * targetReps + currentReps) / (sets * targetReps)) * 100

  return (
    <Card className="text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-sm sm:text-base">
          <Hash className="h-4 w-4 sm:h-5 sm:w-5" />
          Rep Counter
        </CardTitle>
        {exerciseName && (
          <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">{exerciseName}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="text-4xl sm:text-6xl lg:text-7xl font-bold text-primary">
          {currentReps}
          <span className="text-lg sm:text-2xl text-muted-foreground">/{targetReps}</span>
        </div>

        <Progress value={progress} className="h-2 sm:h-3" />

        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecrement}
            disabled={currentReps === 0}
            className="h-10 w-10 sm:h-12 sm:w-12 p-0 bg-transparent"
          >
            <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            size="sm"
            onClick={handleIncrement}
            disabled={currentReps >= targetReps}
            className="px-4 sm:px-8 h-10 sm:h-12 text-sm sm:text-base font-semibold"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Add Rep</span>
            <span className="sm:hidden">+1</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-10 w-10 sm:h-12 sm:w-12 p-0 bg-transparent"
          >
            <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        <div className="flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
          <Badge variant={currentReps >= targetReps ? "default" : "outline"} className="text-xs sm:text-sm">
            {currentReps >= targetReps ? "Set Complete!" : "In Progress"}
          </Badge>
          {sets > 1 && (
            <Badge variant="outline" className="text-xs sm:text-sm">
              Set {currentSet} of {sets}
            </Badge>
          )}
        </div>

        {currentReps >= targetReps && (
          <Button onClick={handleSetComplete} className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold">
            {currentSet < sets ? "Next Set" : "Complete Exercise"}
          </Button>
        )}

        {sets > 1 && (
          <div className="pt-2">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">Overall Progress</p>
            <Progress value={totalProgress} className="h-1.5 sm:h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

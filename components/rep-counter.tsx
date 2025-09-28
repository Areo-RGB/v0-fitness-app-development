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
}

export function RepCounter({ targetReps, sets, onComplete }: RepCounterProps) {
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
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Hash className="h-5 w-5" />
          Rep Counter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-6xl font-bold text-primary">
            {currentReps}
            <span className="text-2xl text-muted-foreground">/{targetReps}</span>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDecrement} disabled={currentReps === 0}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleIncrement} disabled={currentReps >= targetReps} className="px-8">
              <Plus className="h-4 w-4 mr-2" />
              Add Rep
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Badge variant={currentReps >= targetReps ? "default" : "outline"}>
              {currentReps >= targetReps ? "Set Complete!" : "In Progress"}
            </Badge>
            {sets > 1 && (
              <Badge variant="outline">
                Set {currentSet} of {sets}
              </Badge>
            )}
          </div>

          {currentReps >= targetReps && (
            <Button onClick={handleSetComplete} className="w-full">
              {currentSet < sets ? "Next Set" : "Complete Exercise"}
            </Button>
          )}

          {sets > 1 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Overall Progress</p>
              <Progress value={totalProgress} className="h-1" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

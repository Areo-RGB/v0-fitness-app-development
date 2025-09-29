"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipForward, SkipBack, RotateCcw, X, Clock, CheckCircle2 } from "lucide-react"

interface StretchExercise {
  name: string
  startTime: string
  endTime: string
  videoDuration: number // Keep original video duration for reference
}

const stretchExercises: StretchExercise[] = [
  { name: "Child's Pose", startTime: "01:12", endTime: "01:53", videoDuration: 41 },
  { name: "Seal Stretch", startTime: "01:54", endTime: "02:33", videoDuration: 39 },
  { name: "Child's Pose with Left Twist", startTime: "02:34", endTime: "03:13", videoDuration: 39 },
  { name: "Child's Pose with Right Twist", startTime: "03:14", endTime: "03:52", videoDuration: 38 },
  { name: "Seal Stretch", startTime: "03:53", endTime: "04:32", videoDuration: 39 },
  { name: "Pigeon Stretch - Right", startTime: "04:33", endTime: "05:13", videoDuration: 40 },
  { name: "Pigeon Stretch - Left", startTime: "05:14", endTime: "05:52", videoDuration: 38 },
  { name: "Couch Stretch - Left", startTime: "05:53", endTime: "06:33", videoDuration: 40 },
  { name: "Couch Stretch - Right", startTime: "06:34", endTime: "07:13", videoDuration: 39 },
  { name: "Criss Cross and Reach", startTime: "07:14", endTime: "07:52", videoDuration: 38 },
  { name: "Criss Cross and Reach - Opposite", startTime: "07:53", endTime: "08:32", videoDuration: 39 },
  { name: "Frog Stretch", startTime: "08:33", endTime: "09:13", videoDuration: 40 },
  { name: "Quad Stretch - Left", startTime: "09:14", endTime: "09:52", videoDuration: 38 },
  { name: "Quad Stretch - Right", startTime: "09:53", endTime: "10:32", videoDuration: 39 },
  { name: "Seated Hamstring", startTime: "10:33", endTime: "11:13", videoDuration: 40 },
  { name: "Wide Leg Hamstring with Left Twist", startTime: "11:14", endTime: "11:52", videoDuration: 38 },
  { name: "Wide Leg Hamstring with Right Twist", startTime: "11:53", endTime: "12:32", videoDuration: 39 },
  { name: "Sit Back on Heels", startTime: "12:33", endTime: "13:13", videoDuration: 40 },
  { name: "Downward Dog", startTime: "13:14", endTime: "13:52", videoDuration: 38 },
  { name: "Sit Back on Heels with Knee Raise", startTime: "13:53", endTime: "14:33", videoDuration: 40 },
  { name: "Calf Stretch - Left", startTime: "14:34", endTime: "15:12", videoDuration: 38 },
  { name: "Calf Stretch - Right", startTime: "15:13", endTime: "15:52", videoDuration: 39 },
  { name: "Sit Back on Toes", startTime: "15:53", endTime: "16:33", videoDuration: 40 },
]

const STRETCH_DURATION = 30

interface StretchRoutineProps {
  onExit: () => void
}

export function StretchRoutine({ onExit }: StretchRoutineProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(STRETCH_DURATION)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])

  const currentExercise = stretchExercises[currentExerciseIndex]
  const totalExercises = stretchExercises.length
  const progress =
    ((currentExerciseIndex + (STRETCH_DURATION - timeRemaining) / STRETCH_DURATION) / totalExercises) * 100

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Exercise completed
            setCompletedExercises((prev) => [...prev, currentExerciseIndex])

            if (currentExerciseIndex < totalExercises - 1) {
              // Move to next exercise
              const nextIndex = currentExerciseIndex + 1
              setCurrentExerciseIndex(nextIndex)
              return STRETCH_DURATION
            } else {
              // Routine completed
              setIsPlaying(false)
              return 0
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, timeRemaining, currentExerciseIndex, totalExercises])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      const nextIndex = currentExerciseIndex + 1
      setCurrentExerciseIndex(nextIndex)
      setTimeRemaining(STRETCH_DURATION)
      setIsPlaying(false)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      const prevIndex = currentExerciseIndex - 1
      setCurrentExerciseIndex(prevIndex)
      setTimeRemaining(STRETCH_DURATION)
      setIsPlaying(false)
    }
  }

  const handleReset = () => {
    setTimeRemaining(STRETCH_DURATION)
    setIsPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const isCompleted = currentExerciseIndex === totalExercises - 1 && timeRemaining === 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Flexibility & Mobility Routine</h1>
              <p className="text-muted-foreground">
                Exercise {currentExerciseIndex + 1} of {totalExercises}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onExit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Player */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/3lfBP1OdoG0?start=${Math.floor(
                      Number.parseInt(currentExercise.startTime.split(":")[0]) * 60 +
                        Number.parseInt(currentExercise.startTime.split(":")[1]),
                    )}&autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1`}
                    title={currentExercise.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-4">
                  <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentExerciseIndex === 0}>
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>

                  <Button onClick={handlePlayPause} size="lg" disabled={isCompleted} className="px-8">
                    {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                    {isPlaying ? "Pause" : "Start"}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentExerciseIndex === totalExercises - 1}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exercise Info */}
          <div className="space-y-6">
            {/* Current Exercise */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{currentExercise.name}</CardTitle>
                  {completedExercises.includes(currentExerciseIndex) && (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{formatTime(timeRemaining)}</div>
                      <p className="text-muted-foreground">Time Remaining</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Duration: {formatTime(STRETCH_DURATION)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Video: {currentExercise.startTime} - {currentExercise.endTime}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exercise List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exercise List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {stretchExercises.map((exercise, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                        index === currentExerciseIndex ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {completedExercises.includes(index) ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                        )}
                        <span className={`text-sm ${index === currentExerciseIndex ? "font-medium" : ""}`}>
                          {exercise.name}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {formatTime(STRETCH_DURATION)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {isCompleted && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-700 mb-2">Routine Complete!</h3>
                  <p className="text-green-600 mb-4">Great job completing the full stretch routine!</p>
                  <Button onClick={onExit} className="bg-green-600 hover:bg-green-700">
                    Return to Home
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

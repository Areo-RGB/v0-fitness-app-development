"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipForward, RotateCcw, ArrowLeft, CheckCircle2 } from "lucide-react"

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
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onExit}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit
              </Button>
              <div>
                <h1 className="text-xl font-bold">Flexibility & Mobility Routine</h1>
                <p className="text-sm text-muted-foreground">
                  Exercise {currentExerciseIndex + 1} of {totalExercises}
                </p>
              </div>
            </div>
            <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
          </div>
          <Progress value={progress} className="mt-2" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
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

            {/* Exercise Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-balance">{currentExercise.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Hold this stretch position for 30 seconds
                    </CardDescription>
                  </div>
                  {completedExercises.includes(currentExerciseIndex) && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-foreground leading-relaxed">
                    Focus on breathing deeply and relaxing into the stretch. Hold the position steadily without
                    bouncing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Timer Display */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-6xl font-bold text-primary mb-2">{formatTime(timeRemaining)}</div>
                    <p className="text-muted-foreground">Time Remaining</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((STRETCH_DURATION - timeRemaining) / STRETCH_DURATION) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="space-y-2">
              <Button onClick={handlePlayPause} className="w-full" size="lg" disabled={isCompleted}>
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </>
                )}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentExerciseIndex === 0}
                  className="flex-1 bg-transparent"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentExerciseIndex === totalExercises - 1}
                  className="flex-1 bg-transparent"
                >
                  <SkipForward className="mr-2 h-4 w-4" />
                  Next
                </Button>
              </div>
            </div>

            {/* Info Card */}
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">{formatTime(STRETCH_DURATION)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Video Time:</span>
                    <span className="font-semibold">
                      {currentExercise.startTime} - {currentExercise.endTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exercise:</span>
                    <span className="font-semibold">
                      {currentExerciseIndex + 1} of {totalExercises}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completion Card */}
            {isCompleted && (
              <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                    <div>
                      <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">Routine Complete!</h3>
                      <p className="text-green-600 dark:text-green-400">
                        Great job completing the full stretch routine!
                      </p>
                    </div>
                    <Button onClick={onExit} className="bg-green-600 hover:bg-green-700">
                      Return to Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, SkipForward, RotateCcw, AlertTriangle, Users } from "lucide-react"
import { LevelSelector } from "@/components/level-selector"
import { Timer } from "@/components/timer"
import { RepCounter } from "@/components/rep-counter"
import { ExerciseVideo } from "@/components/exercise-video"
import { exerciseData } from "@/lib/exercise-data"

interface WorkoutSessionProps {
  onExit: () => void
}

export function WorkoutSession({ onExit }: WorkoutSessionProps) {
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(1)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [showTransition, setShowTransition] = useState(false)

  const phases = exerciseData
  const currentPhaseData = phases[currentPhase - 1]
  const exercise = currentPhaseData.exercises[currentExercise]

  const getExerciseData = () => {
    if (currentPhase === 2 && selectedLevel && exercise.levels) {
      return exercise.levels[selectedLevel - 1]
    }
    return exercise
  }

  const currentExerciseData = getExerciseData()

  // Handle level selection for Teil 2
  useEffect(() => {
    if (currentPhase === 2 && selectedLevel === null) {
      setIsActive(false)
    }
  }, [currentPhase, selectedLevel])

  const handleNext = () => {
    if (currentExercise < currentPhaseData.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setIsActive(false)
      setShowTransition(true)
      setTimeout(() => setShowTransition(false), 2000)
    } else if (currentPhase < 3) {
      setCurrentPhase((prev) => (prev + 1) as 1 | 2 | 3)
      setCurrentExercise(0)
      setIsActive(false)
      setShowTransition(true)
      setTimeout(() => setShowTransition(false), 3000)
    } else {
      // Workout complete
      onExit()
    }
  }

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setIsActive(false)
    } else if (currentPhase > 1) {
      setCurrentPhase((prev) => (prev - 1) as 1 | 2 | 3)
      const prevPhase = phases[currentPhase - 2]
      setCurrentExercise(prevPhase.exercises.length - 1)
      setIsActive(false)
    }
  }

  const totalExercises = phases.reduce((sum, phase) => sum + phase.exercises.length, 0)
  const completedExercises =
    phases.slice(0, currentPhase - 1).reduce((sum, phase) => sum + phase.exercises.length, 0) + currentExercise
  const progress = (completedExercises / totalExercises) * 100

  if (showTransition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="text-6xl font-bold text-primary mb-4">
              {currentPhase === 2 ? "TEIL 2" : currentPhase === 3 ? "TEIL 3" : "NEXT"}
            </div>
            <h2 className="text-2xl font-semibold mb-2">{currentPhaseData.title}</h2>
            <p className="text-muted-foreground">{currentPhaseData.description}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

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
                <h1 className="text-xl font-bold">
                  Teil {currentPhase}: {currentPhaseData.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Exercise {currentExercise + 1} of {currentPhaseData.exercises.length}
                </p>
              </div>
            </div>
            <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
          </div>
          <Progress value={progress} className="mt-2" />
        </div>
      </header>

      {/* Level Selector for Teil 2 */}
      {currentPhase === 2 && selectedLevel === null && (
        <div className="container mx-auto px-4 py-8">
          <LevelSelector onLevelSelect={setSelectedLevel} />
        </div>
      )}

      {/* Exercise Content */}
      {(currentPhase !== 2 || selectedLevel !== null) && (
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Exercise Details */}
            <div className="lg:col-span-2 space-y-6">
              {(() => {
                const videoKey =
                  currentPhase === 2 && selectedLevel && currentExerciseData.videoKey
                    ? currentExerciseData.videoKey
                    : exercise.videoKey

                if (videoKey) {
                  return (
                    <ExerciseVideo videoKey={videoKey} title={`${exercise.germanName} - ${exercise.englishName}`} />
                  )
                }
                return null
              })()}

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-balance">{exercise.germanName}</CardTitle>
                      <CardDescription className="text-lg mt-2">{exercise.englishName}</CardDescription>
                    </div>
                    {exercise.requiresPartner && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Partner Required
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-foreground leading-relaxed">{currentExerciseData.description}</p>

                    {currentExerciseData.focusPoints && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-destructive mb-2">Focus Points:</h4>
                            <ul className="space-y-1 text-sm">
                              {currentExerciseData.focusPoints.map((point, index) => (
                                <li key={index}>• {point}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timer/Counter Controls */}
            <div className="space-y-4">
              {currentExerciseData.duration ? (
                <Timer
                  duration={currentExerciseData.duration}
                  isActive={isActive}
                  onComplete={handleNext}
                  sets={currentExerciseData.sets}
                />
              ) : (
                <RepCounter
                  targetReps={currentExerciseData.reps || 0}
                  sets={currentExerciseData.sets || 1}
                  onComplete={handleNext}
                />
              )}

              {/* Control Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => setIsActive(!isActive)}
                  className="w-full"
                  size="lg"
                  disabled={currentPhase === 2 && selectedLevel === null}
                >
                  {isActive ? (
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
                    disabled={currentPhase === 1 && currentExercise === 0}
                    className="flex-1 bg-transparent"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" onClick={handleNext} className="flex-1 bg-transparent">
                    <SkipForward className="mr-2 h-4 w-4" />
                    Next
                  </Button>
                </div>
              </div>

              {/* Exercise Info */}
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    {currentExerciseData.duration && (
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold">{currentExerciseData.duration}s</span>
                      </div>
                    )}
                    {currentExerciseData.reps && (
                      <div className="flex justify-between">
                        <span>Repetitions:</span>
                        <span className="font-semibold">{currentExerciseData.reps}</span>
                      </div>
                    )}
                    {currentExerciseData.sets && (
                      <div className="flex justify-between">
                        <span>Sets:</span>
                        <span className="font-semibold">{currentExerciseData.sets}</span>
                      </div>
                    )}
                    {currentPhase === 2 && selectedLevel && (
                      <div className="flex justify-between">
                        <span>Level:</span>
                        <span className="font-semibold">
                          {selectedLevel === 1 ? "Beginner" : selectedLevel === 2 ? "Intermediate" : "Advanced"}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

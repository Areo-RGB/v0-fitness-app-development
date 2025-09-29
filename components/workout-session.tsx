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
import { exerciseData, stretchRoutineData, type Phase } from "@/lib/exercise-data"

interface WorkoutSessionProps {
  onExit: () => void
  startingPhase?: 1 | 2 | 3
  programType?: "fifa" | "stretch"
}

export function WorkoutSession({ onExit, startingPhase = 1, programType = "fifa" }: WorkoutSessionProps) {
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(startingPhase)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [showTransition, setShowTransition] = useState(false)
  const [isPhaseTransition, setIsPhaseTransition] = useState(false)

  useEffect(() => {
    if (startingPhase > 1) {
      setShowTransition(true)
      setIsPhaseTransition(true)
      setTimeout(() => {
        setShowTransition(false)
        setIsPhaseTransition(false)
      }, 2000)
    }
  }, [startingPhase])

  const phases: Phase[] = programType === "stretch" ? stretchRoutineData : exerciseData
  const currentPhaseData = phases[currentPhase - 1]
  const exercise = currentPhaseData.exercises[currentExercise]

  const getExerciseData = () => {
    if (currentPhase === 2 && selectedLevel && exercise.levels && programType === "fifa") {
      return exercise.levels[selectedLevel - 1]
    }
    return exercise
  }

  const currentExerciseData = getExerciseData()

  useEffect(() => {
    if (currentPhase === 2 && selectedLevel === null && programType === "fifa") {
      setIsActive(false)
    }
  }, [currentPhase, selectedLevel, programType])

  const handleNext = () => {
    if (currentExercise < currentPhaseData.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setIsActive(false)
      setShowTransition(true)
      setIsPhaseTransition(false)
      setTimeout(() => setShowTransition(false), 1000)
    } else if (currentPhase < phases.length) {
      setCurrentPhase((prev) => (prev + 1) as 1 | 2 | 3)
      setCurrentExercise(0)
      setIsActive(false)
      setShowTransition(true)
      setIsPhaseTransition(true)
      setTimeout(() => {
        setShowTransition(false)
        setIsPhaseTransition(false)
      }, 3000)
    } else {
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

  const truncateTitle = (title: string, maxLength = 25) => {
    if (title.length <= maxLength) return title
    return title.substring(0, maxLength).trim() + "..."
  }

  if (showTransition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            {isPhaseTransition ? (
              <>
                <div className="text-6xl font-bold text-primary mb-4">
                  {programType === "stretch" ? "STRETCH" : `TEIL ${currentPhase}`}
                </div>
                <h2 className="text-2xl font-semibold mb-2">{currentPhaseData.title}</h2>
                <p className="text-muted-foreground">{currentPhaseData.description}</p>
              </>
            ) : (
              <>
                <div className="text-4xl font-bold text-primary mb-4">Next Exercise</div>
                <h2 className="text-xl font-semibold mb-2">{exercise.germanName}</h2>
                <p className="text-muted-foreground">{exercise.englishName}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Button variant="ghost" size="sm" onClick={onExit} className="flex-shrink-0">
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Exit</span>
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-bold truncate">
                  {programType === "stretch"
                    ? truncateTitle(currentPhaseData.title, 20)
                    : `Teil ${currentPhase}: ${truncateTitle(currentPhaseData.title, 15)}`}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Exercise {currentExercise + 1} of {currentPhaseData.exercises.length}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs sm:text-sm flex-shrink-0">
              {Math.round(progress)}%
            </Badge>
          </div>
          <Progress value={progress} className="mt-2 h-1.5 sm:h-2" />
        </div>
      </header>

      {programType === "fifa" && currentPhase === 2 && selectedLevel === null && (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <LevelSelector onLevelSelect={setSelectedLevel} />
        </div>
      )}

      {(programType === "stretch" || currentPhase !== 2 || selectedLevel !== null) && (
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
            <div className="w-full">
              {currentExerciseData.duration ? (
                <Timer
                  duration={currentExerciseData.duration}
                  isActive={isActive}
                  onComplete={handleNext}
                  sets={currentExerciseData.sets}
                  exerciseName={truncateTitle(exercise.germanName, 30)}
                />
              ) : (
                <RepCounter
                  targetReps={currentExerciseData.reps || 0}
                  sets={currentExerciseData.sets || 1}
                  onComplete={handleNext}
                  exerciseName={truncateTitle(exercise.germanName, 30)}
                />
              )}
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setIsActive(!isActive)}
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold"
                size="lg"
                disabled={programType === "fifa" && currentPhase === 2 && selectedLevel === null}
              >
                {isActive ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Start
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentPhase === 1 && currentExercise === 0}
                  className="h-10 sm:h-12 bg-transparent"
                >
                  <RotateCcw className="mr-1 sm:mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Previous</span>
                </Button>
                <Button variant="outline" onClick={handleNext} className="h-10 sm:h-12 bg-transparent">
                  <SkipForward className="mr-1 sm:mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Next</span>
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg sm:text-2xl text-balance leading-tight">
                      {exercise.germanName}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-lg mt-1 sm:mt-2 text-balance">
                      {exercise.englishName}
                    </CardDescription>
                  </div>
                  {exercise.requiresPartner && (
                    <Badge variant="outline" className="flex items-center gap-1 text-xs flex-shrink-0">
                      <Users className="h-3 w-3" />
                      <span className="hidden sm:inline">Partner Required</span>
                      <span className="sm:hidden">Partner</span>
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {currentExerciseData.description}
                </p>

                {currentExerciseData.focusPoints && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-destructive mb-2 text-sm sm:text-base">Focus Points:</h4>
                        <ul className="space-y-1 text-xs sm:text-sm">
                          {currentExerciseData.focusPoints.map((point, index) => (
                            <li key={index} className="leading-relaxed">
                              • {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {currentExerciseData.duration && (
                    <div className="text-center p-2 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground">Duration</div>
                      <div className="font-semibold text-sm">{currentExerciseData.duration}s</div>
                    </div>
                  )}
                  {currentExerciseData.reps && (
                    <div className="text-center p-2 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground">Reps</div>
                      <div className="font-semibold text-sm">{currentExerciseData.reps}</div>
                    </div>
                  )}
                  {currentExerciseData.sets && (
                    <div className="text-center p-2 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground">Sets</div>
                      <div className="font-semibold text-sm">{currentExerciseData.sets}</div>
                    </div>
                  )}
                  {programType === "fifa" && currentPhase === 2 && selectedLevel && (
                    <div className="text-center p-2 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground">Level</div>
                      <div className="font-semibold text-sm">
                        {selectedLevel === 1 ? "Beginner" : selectedLevel === 2 ? "Intermediate" : "Advanced"}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {(() => {
              const videoKey =
                programType === "fifa" && currentPhase === 2 && selectedLevel && currentExerciseData.videoKey
                  ? currentExerciseData.videoKey
                  : exercise.videoKey

              if (videoKey) {
                if (programType === "stretch" && typeof videoKey === "string" && videoKey.startsWith("http")) {
                  return (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg">Exercise Video</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <video width="100%" height="100%" controls className="w-full h-full" src={videoKey}>
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </CardContent>
                    </Card>
                  )
                } else if (programType === "fifa") {
                  return (
                    <ExerciseVideo
                      videoKey={videoKey}
                      title={`${truncateTitle(exercise.germanName, 25)} - ${truncateTitle(exercise.englishName, 25)}`}
                    />
                  )
                }
              }
              return null
            })()}
          </div>
        </main>
      )}
    </div>
  )
}

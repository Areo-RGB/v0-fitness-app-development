"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Target, Users, AlertTriangle, ArrowRight } from "lucide-react"
import { WorkoutSession } from "@/components/workout-session"

export default function HomePage() {
  const [isStarted, setIsStarted] = useState(false)
  const [startingPhase, setStartingPhase] = useState<1 | 2 | 3>(1)

  if (isStarted) {
    return <WorkoutSession onExit={() => setIsStarted(false)} startingPhase={startingPhase} />
  }

  const handlePhaseClick = (phase: 1 | 2 | 3) => {
    setStartingPhase(phase)
    setIsStarted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary">FIFA 11+</h1>
              <p className="text-muted-foreground mt-1">Injury Prevention Training Program</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Official Program
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Program Overview */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-card to-secondary/20 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-balance">Complete Injury Prevention Training</CardTitle>
              <CardDescription className="text-lg">
                The FIFA 11+ is a complete warm-up program to reduce injuries among soccer players aged 14 years and
                older.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">26 Minutes</p>
                    <p className="text-sm text-muted-foreground">Total Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">3 Phases</p>
                    <p className="text-sm text-muted-foreground">Structured Program</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">All Levels</p>
                    <p className="text-sm text-muted-foreground">Beginner to Advanced</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setStartingPhase(1)
                  setIsStarted(true)
                }}
                size="lg"
                className="w-full md:w-auto text-lg px-8 py-6 pulse-glow"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Training Session
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Program Phases */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Training Phases</h2>
          <p className="text-muted-foreground mb-6">Click any phase to jump directly to that section</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className="border-primary/20 cursor-pointer transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:scale-[1.02]"
            onClick={() => handlePhaseClick(1)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-primary">Teil 1: Running</CardTitle>
                  <CardDescription>Dynamic warm-up and mobility</CardDescription>
                </div>
                <ArrowRight className="h-5 w-5 text-primary opacity-60" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">8 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Exercises:</span>
                  <span className="font-semibold">6 drills</span>
                </div>
                <div className="flex justify-between">
                  <span>Focus:</span>
                  <span className="font-semibold">Mobility</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-primary/20 cursor-pointer transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:scale-[1.02]"
            onClick={() => handlePhaseClick(2)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-primary">Teil 2: Strength</CardTitle>
                  <CardDescription>Core stability and balance</CardDescription>
                </div>
                <ArrowRight className="h-5 w-5 text-primary opacity-60" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">10 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Exercises:</span>
                  <span className="font-semibold">6 exercises</span>
                </div>
                <div className="flex justify-between">
                  <span>Levels:</span>
                  <span className="font-semibold">3 difficulty</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-primary/20 cursor-pointer transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:scale-[1.02]"
            onClick={() => handlePhaseClick(3)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-primary">Teil 3: Running</CardTitle>
                  <CardDescription>High-intensity drills</CardDescription>
                </div>
                <ArrowRight className="h-5 w-5 text-primary opacity-60" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">8 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Exercises:</span>
                  <span className="font-semibold">3 drills</span>
                </div>
                <div className="flex justify-between">
                  <span>Focus:</span>
                  <span className="font-semibold">Speed & Agility</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Safety Notice */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Important Safety Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                • <strong>Knees must not buckle inward</strong> during any exercise
              </li>
              <li>• Land softly on forefoot during jumping exercises</li>
              <li>• Maintain proper form over speed or repetitions</li>
              <li>• Stop immediately if you feel pain or discomfort</li>
              <li>• Some exercises require a partner - ensure proper communication</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

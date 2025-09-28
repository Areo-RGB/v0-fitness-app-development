"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Zap } from "lucide-react"

interface LevelSelectorProps {
  onLevelSelect: (level: 1 | 2 | 3) => void
}

export function LevelSelector({ onLevelSelect }: LevelSelectorProps) {
  const levels = [
    {
      level: 1,
      name: "Anfänger",
      english: "Beginner",
      description: "Perfect for those new to the FIFA 11+ program or returning from injury",
      icon: Star,
      color: "text-green-400",
      bgColor: "bg-green-400/10 border-green-400/20",
    },
    {
      level: 2,
      name: "Fortgeschrittene",
      english: "Intermediate",
      description: "For players with good fitness levels and some experience with the program",
      icon: TrendingUp,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10 border-yellow-400/20",
    },
    {
      level: 3,
      name: "Topfit",
      english: "Advanced",
      description: "Maximum challenge for elite athletes and experienced players",
      icon: Zap,
      color: "text-red-400",
      bgColor: "bg-red-400/10 border-red-400/20",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">Choose Your Level</h2>
        <p className="text-muted-foreground text-lg">
          Select the difficulty level for Teil 2: Strength, Plyometrics & Balance exercises
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((levelData) => {
          const Icon = levelData.icon
          return (
            <Card
              key={levelData.level}
              className={`cursor-pointer transition-all hover:scale-105 ${levelData.bgColor}`}
              onClick={() => onLevelSelect(levelData.level as 1 | 2 | 3)}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full bg-background/50 ${levelData.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-xl">{levelData.name}</CardTitle>
                <CardDescription className="text-base">{levelData.english}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground mb-6 leading-relaxed">
                  {levelData.description}
                </p>
                <Button
                  className="w-full"
                  variant={levelData.level === 2 ? "default" : "outline"}
                  onClick={() => onLevelSelect(levelData.level as 1 | 2 | 3)}
                >
                  Select Level {levelData.level}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <Badge variant="secondary" className="text-sm">
          You can change levels between exercises if needed
        </Badge>
      </div>
    </div>
  )
}

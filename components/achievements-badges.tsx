import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Target, Zap, Award, Crown } from "lucide-react"

interface AchievementsBadgesProps {
  completedLessons: number
}

export function AchievementsBadges({ completedLessons }: AchievementsBadgesProps) {
  const achievements = [
    {
      id: "first-lesson",
      title: "Первый шаг",
      description: "Завершили первый урок",
      icon: Star,
      unlocked: completedLessons >= 1,
      color: "text-yellow-500",
    },
    {
      id: "five-lessons",
      title: "Активный ученик",
      description: "Завершили 5 уроков",
      icon: Target,
      unlocked: completedLessons >= 5,
      color: "text-blue-500",
    },
    {
      id: "ten-lessons",
      title: "Целеустремленный",
      description: "Завершили 10 уроков",
      icon: Zap,
      unlocked: completedLessons >= 10,
      color: "text-purple-500",
    },
    {
      id: "fifteen-lessons",
      title: "Почти эксперт",
      description: "Завершили 15 уроков",
      icon: Award,
      unlocked: completedLessons >= 15,
      color: "text-green-500",
    },
    {
      id: "all-lessons",
      title: "Мастер Telegram",
      description: "Завершили все уроки",
      icon: Crown,
      unlocked: completedLessons >= 20,
      color: "text-orange-500",
    },
  ]

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Достижения
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {unlockedCount} из {achievements.length} разблокировано
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border text-center transition-all ${
                  achievement.unlocked
                    ? "bg-muted/50 border-primary/20"
                    : "bg-muted/20 border-muted opacity-50 grayscale"
                }`}
              >
                <Icon
                  className={`h-6 w-6 mx-auto mb-2 ${achievement.unlocked ? achievement.color : "text-muted-foreground"}`}
                />
                <h4 className="font-medium text-xs mb-1">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    Получено
                  </Badge>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Trophy, Target } from "lucide-react"

interface DashboardStatsProps {
  totalLessons: number
  completedLessons: number
  studyTime: number
}

export function DashboardStats({ totalLessons, completedLessons, studyTime }: DashboardStatsProps) {
  const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const remainingLessons = totalLessons - completedLessons

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Статистика</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Пройдено уроков</span>
          </div>
          <span className="font-medium">
            {completedLessons} / {totalLessons}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Процент завершения</span>
          </div>
          <span className="font-medium">{completionRate}%</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Время изучения</span>
          </div>
          <span className="font-medium">{studyTime}ч</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-chart-4" />
            <span className="text-sm text-muted-foreground">Осталось уроков</span>
          </div>
          <span className="font-medium">{remainingLessons}</span>
        </div>
      </CardContent>
    </Card>
  )
}

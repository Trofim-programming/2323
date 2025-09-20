import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar } from "lucide-react"

interface Activity {
  id: string
  completed_at: string
  lessons: {
    title: string
    categories: {
      name: string
    }
  }
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Недавняя активность
        </CardTitle>
        <CardDescription>Ваши последние достижения в обучении</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{activity.lessons.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {activity.lessons.categories.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(activity.completed_at).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Пока нет активности. Начните изучать уроки!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

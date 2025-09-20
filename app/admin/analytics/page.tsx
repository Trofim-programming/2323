import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, Users, BookOpen, MessageCircle, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin" && profile?.role !== "teacher") {
    redirect("/dashboard")
  }

  // Получаем статистику
  const { data: totalUsers } = await supabase.from("profiles").select("id", { count: "exact" })
  const { data: totalLessons } = await supabase.from("lessons").select("id", { count: "exact" })
  const { data: totalComments } = await supabase.from("comments").select("id", { count: "exact" })
  const { data: completedLessons } = await supabase
    .from("progress")
    .select("id", { count: "exact" })
    .eq("status", "completed")

  // Получаем статистику по категориям
  const { data: categoryStats } = await supabase
    .from("categories")
    .select(
      `
      *,
      lessons(
        id,
        progress(count)
      )
    `,
    )
    .order("created_at")

  // Получаем активность по дням (последние 7 дней)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data: recentActivity } = await supabase
    .from("progress")
    .select("completed_at")
    .gte("completed_at", sevenDaysAgo.toISOString())
    .eq("status", "completed")

  // Группируем активность по дням
  const activityByDay = recentActivity?.reduce(
    (acc, item) => {
      const date = new Date(item.completed_at).toLocaleDateString("ru-RU")
      acc[date] = (acc[date] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const stats = [
    {
      title: "Всего пользователей",
      value: totalUsers?.length || 0,
      icon: Users,
      color: "text-blue-500",
      change: "+12%",
    },
    {
      title: "Всего уроков",
      value: totalLessons?.length || 0,
      icon: BookOpen,
      color: "text-green-500",
      change: "+5%",
    },
    {
      title: "Завершений уроков",
      value: completedLessons?.length || 0,
      icon: Award,
      color: "text-purple-500",
      change: "+23%",
    },
    {
      title: "Комментариев",
      value: totalComments?.length || 0,
      icon: MessageCircle,
      color: "text-orange-500",
      change: "+8%",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад в админ-панель
            </Link>

            <h1 className="text-3xl font-bold mb-2">Аналитика</h1>
            <p className="text-muted-foreground">Статистика и метрики платформы</p>
          </div>

          {/* Основная статистика */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title} className="hover-float transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-green-500 mt-1">{stat.change} за месяц</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Статистика по модулям */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Статистика по модулям
                </CardTitle>
                <CardDescription>Популярность модулей курса</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryStats?.map((category) => {
                    const totalCompletions = category.lessons?.reduce(
                      (sum: number, lesson: any) => sum + (lesson.progress?.[0]?.count || 0),
                      0,
                    )
                    const lessonsCount = category.lessons?.length || 0

                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm text-muted-foreground">{lessonsCount} уроков</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{totalCompletions}</p>
                            <p className="text-xs text-muted-foreground">завершений</p>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{
                              width: `${Math.min((totalCompletions / Math.max(totalUsers?.length || 1, 1)) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Активность по дням */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Активность за неделю
                </CardTitle>
                <CardDescription>Завершения уроков по дням</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(activityByDay || {})
                    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                    .map(([date, count]) => (
                      <div key={date} className="flex items-center justify-between">
                        <span className="text-sm">{date}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${Math.min((count / 10) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>

                {Object.keys(activityByDay || {}).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Нет активности за последние 7 дней</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Общие метрики */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Общие метрики
              </CardTitle>
              <CardDescription>Ключевые показатели эффективности</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">
                    {totalUsers && completedLessons
                      ? Math.round(((completedLessons.length / totalUsers.length) * 100) / (totalLessons?.length || 1))
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">Средний прогресс</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-accent">
                    {totalUsers && completedLessons
                      ? Math.round((completedLessons.length / totalUsers.length) * 10) / 10
                      : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Уроков на пользователя</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-secondary">
                    {totalUsers && totalComments ? Math.round((totalComments.length / totalUsers.length) * 10) / 10 : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Комментариев на пользователя</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

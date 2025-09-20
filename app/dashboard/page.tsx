import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, BookOpen, Clock, Target, TrendingUp, Play, Award, Star, Users } from "lucide-react"
import Link from "next/link"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { AchievementsBadges } from "@/components/achievements-badges"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Получаем профиль пользователя
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Получаем общую статистику прогресса
  const { data: totalLessons } = await supabase.from("lessons").select("id", { count: "exact" })
  const { data: completedLessons } = await supabase
    .from("progress")
    .select("id", { count: "exact" })
    .eq("user_id", user.id)
    .eq("status", "completed")

  const { data: categories } = await supabase.from("categories").select("*").order("created_at")

  // Получаем прогресс по категориям
  const { data: categoryProgress } = await supabase
    .from("progress")
    .select(
      `
      *,
      lessons(category_id, categories(name))
    `,
    )
    .eq("user_id", user.id)
    .eq("status", "completed")

  // Группируем прогресс по категориям
  const progressByCategory = categories?.map((category) => {
    const categoryLessonsCompleted = categoryProgress?.filter((p) => p.lessons?.category_id === category.id).length || 0
    return {
      ...category,
      completed: categoryLessonsCompleted,
    }
  })

  const totalLessonsCount = totalLessons?.length || 0
  const completedLessonsCount = completedLessons?.length || 0
  const overallProgress = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0

  // Получаем недавнюю активность
  const { data: recentProgress } = await supabase
    .from("progress")
    .select(
      `
      *,
      lessons(title, categories(name))
    `,
    )
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Добро пожаловать, {profile?.name || user.user_metadata?.name || "Студент"}!
            </h1>
            <p className="text-muted-foreground">Отслеживайте свой прогресс и продолжайте обучение</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Основной контент */}
            <div className="lg:col-span-2 space-y-8">
              {/* Общий прогресс */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Общий прогресс курса
                  </CardTitle>
                  <CardDescription>Ваши достижения в изучении Telegram маркетинга</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{overallProgress}%</div>
                      <p className="text-muted-foreground">
                        {completedLessonsCount} из {totalLessonsCount} уроков завершено
                      </p>
                    </div>

                    <Progress value={overallProgress} className="h-3" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <div className="font-semibold">{completedLessonsCount}</div>
                        <div className="text-xs text-muted-foreground">Уроков пройдено</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <Trophy className="h-6 w-6 mx-auto mb-2 text-accent" />
                        <div className="font-semibold">
                          {progressByCategory?.filter((c) => c.completed > 0).length || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Модулей начато</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <Clock className="h-6 w-6 mx-auto mb-2 text-secondary" />
                        <div className="font-semibold">{Math.round((completedLessonsCount * 18) / 60)}ч</div>
                        <div className="text-xs text-muted-foreground">Времени изучено</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <Star className="h-6 w-6 mx-auto mb-2 text-chart-4" />
                        <div className="font-semibold">{Math.floor(completedLessonsCount / 5)}</div>
                        <div className="text-xs text-muted-foreground">Достижений</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Прогресс по модулям */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Прогресс по модулям
                  </CardTitle>
                  <CardDescription>Детальная статистика по каждому модулю курса</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {progressByCategory?.map((category) => {
                      const totalCategoryLessons = 4 // Примерное количество уроков в модуле
                      const categoryProgress = Math.round((category.completed / totalCategoryLessons) * 100)

                      return (
                        <div key={category.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{category.name}</h4>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{categoryProgress}%</div>
                              <div className="text-xs text-muted-foreground">
                                {category.completed}/{totalCategoryLessons}
                              </div>
                            </div>
                          </div>
                          <Progress value={categoryProgress} className="h-2" />
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Button asChild className="w-full hover-float">
                      <Link href="/modules">
                        <Play className="h-4 w-4 mr-2" />
                        Продолжить обучение
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Недавняя активность */}
              <RecentActivity activities={recentProgress || []} />
            </div>

            {/* Боковая панель */}
            <div className="space-y-6">
              {/* Быстрые действия */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/modules">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Все модули
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/profile">
                      <Users className="h-4 w-4 mr-2" />
                      Настройки профиля
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/certificates">
                      <Award className="h-4 w-4 mr-2" />
                      Сертификаты
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Достижения */}
              <AchievementsBadges completedLessons={completedLessonsCount} />

              {/* Статистика */}
              <DashboardStats
                totalLessons={totalLessonsCount}
                completedLessons={completedLessonsCount}
                studyTime={Math.round((completedLessonsCount * 18) / 60)}
              />

              {/* Мотивационная карточка */}
              <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Продолжайте в том же духе!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {overallProgress < 25
                      ? "Отличное начало! Продолжайте изучать модули."
                      : overallProgress < 50
                        ? "Вы на полпути к успеху! Не останавливайтесь."
                        : overallProgress < 75
                          ? "Отлично! Вы почти у цели."
                          : "Поздравляем! Вы почти завершили курс."}
                  </p>
                  {overallProgress < 100 && (
                    <Button asChild size="sm" className="hover-float">
                      <Link href="/modules">Продолжить</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

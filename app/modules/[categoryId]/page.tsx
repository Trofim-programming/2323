import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Clock, CheckCircle, Circle } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Получаем категорию и её уроки
  const { data: category } = await supabase
    .from("categories")
    .select(
      `
      *,
      lessons(*)
    `,
    )
    .eq("id", categoryId)
    .single()

  if (!category) {
    redirect("/modules")
  }

  // Получаем прогресс пользователя по урокам этой категории
  const { data: userProgress } = await supabase
    .from("progress")
    .select("lesson_id, status")
    .eq("user_id", user.id)
    .in(
      "lesson_id",
      category.lessons.map((lesson: any) => lesson.id),
    )

  const progressMap = new Map(userProgress?.map((p) => [p.lesson_id, p.status]) || [])
  const completedLessons = userProgress?.filter((p) => p.status === "completed").length || 0
  const totalLessons = category.lessons.length
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/modules"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад к модулям
            </Link>

            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-muted-foreground text-lg">{category.description}</p>
              </div>
              <Badge variant="secondary" className="ml-4">
                {totalLessons} уроков
              </Badge>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Прогресс модуля</h3>
                  <span className="text-sm text-muted-foreground">
                    {completedLessons} из {totalLessons} уроков
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">{progressPercentage}% завершено</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {category.lessons
              .sort((a: any, b: any) => a.order_index - b.order_index)
              .map((lesson: any, index: number) => {
                const isCompleted = progressMap.get(lesson.id) === "completed"
                const isInProgress = progressMap.get(lesson.id) === "in_progress"

                return (
                  <Card
                    key={lesson.id}
                    className={`hover-float transition-all duration-300 ${
                      isCompleted ? "border-green-500/50 bg-green-500/5" : "hover:border-primary/50"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              Урок {lesson.order_index}
                            </Badge>
                            {isInProgress && (
                              <Badge variant="secondary" className="text-xs">
                                В процессе
                              </Badge>
                            )}
                            {isCompleted && (
                              <Badge variant="default" className="text-xs bg-green-500">
                                Завершен
                              </Badge>
                            )}
                          </div>

                          <CardTitle className="text-lg mb-2">{lesson.title}</CardTitle>
                          <CardDescription className="text-sm leading-relaxed">{lesson.content}</CardDescription>
                        </div>

                        <div className="flex-shrink-0">
                          <Button asChild className="hover-float">
                            <Link href={`/lesson/${lesson.id}`}>
                              <Play className="h-4 w-4 mr-2" />
                              {isCompleted ? "Повторить" : "Смотреть"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 pl-9">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          ~15-20 мин
                        </div>
                        <div className="flex items-center gap-1">
                          <Play className="h-3 w-3" />
                          Видео + материалы
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>

          {totalLessons > 0 && (
            <div className="mt-8 text-center">
              <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Готовы начать?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Изучайте уроки последовательно для лучшего результата
                  </p>
                  <Button asChild className="hover-float">
                    <Link href={`/lesson/${category.lessons[0].id}`}>
                      <Play className="h-4 w-4 mr-2" />
                      Начать первый урок
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

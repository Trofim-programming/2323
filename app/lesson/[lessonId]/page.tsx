import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Clock, Play, MessageCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LessonVideo } from "@/components/lesson-video"
import { LessonComments } from "@/components/lesson-comments"
import { MarkCompleteButton } from "@/components/mark-complete-button"

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Получаем урок с категорией
  const { data: lesson } = await supabase
    .from("lessons")
    .select(
      `
      *,
      categories(*)
    `,
    )
    .eq("id", lessonId)
    .single()

  if (!lesson) {
    redirect("/modules")
  }

  // Получаем все уроки этой категории для навигации
  const { data: categoryLessons } = await supabase
    .from("lessons")
    .select("id, title, order_index")
    .eq("category_id", lesson.category_id)
    .order("order_index")

  // Получаем прогресс пользователя по этому уроку
  const { data: userProgress } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .single()

  // Получаем комментарии к уроку
  const { data: comments } = await supabase
    .from("comments")
    .select(
      `
      *,
      profiles(name, avatar)
    `,
    )
    .eq("lesson_id", lessonId)
    .order("created_at", { ascending: false })

  const currentIndex = categoryLessons?.findIndex((l) => l.id === lessonId) || 0
  const prevLesson = currentIndex > 0 ? categoryLessons?.[currentIndex - 1] : null
  const nextLesson = currentIndex < (categoryLessons?.length || 0) - 1 ? categoryLessons?.[currentIndex + 1] : null

  const isCompleted = userProgress?.status === "completed"

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href={`/modules/${lesson.category_id}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад к модулю "{lesson.categories.name}"
            </Link>

            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Урок {lesson.order_index}</Badge>
                  <Badge variant="secondary">{lesson.categories.name}</Badge>
                  {isCompleted && (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Завершен
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-muted-foreground text-lg">{lesson.content}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Видео */}
              <Card>
                <CardContent className="p-0">
                  <LessonVideo videoUrl={lesson.video_url} title={lesson.title} />
                </CardContent>
              </Card>

              {/* Описание урока */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />О чем этот урок
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{lesson.content}</p>

                  <Separator className="my-6" />

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      ~15-20 минут
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {comments?.length || 0} комментариев
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Комментарии */}
              <LessonComments lessonId={lessonId} comments={comments || []} userId={user.id} />
            </div>

            <div className="space-y-6">
              {/* Прогресс и действия */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Прогресс урока</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MarkCompleteButton
                    lessonId={lessonId}
                    userId={user.id}
                    isCompleted={isCompleted}
                    categoryId={lesson.category_id}
                  />

                  {isCompleted && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Урок завершен!</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Навигация по урокам */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Навигация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {prevLesson && (
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <Link href={`/lesson/${prevLesson.id}`}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        <div className="text-left">
                          <div className="text-xs text-muted-foreground">Предыдущий урок</div>
                          <div className="text-sm font-medium truncate">{prevLesson.title}</div>
                        </div>
                      </Link>
                    </Button>
                  )}

                  {nextLesson && (
                    <Button asChild className="w-full justify-start">
                      <Link href={`/lesson/${nextLesson.id}`}>
                        <div className="text-left flex-1">
                          <div className="text-xs text-primary-foreground/80">Следующий урок</div>
                          <div className="text-sm font-medium truncate">{nextLesson.title}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}

                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/modules/${lesson.category_id}`}>Все уроки модуля</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Список уроков модуля */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Уроки модуля</CardTitle>
                  <CardDescription>{lesson.categories.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categoryLessons?.map((categoryLesson) => (
                      <Link
                        key={categoryLesson.id}
                        href={`/lesson/${categoryLesson.id}`}
                        className={`block p-2 rounded-lg text-sm transition-colors ${
                          categoryLesson.id === lessonId
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs">Урок {categoryLesson.order_index}</span>
                          <span className="truncate">{categoryLesson.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

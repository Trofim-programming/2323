import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLessonsPage() {
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

  // Получаем все уроки с категориями и статистикой
  const { data: lessons } = await supabase
    .from("lessons")
    .select(
      `
      *,
      categories(name),
      progress(count)
    `,
    )
    .order("category_id")
    .order("order_index")

  // Группируем уроки по категориям
  const lessonsByCategory = lessons?.reduce(
    (acc, lesson) => {
      const categoryName = lesson.categories?.name || "Без категории"
      if (!acc[categoryName]) {
        acc[categoryName] = []
      }
      acc[categoryName].push(lesson)
      return acc
    },
    {} as Record<string, any[]>,
  )

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

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Управление уроками</h1>
                <p className="text-muted-foreground">Создание, редактирование и управление контентом курса</p>
              </div>
              <Button asChild className="hover-float">
                <Link href="/admin/lessons/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать урок
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(lessonsByCategory || {}).map(([categoryName, categoryLessons]) => (
              <Card key={categoryName}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {categoryName} ({categoryLessons.length} уроков)
                  </CardTitle>
                  <CardDescription>Уроки в категории "{categoryName}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">Урок {lesson.order_index}</Badge>
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{lesson.content}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Eye className="h-3 w-3" />
                              {lesson.progress?.[0]?.count || 0} завершений
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(lesson.created_at).toLocaleDateString("ru-RU")}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button asChild variant="ghost" size="icon">
                              <Link href={`/lesson/${lesson.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button asChild variant="ghost" size="icon">
                              <Link href={`/admin/lessons/${lesson.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {lessons?.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Пока нет уроков</h3>
                <p className="text-muted-foreground mb-6">Создайте первый урок для начала курса</p>
                <Button asChild className="hover-float">
                  <Link href="/admin/lessons/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Создать урок
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

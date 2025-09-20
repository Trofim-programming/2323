import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, MessageCircle, TrendingUp, Eye, UserPlus, Award } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Проверяем роль пользователя
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin" && profile?.role !== "teacher") {
    redirect("/dashboard")
  }

  // Получаем статистику
  const { data: totalUsers } = await supabase.from("profiles").select("id", { count: "exact" })
  const { data: totalLessons } = await supabase.from("lessons").select("id", { count: "exact" })
  const { data: totalComments } = await supabase.from("comments").select("id", { count: "exact" })
  const { data: totalProgress } = await supabase
    .from("progress")
    .select("id", { count: "exact" })
    .eq("status", "completed")

  // Получаем недавних пользователей
  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Получаем популярные уроки
  const { data: popularLessons } = await supabase
    .from("lessons")
    .select(
      `
      *,
      progress(count)
    `,
    )
    .limit(5)

  const stats = [
    {
      title: "Всего пользователей",
      value: totalUsers?.length || 0,
      icon: Users,
      color: "text-blue-500",
      href: "/admin/users",
    },
    {
      title: "Всего уроков",
      value: totalLessons?.length || 0,
      icon: BookOpen,
      color: "text-green-500",
      href: "/admin/lessons",
    },
    {
      title: "Комментариев",
      value: totalComments?.length || 0,
      icon: MessageCircle,
      color: "text-purple-500",
      href: "/admin/comments",
    },
    {
      title: "Завершений уроков",
      value: totalProgress?.length || 0,
      icon: Award,
      color: "text-orange-500",
      href: "/admin/analytics",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Панель администратора</h1>
            <p className="text-muted-foreground">Управление курсом и пользователями</p>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title} className="hover-float transition-all duration-300 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <Button asChild variant="ghost" size="sm" className="mt-4 w-full">
                      <Link href={stat.href}>Подробнее</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Недавние пользователи */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Недавние регистрации
                </CardTitle>
                <CardDescription>Новые пользователи платформы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers?.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{user.name || "Без имени"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString("ru-RU")}
                        </p>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{user.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                  <Link href="/admin/users">Все пользователи</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Популярные уроки */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Популярные уроки
                </CardTitle>
                <CardDescription>Уроки с наибольшим количеством завершений</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularLessons?.slice(0, 5).map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">Урок {lesson.order_index}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          {lesson.progress?.[0]?.count || 0}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                  <Link href="/admin/lessons">Все уроки</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Быстрые действия */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>Часто используемые функции администратора</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button asChild className="hover-float">
                  <Link href="/admin/lessons/new">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Создать урок
                  </Link>
                </Button>
                <Button asChild variant="outline" className="hover-float bg-transparent">
                  <Link href="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    Управление пользователями
                  </Link>
                </Button>
                <Button asChild variant="outline" className="hover-float bg-transparent">
                  <Link href="/admin/analytics">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Аналитика
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

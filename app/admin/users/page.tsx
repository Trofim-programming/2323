import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Users, MoreHorizontal, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default async function AdminUsersPage() {
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

  // Получаем всех пользователей с их прогрессом
  const { data: users } = await supabase
    .from("profiles")
    .select(
      `
      *,
      progress(count)
    `,
    )
    .order("created_at", { ascending: false })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "teacher":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

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
                <h1 className="text-3xl font-bold mb-2">Управление пользователями</h1>
                <p className="text-muted-foreground">Просмотр и управление учетными записями пользователей</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Поиск пользователей..." className="pl-10 w-64" />
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Все пользователи ({users?.length || 0})
              </CardTitle>
              <CardDescription>Список всех зарегистрированных пользователей</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users?.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {user.name?.charAt(0) || user.email?.charAt(0) || "?"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name || "Без имени"}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge className={getRoleColor(user.role || "student")}>{user.role || "student"}</Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(user.created_at).toLocaleDateString("ru-RU")}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium">{user.progress?.[0]?.count || 0} уроков</p>
                        <p className="text-xs text-muted-foreground">завершено</p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Просмотр профиля</DropdownMenuItem>
                          <DropdownMenuItem>Изменить роль</DropdownMenuItem>
                          <DropdownMenuItem>Сбросить прогресс</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Заблокировать</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              {users?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Пользователи не найдены</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

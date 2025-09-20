import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Rocket, PenTool, TrendingUp, BarChart3, DollarSign, Clock, Play, Lock } from "lucide-react"
import Link from "next/link"

const moduleIcons = {
  Старт: Rocket,
  Контент: PenTool,
  Продвижение: TrendingUp,
  Аналитика: BarChart3,
  Монетизация: DollarSign,
}

const moduleColors = {
  Старт: "bg-primary/10 text-primary border-primary/20",
  Контент: "bg-accent/10 text-accent border-accent/20",
  Продвижение: "bg-secondary/10 text-secondary border-secondary/20",
  Аналитика: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Монетизация: "bg-chart-4/10 text-chart-4 border-chart-4/20",
}

export default async function ModulesPage() {
  const supabase = await createClient()

  // Получаем категории с количеством уроков
  const { data: categories } = await supabase
    .from("categories")
    .select(
      `
      *,
      lessons(count)
    `,
    )
    .order("created_at")

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Модули курса</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              5 модулей, которые превратят ваш Telegram-канал в прибыльный бизнес
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category, index) => {
              const Icon = moduleIcons[category.name as keyof typeof moduleIcons] || Rocket
              const colorClass = moduleColors[category.name as keyof typeof moduleColors] || moduleColors.Старт
              const lessonCount = category.lessons?.[0]?.count || 0

              return (
                <Card
                  key={category.id}
                  className={`hover-float transition-all duration-300 hover:border-primary/50 ${colorClass}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {lessonCount} уроков
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm">{category.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <Progress value={0} className="h-2" />

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          ~2-3 часа
                        </div>
                        <span>0% завершено</span>
                      </div>

                      <Button asChild className="w-full" variant={user ? "default" : "secondary"}>
                        <Link href={user ? `/modules/${category.id}` : "/auth/login"}>
                          {user ? (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Начать изучение
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              Войти для доступа
                            </>
                          )}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {!user && (
            <div className="mt-12 text-center">
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Готовы начать обучение?</h3>
                  <p className="text-muted-foreground mb-6">
                    Зарегистрируйтесь и получите доступ ко всем 20 урокам курса
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="hover-float">
                      <Link href="/auth/register">Создать аккаунт</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="hover-float bg-transparent">
                      <Link href="/auth/login">Уже есть аккаунт</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

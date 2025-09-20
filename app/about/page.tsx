import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Target, Users, BookOpen, Award, CheckCircle, TrendingUp, Play, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: "20 практических уроков",
      description: "Пошаговые инструкции от создания канала до монетизации",
    },
    {
      icon: Target,
      title: "5 ключевых модулей",
      description: "Старт, Контент, Продвижение, Аналитика, Монетизация",
    },
    {
      icon: Users,
      title: "Сообщество экспертов",
      description: "Общение с единомышленниками и получение обратной связи",
    },
    {
      icon: Award,
      title: "Сертификат о прохождении",
      description: "Подтверждение ваших знаний в Telegram маркетинге",
    },
  ]

  const benefits = [
    "Создадите канал с нуля или оптимизируете существующий",
    "Научитесь создавать вирусный контент",
    "Освоите все способы привлечения подписчиков",
    "Изучите аналитику и метрики эффективности",
    "Запустите монетизацию и получите первые доходы",
    "Получите готовые шаблоны и чек-листы",
  ]

  const stats = [
    { number: "5000+", label: "Выпускников" },
    { number: "4.9", label: "Рейтинг курса" },
    { number: "20", label: "Практических уроков" },
    { number: "50+", label: "Часов контента" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero секция */}
        <section className="py-20 lg:py-32">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6" variant="secondary">
                О курсе
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
                Превратите свой <span className="text-primary">Telegram канал</span> в прибыльный бизнес
              </h1>

              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Комплексный курс для тех, кто хочет создать успешный Telegram канал и зарабатывать на нем от 50,000
                рублей в месяц
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button asChild size="lg" className="hover-float">
                  <Link href="/modules">
                    <Play className="h-4 w-4 mr-2" />
                    Начать обучение
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover-float bg-transparent">
                  <Link href="#features">Узнать больше</Link>
                </Button>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Особенности курса */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Что вы получите</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Полный набор знаний и инструментов для создания успешного Telegram канала
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <Card key={index} className="hover-float transition-all duration-300 hover:border-primary/50">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Что вы изучите */}
        <section className="py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Что вы изучите</h2>
                <p className="text-xl text-muted-foreground">Пошаговый план развития вашего Telegram канала</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Для кого курс */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Для кого этот курс</h2>
                <p className="text-xl text-muted-foreground">Курс подойдет как новичкам, так и опытным блогерам</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center hover-float">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Новички</h3>
                    <p className="text-sm text-muted-foreground">
                      Хотите создать свой первый Telegram канал и не знаете с чего начать
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover-float">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">Блогеры</h3>
                    <p className="text-sm text-muted-foreground">
                      Уже ведете канал, но хотите увеличить аудиторию и доходы
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover-float">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold mb-2">Предприниматели</h3>
                    <p className="text-sm text-muted-foreground">
                      Хотите использовать Telegram для продвижения своего бизнеса
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA секция */}
        <section className="py-20">
          <div className="container px-4">
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Готовы начать свой путь к успеху?</h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Присоединяйтесь к тысячам успешных блогеров, которые уже зарабатывают на своих Telegram каналах
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="hover-float">
                    <Link href="/auth/register">
                      Начать обучение
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="hover-float bg-transparent">
                    <Link href="/modules">Посмотреть программу</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Rocket, PenTool, TrendingUp, BarChart3, DollarSign, Clock } from "lucide-react"

const modules = [
  {
    id: 1,
    title: "Старт",
    description: "Создание и настройка канала с нуля",
    icon: Rocket,
    lessons: 4,
    duration: "2 часа",
    progress: 0,
    color: "bg-primary/10 text-primary",
    size: "col-span-1 row-span-2",
  },
  {
    id: 2,
    title: "Контент",
    description: "Создание вовлекающего контента",
    icon: PenTool,
    lessons: 5,
    duration: "3 часа",
    progress: 0,
    color: "bg-accent/10 text-accent",
    size: "col-span-2 row-span-1",
  },
  {
    id: 3,
    title: "Продвижение",
    description: "Привлечение подписчиков",
    icon: TrendingUp,
    lessons: 4,
    duration: "2.5 часа",
    progress: 0,
    color: "bg-secondary/10 text-secondary",
    size: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Аналитика",
    description: "Метрики и статистика",
    icon: BarChart3,
    lessons: 3,
    duration: "2 часа",
    progress: 0,
    color: "bg-chart-3/10 text-chart-3",
    size: "col-span-1 row-span-1",
  },
  {
    id: 5,
    title: "Монетизация",
    description: "Превращение канала в доход",
    icon: DollarSign,
    lessons: 4,
    duration: "3 часа",
    progress: 0,
    color: "bg-chart-4/10 text-chart-4",
    size: "col-span-2 row-span-1",
  },
]

export function ModulesGrid() {
  return (
    <section id="modules" className="py-20">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Что внутри курса</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            5 модулей, которые превратят твой Telegram-канал в бизнес
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => {
            const Icon = module.icon
            return (
              <Card
                key={module.id}
                className={`hover-float transition-all duration-300 hover:border-primary/50 cursor-pointer ${module.size}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${module.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {module.lessons} уроков
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription className="text-sm">{module.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <Progress value={module.progress} className="h-2" />

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {module.duration}
                      </div>
                      <span>{module.progress}% завершено</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

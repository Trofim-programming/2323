"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      <div className="container relative px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
            Прокачай свой <span className="text-primary">Telegram-канал</span> до монетизации
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Полный путь от создания канала до первых денег
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="hover-float group">
              Начать обучение
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button variant="outline" size="lg" className="hover-float bg-transparent">
              <Play className="mr-2 h-4 w-4" />
              Смотреть превью
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mr-4">20 уроков</span>
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent mr-4">5 модулей</span>
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary">Сертификат</span>
          </div>
        </div>
      </div>
    </section>
  )
}

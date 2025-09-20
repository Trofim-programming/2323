"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Анна Петрова",
    avatar: "/diverse-woman-avatar.png",
    role: "Блогер",
    rating: 5,
    text: "За 2 месяца мой канал вырос с 500 до 15000 подписчиков. Курс дал четкий план действий и работающие стратегии.",
  },
  {
    id: 2,
    name: "Михаил Сидоров",
    avatar: "/man-avatar.png",
    role: "Предприниматель",
    rating: 5,
    text: "Начал монетизировать канал уже через месяц после прохождения курса. Первая прибыль - 50,000 рублей!",
  },
  {
    id: 3,
    name: "Елена Козлова",
    avatar: "/woman-business-avatar.jpg",
    role: "Маркетолог",
    rating: 5,
    text: "Отличная структура курса и практические задания. Все знания сразу применимы на практике.",
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-card/50">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Отзывы учеников</h2>
          <p className="text-xl text-muted-foreground">Истории успеха наших студентов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card
              key={review.id}
              className="hover-float transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{review.text}"</p>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

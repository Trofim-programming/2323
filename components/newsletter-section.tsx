"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift } from "lucide-react"
import { useState } from "react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log("Subscribe email:", email)
    setEmail("")
  }

  return (
    <section className="py-20">
      <div className="container px-4">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Gift className="h-8 w-8 text-primary" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">Получай бесплатные гайды на почту</h3>

            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Еженедельные советы по развитию Telegram каналов, кейсы и эксклюзивные материалы
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Введи свой email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <Button type="submit" className="hover-float">
                Подписаться
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">Никакого спама. Отписаться можно в любой момент.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

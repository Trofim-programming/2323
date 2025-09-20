import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Mail, MessageCircle, Phone, Send, Clock, Users, HelpCircle, Briefcase } from "lucide-react"

export default function ContactsPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Напишите нам на почту",
      contact: "hello@telegramacademy.ru",
      response: "Ответим в течение 24 часов",
    },
    {
      icon: MessageCircle,
      title: "Telegram",
      description: "Свяжитесь с нами в мессенджере",
      contact: "@telegramacademy_support",
      response: "Ответим в течение 2 часов",
    },
    {
      icon: Phone,
      title: "Телефон",
      description: "Позвоните нам для срочных вопросов",
      contact: "+7 (495) 123-45-67",
      response: "Пн-Пт с 10:00 до 19:00",
    },
  ]

  const faqItems = [
    {
      question: "Подходит ли курс для новичков?",
      answer: "Да, курс создан специально для тех, кто только начинает работать с Telegram каналами.",
    },
    {
      question: "Сколько времени нужно на прохождение курса?",
      answer: "В среднем студенты проходят курс за 2-4 недели, уделяя обучению 1-2 часа в день.",
    },
    {
      question: "Есть ли поддержка после прохождения курса?",
      answer: "Да, все выпускники получают доступ к закрытому сообществу и могут задавать вопросы.",
    },
    {
      question: "Можно ли получить возврат средств?",
      answer: "Да, мы предоставляем гарантию возврата средств в течение 14 дней.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero секция */}
        <section className="py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6" variant="secondary">
                Контакты
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">Свяжитесь с нами</h1>

              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Есть вопросы о курсе? Нужна помощь с обучением? Мы всегда готовы помочь!
              </p>
            </div>
          </div>
        </section>

        <div className="container px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Форма обратной связи */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Напишите нам
                    </CardTitle>
                    <CardDescription>Заполните форму, и мы свяжемся с вами в ближайшее время</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input id="name" placeholder="Ваше имя" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Тема</Label>
                        <Input id="subject" placeholder="О чем хотите спросить?" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Сообщение</Label>
                        <Textarea
                          id="message"
                          placeholder="Опишите ваш вопрос подробнее..."
                          className="min-h-[120px]"
                        />
                      </div>

                      <Button type="submit" className="w-full hover-float">
                        <Send className="h-4 w-4 mr-2" />
                        Отправить сообщение
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Способы связи */}
                <div className="mt-8 space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon
                    return (
                      <Card key={index} className="hover-float transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{method.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                              <p className="font-medium text-primary">{method.contact}</p>
                              <p className="text-xs text-muted-foreground">{method.response}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Информация и FAQ */}
              <div className="space-y-8">
                {/* Информация о компании */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />О нас
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Telegram Academy — это команда экспертов в области Telegram маркетинга с опытом работы более 5
                      лет. Мы помогли более 5000 студентов создать успешные каналы и начать зарабатывать.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <div className="text-2xl font-bold text-primary">5000+</div>
                        <div className="text-sm text-muted-foreground">Выпускников</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <div className="text-2xl font-bold text-accent">5 лет</div>
                        <div className="text-sm text-muted-foreground">Опыта</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Часто задаваемые вопросы */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Частые вопросы
                    </CardTitle>
                    <CardDescription>Ответы на самые популярные вопросы о курсе</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {faqItems.map((item, index) => (
                        <div key={index} className="border-b border-border pb-4 last:border-b-0">
                          <h4 className="font-medium mb-2">{item.question}</h4>
                          <p className="text-sm text-muted-foreground">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Рабочие часы */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Время работы поддержки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Понедельник - Пятница</span>
                        <span className="font-medium">10:00 - 19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Суббота</span>
                        <span className="font-medium">11:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Воскресенье</span>
                        <span className="text-muted-foreground">Выходной</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      * Время указано по московскому часовому поясу (UTC+3)
                    </p>
                  </CardContent>
                </Card>

                {/* Партнерство */}
                <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Briefcase className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Партнерство и сотрудничество</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Заинтересованы в партнерстве? Хотите стать преподавателем? Напишите нам!
                    </p>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      partnership@telegramacademy.ru
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

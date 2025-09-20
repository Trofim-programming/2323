import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { ArrowLeft, Calendar, Clock, Share, BookOpen } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Моковые данные для демонстрации
const posts = [
  {
    id: "1",
    title: "10 секретов создания вирусного контента в Telegram",
    content: `
      <p>Создание вирусного контента — это искусство, которое можно освоить. В этой статье мы разберем 10 проверенных секретов, которые помогут вашим постам набирать тысячи просмотров и репостов.</p>
      
      <h2>1. Эмоциональные триггеры</h2>
      <p>Контент, который вызывает сильные эмоции, распространяется быстрее. Используйте:</p>
      <ul>
        <li>Удивление и шок</li>
        <li>Юмор и смех</li>
        <li>Вдохновение и мотивацию</li>
        <li>Гнев и возмущение (осторожно!)</li>
      </ul>
      
      <h2>2. Актуальность и трендовость</h2>
      <p>Следите за трендами и новостями в вашей нише. Быстрая реакция на актуальные события может принести огромный охват.</p>
      
      <h2>3. Визуальная привлекательность</h2>
      <p>Красивые изображения, инфографика и видео увеличивают вовлеченность в разы. Инвестируйте в качественный визуал.</p>
    `,
    category: "Контент",
    readTime: "5 мин",
    publishedAt: "2024-01-15",
    author: "Анна Петрова",
  },
]

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = posts.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Контент: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Продвижение: "bg-green-500/10 text-green-500 border-green-500/20",
      Монетизация: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      Аналитика: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      Реклама: "bg-red-500/10 text-red-500 border-red-500/20",
      Психология: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    }
    return colors[category] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Назад к блогу
              </Link>

              <div className="mb-6">
                <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-6">{post.title}</h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div>Автор: {post.author}</div>
              </div>

              <div className="flex items-center gap-2 mb-8">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Share className="h-4 w-4 mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <div
                  className="prose prose-gray dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>

            {/* CTA в конце статьи */}
            <Card className="mt-8 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-4">Хотите изучить больше?</h3>
                <p className="text-muted-foreground mb-6">
                  Присоединяйтесь к нашему курсу и получите полные знания о Telegram маркетинге
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="hover-float">
                    <Link href="/modules">Посмотреть курс</Link>
                  </Button>
                  <Button asChild variant="outline" className="hover-float bg-transparent">
                    <Link href="/blog">Читать другие статьи</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "10 секретов создания вирусного контента в Telegram",
      excerpt:
        "Узнайте, как создавать посты, которые хочется репостить. Разбираем психологию вирусности и эмоциональные триггеры.",
      category: "Контент",
      readTime: "5 мин",
      publishedAt: "2024-01-15",
      image: "/blog-viral-content.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Как я вырастил канал с 0 до 100,000 подписчиков за 6 месяцев",
      excerpt:
        "Пошаговая стратегия роста канала: от выбора ниши до масштабирования аудитории. Реальный кейс с цифрами.",
      category: "Продвижение",
      readTime: "8 мин",
      publishedAt: "2024-01-12",
      image: "/blog-growth-case.jpg",
      featured: true,
    },
    {
      id: 3,
      title: "Telegram Ads: полное руководство по рекламе в 2024",
      excerpt: "Все о рекламе в Telegram: настройка кампаний, таргетинг, оптимизация и анализ результатов.",
      category: "Реклама",
      readTime: "12 мин",
      publishedAt: "2024-01-10",
      image: "/blog-telegram-ads.jpg",
      featured: false,
    },
    {
      id: 4,
      title: "5 способов монетизации Telegram канала в 2024",
      excerpt: "Обзор актуальных способов заработка: от рекламы до продажи собственных продуктов.",
      category: "Монетизация",
      readTime: "6 мин",
      publishedAt: "2024-01-08",
      image: "/blog-monetization.jpg",
      featured: false,
    },
    {
      id: 5,
      title: "Аналитика Telegram: какие метрики действительно важны",
      excerpt: "Разбираем ключевые показатели эффективности канала и учимся принимать решения на основе данных.",
      category: "Аналитика",
      readTime: "7 мин",
      publishedAt: "2024-01-05",
      image: "/blog-analytics.jpg",
      featured: false,
    },
    {
      id: 6,
      title: "Психология подписчиков: как удержать аудиторию",
      excerpt: "Изучаем мотивацию подписчиков и создаем контент, который заставляет возвращаться снова и снова.",
      category: "Психология",
      readTime: "9 мин",
      publishedAt: "2024-01-03",
      image: "/blog-psychology.jpg",
      featured: false,
    },
  ]

  const categories = ["Все", "Контент", "Продвижение", "Монетизация", "Аналитика", "Реклама", "Психология"]
  const featuredPosts = posts.filter((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

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

      <main>
        {/* Hero секция */}
        <section className="py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6" variant="secondary">
                Блог
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">
                Экспертные статьи о <span className="text-primary">Telegram маркетинге</span>
              </h1>

              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Актуальные кейсы, стратегии и инсайты от практикующих экспертов
              </p>

              {/* Категории */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "Все" ? "default" : "outline"}
                    size="sm"
                    className="hover-float bg-transparent"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Рекомендуемые статьи */}
        <section className="pb-20">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Рекомендуемые статьи</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {featuredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="hover-float transition-all duration-300 hover:border-primary/50 overflow-hidden"
                  >
                    <div className="aspect-video bg-muted relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      <Button asChild variant="ghost" className="w-full justify-between p-0 h-auto">
                        <Link href={`/blog/${post.id}`}>
                          Читать статью
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Все статьи */}
              <h2 className="text-2xl font-bold mb-8">Все статьи</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="hover-float transition-all duration-300 hover:border-primary/50">
                    <div className="aspect-video bg-muted" />
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                        <Link href={`/blog/${post.id}`}>Читать</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Подписка на обновления */}
              <Card className="mt-16 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Не пропускайте новые статьи</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Подпишитесь на нашу рассылку и получайте свежие кейсы и инсайты прямо на почту
                  </p>
                  <Button asChild className="hover-float">
                    <Link href="/#newsletter">Подписаться на рассылку</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

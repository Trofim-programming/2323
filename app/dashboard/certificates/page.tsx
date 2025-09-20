import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Download, Share, Calendar } from "lucide-react"
import Link from "next/link"

export default function CertificatesPage() {
  // В реальном приложении здесь будут данные из базы
  const certificates = [
    {
      id: 1,
      title: "Основы Telegram маркетинга",
      description: "Сертификат о прохождении базового курса",
      completedAt: "2024-01-15",
      progress: 100,
      available: true,
    },
    {
      id: 2,
      title: "Продвинутые стратегии монетизации",
      description: "Сертификат о прохождении продвинутого курса",
      completedAt: null,
      progress: 65,
      available: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад в дашборд
            </Link>

            <h1 className="text-3xl font-bold mb-2">Сертификаты</h1>
            <p className="text-muted-foreground">Ваши достижения и сертификаты о прохождении курсов</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((certificate) => (
              <Card
                key={certificate.id}
                className={`hover-float transition-all duration-300 ${
                  certificate.available ? "border-primary/50" : "border-muted"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Award className={`h-8 w-8 ${certificate.available ? "text-primary" : "text-muted-foreground"}`} />
                    <Badge variant={certificate.available ? "default" : "secondary"}>
                      {certificate.available ? "Доступен" : `${certificate.progress}%`}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{certificate.title}</CardTitle>
                  <CardDescription>{certificate.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  {certificate.available ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Получен {new Date(certificate.completedAt!).toLocaleDateString("ru-RU")}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="hover-float">
                          <Download className="h-4 w-4 mr-2" />
                          Скачать PDF
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Share className="h-4 w-4 mr-2" />
                          Поделиться
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс</span>
                          <span>{certificate.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${certificate.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">Завершите курс, чтобы получить сертификат</p>

                      <Button asChild size="sm" variant="outline" className="bg-transparent">
                        <Link href="/modules">Продолжить обучение</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {certificates.filter((c) => c.available).length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Пока нет сертификатов</h3>
                <p className="text-muted-foreground mb-6">Завершите курсы, чтобы получить сертификаты о прохождении</p>
                <Button asChild className="hover-float">
                  <Link href="/modules">Начать обучение</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад на главную
          </Link>
        </div>

        <Card className="hover-float">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Проверьте почту</CardTitle>
            <CardDescription>Мы отправили ссылку для подтверждения на ваш email</CardDescription>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Перейдите по ссылке в письме, чтобы активировать аккаунт и начать обучение.
            </p>

            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">
                Не получили письмо? Проверьте папку "Спам" или попробуйте зарегистрироваться снова.
              </p>
            </div>

            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/auth/login">Вернуться к входу</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

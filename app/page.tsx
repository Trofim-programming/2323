import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ModulesGrid } from "@/components/modules-grid"
import { ReviewsSection } from "@/components/reviews-section"
import { NewsletterSection } from "@/components/newsletter-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ModulesGrid />
        <ReviewsSection />
        <NewsletterSection />
      </main>

      <footer className="bg-muted/30 border-t border-border">
        <div className="container py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">T</span>
                  </div>
                  <span className="font-bold text-lg">Telegram Academy</span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Превращаем Telegram каналы в прибыльный бизнес. Более 5000 успешных выпускников.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>© 2024 Telegram Academy</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Обучение</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <a href="/about" className="hover:text-foreground transition-colors">
                      О курсе
                    </a>
                  </div>
                  <div>
                    <a href="/modules" className="hover:text-foreground transition-colors">
                      Модули
                    </a>
                  </div>
                  <div>
                    <a href="/blog" className="hover:text-foreground transition-colors">
                      Блог
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Поддержка</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <a href="/contacts" className="hover:text-foreground transition-colors">
                      Контакты
                    </a>
                  </div>
                  <div>
                    <a href="/auth/login" className="hover:text-foreground transition-colors">
                      Войти
                    </a>
                  </div>
                  <div>
                    <a href="/auth/register" className="hover:text-foreground transition-colors">
                      Регистрация
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

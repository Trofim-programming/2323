"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Menu, X, User, LogOut, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Получаем текущего пользователя
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        setProfile(profile)
      }

      setLoading(false)
    }

    getUser()

    // Подписываемся на изменения аутентификации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const getUserInitials = (user: SupabaseUser) => {
    const name = user.user_metadata?.name || user.email
    return name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const isAdmin = profile?.role === "admin" || profile?.role === "teacher"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-lg">Telegram Academy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              О курсе
            </Link>
            <Link href="/modules" className="text-sm font-medium hover:text-primary transition-colors">
              Модули
            </Link>
            <a href="/#reviews" className="text-sm font-medium hover:text-primary transition-colors">
              Отзывы
            </a>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Блог
            </Link>
            <Link href="/contacts" className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-2">
              <Progress value={0} className="w-20 h-2" />
              <span className="text-xs text-muted-foreground">0%</span>
            </div>
          )}

          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getUserInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.user_metadata?.name || "Пользователь"}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                      <User className="mr-2 h-4 w-4" />
                      Личный кабинет
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => router.push("/admin")}>
                        <Settings className="mr-2 h-4 w-4" />
                        Админ-панель
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button className="hover-float" onClick={() => router.push("/auth/login")}>
                  <User className="h-4 w-4 mr-2" />
                  Войти / Начать курс
                </Button>
              )}
            </>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-4">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              О курсе
            </Link>
            <Link href="/modules" className="text-sm font-medium hover:text-primary transition-colors">
              Модули
            </Link>
            <a href="/#reviews" className="text-sm font-medium hover:text-primary transition-colors">
              Отзывы
            </a>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Блог
            </Link>
            <Link href="/contacts" className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

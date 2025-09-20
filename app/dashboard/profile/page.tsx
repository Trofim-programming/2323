"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Mail, Save, Camera } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function ProfilePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    telegram_username: "",
    website: "",
  })

  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        setProfile(profile)
        setFormData({
          name: profile?.name || user.user_metadata?.name || "",
          bio: profile?.bio || "",
          telegram_username: profile?.telegram_username || "",
          website: profile?.website || "",
        })
      }
      setLoading(false)
    }

    getProfile()
  }, [supabase])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        name: formData.name,
        bio: formData.bio,
        telegram_username: formData.telegram_username,
        website: formData.website,
        email: user.email,
      })

      if (error) throw error

      // Обновляем локальное состояние
      setProfile({ ...profile, ...formData })
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setSaving(false)
    }
  }

  const getUserInitials = () => {
    const name = formData.name || user?.email
    return name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка профиля...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад в дашборд
            </Link>

            <h1 className="text-3xl font-bold mb-2">Настройки профиля</h1>
            <p className="text-muted-foreground">Управляйте своей учетной записью и персональными данными</p>
          </div>

          <div className="space-y-6">
            {/* Основная информация */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Основная информация
                </CardTitle>
                <CardDescription>Ваши персональные данные и контактная информация</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  {/* Аватар */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button type="button" variant="outline" size="sm" className="bg-transparent">
                        <Camera className="h-4 w-4 mr-2" />
                        Изменить фото
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG до 2MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">О себе</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Расскажите немного о себе..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telegram">Telegram</Label>
                      <Input
                        id="telegram"
                        value={formData.telegram_username}
                        onChange={(e) => setFormData({ ...formData, telegram_username: e.target.value })}
                        placeholder="@username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Веб-сайт</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={saving} className="hover-float">
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Сохранение..." : "Сохранить изменения"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Информация об аккаунте */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Информация об аккаунте
                </CardTitle>
                <CardDescription>Детали вашей учетной записи</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Статус аккаунта</span>
                  <Badge variant="secondary">Активный</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Роль</span>
                  <Badge variant="outline">{profile?.role || "student"}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Дата регистрации</span>
                  <span className="text-sm">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("ru-RU", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Неизвестно"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Последний вход</span>
                  <span className="text-sm">
                    {user?.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleDateString("ru-RU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Неизвестно"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Настройки уведомлений */}
            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
                <CardDescription>Управляйте тем, как вы получаете уведомления</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email уведомления</p>
                      <p className="text-sm text-muted-foreground">Получать уведомления о новых уроках</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Напоминания о прогрессе</p>
                      <p className="text-sm text-muted-foreground">Еженедельные отчеты о вашем прогрессе</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Маркетинговые материалы</p>
                      <p className="text-sm text-muted-foreground">Получать советы и новости</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

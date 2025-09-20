"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface Comment {
  id: string
  text: string
  created_at: string
  profiles: {
    name: string
    avatar: string | null
  } | null
}

interface LessonCommentsProps {
  lessonId: string
  comments: Comment[]
  userId: string
}

export function LessonComments({ lessonId, comments, userId }: LessonCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from("comments").insert({
        text: newComment.trim(),
        author_id: userId,
        lesson_id: lessonId,
      })

      if (error) throw error

      setNewComment("")
      // В реальном приложении здесь бы был revalidate или обновление состояния
      window.location.reload()
    } catch (error) {
      console.error("Error submitting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Комментарии ({comments.length})
        </CardTitle>
        <CardDescription>Обсудите урок с другими студентами</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Форма добавления комментария */}
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            placeholder="Поделитесь своими мыслями об уроке..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isSubmitting || !newComment.trim()} className="hover-float">
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Отправка..." : "Отправить комментарий"}
          </Button>
        </form>

        {/* Список комментариев */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-4 rounded-lg bg-muted/50">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {comment.profiles?.name?.charAt(0) || "А"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.profiles?.name || "Аноним"}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Пока нет комментариев. Будьте первым!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

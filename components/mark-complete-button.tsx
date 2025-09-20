"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Circle } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface MarkCompleteButtonProps {
  lessonId: string
  userId: string
  isCompleted: boolean
  categoryId: string
}

export function MarkCompleteButton({ lessonId, userId, isCompleted, categoryId }: MarkCompleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(isCompleted)
  const supabase = createClient()

  const handleToggleComplete = async () => {
    setLoading(true)
    try {
      if (completed) {
        // Удаляем запись о прогрессе
        const { error } = await supabase.from("progress").delete().eq("user_id", userId).eq("lesson_id", lessonId)
        if (error) throw error
        setCompleted(false)
      } else {
        // Добавляем или обновляем запись о прогрессе
        const { error } = await supabase.from("progress").upsert({
          user_id: userId,
          lesson_id: lessonId,
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        if (error) throw error
        setCompleted(true)
      }
    } catch (error) {
      console.error("Error updating progress:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleToggleComplete}
      disabled={loading}
      variant={completed ? "secondary" : "default"}
      className="w-full hover-float"
    >
      {completed ? (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          {loading ? "Обновление..." : "Урок завершен"}
        </>
      ) : (
        <>
          <Circle className="h-4 w-4 mr-2" />
          {loading ? "Отмечаем..." : "Отметить как завершенный"}
        </>
      )}
    </Button>
  )
}

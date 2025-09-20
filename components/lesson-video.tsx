"use client"

export function LessonVideo({ videoUrl, title }: { videoUrl: string; title: string }) {
  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
      <iframe
        src={videoUrl}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

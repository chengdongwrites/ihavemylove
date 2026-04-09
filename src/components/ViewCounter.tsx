'use client'
import { useEffect, useState } from 'react'

export default function ViewCounter({ page }: { page: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    // Increment then read
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page }),
    }).then(() =>
      fetch(`/api/views?page=${encodeURIComponent(page)}`)
        .then(r => r.json())
        .then(d => setViews(d.views))
    )
  }, [page])

  if (views === null) return null

  return (
    <span className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-wide">
      {views.toLocaleString()} 次阅读
    </span>
  )
}

'use client'
import { useEffect, useState } from 'react'

const PAGE_SIZE = 10

interface Comment {
  id: number
  name: string
  body: string
  created_at: string
}

export default function Comments({ page }: { page: string }) {
  const [comments, setComments]   = useState<Comment[]>([])
  const [visible, setVisible]     = useState(PAGE_SIZE)
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [body, setBody]           = useState('')
  const [status, setStatus]       = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [errMsg, setErrMsg]       = useState('')

  // Load saved name/email from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('commenter')
    if (saved) {
      const { name: n, email: e } = JSON.parse(saved)
      if (n) setName(n)
      if (e) setEmail(e)
    }
  }, [])

  // Save name/email whenever they change
  useEffect(() => {
    if (name || email) {
      localStorage.setItem('commenter', JSON.stringify({ name, email }))
    }
  }, [name, email])

  function load() {
    fetch(`/api/comments?page=${encodeURIComponent(page)}`)
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) {
          // newest first
          const sorted = [...d].sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          setComments(sorted)
          setVisible(PAGE_SIZE)
        }
      })
  }

  useEffect(() => { load() }, [page])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, name, email, body }),
    })
    const data = await res.json()
    if (!res.ok) {
      setStatus('error')
      setErrMsg(data.error ?? '提交失败，请稍后再试')
    } else {
      setStatus('done')
      setBody('')
      load()
    }
  }

  const shown     = comments.slice(0, visible)
  const hasMore   = comments.length > PAGE_SIZE && visible < comments.length
  const remaining = comments.length - visible

  return (
    <section className="mt-16 border-t border-amber-200/40 dark:border-gray-800/60 pt-10">
      <h2 className="font-serif text-lg text-ink dark:text-gray-200 tracking-widest mb-1">
        留言
      </h2>
      {comments.length > 0 && (
        <p className="font-sans text-xs text-gray-400 dark:text-gray-600 mb-6">
          共 {comments.length} 条
        </p>
      )}

      {/* Existing comments */}
      {comments.length > 0 && (
        <div className="space-y-6 mb-10">
          {shown.map(c => (
            <div key={c.id} className="border-l-2 border-amber-200/50 dark:border-amber-900/40 pl-4">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-serif text-sm text-ink dark:text-gray-300">{c.name}</span>
                <span className="font-sans text-xs text-gray-400 dark:text-gray-600">
                  {new Date(c.created_at).toLocaleDateString('zh-CN', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
              <p className="font-serif text-sm text-gray-700 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                {c.body}
              </p>
            </div>
          ))}

          {hasMore && (
            <button
              onClick={() => setVisible(v => v + PAGE_SIZE)}
              className="font-sans text-sm text-accent dark:text-amber-400 hover:underline"
            >
              加载更多（还有 {remaining} 条）
            </button>
          )}
        </div>
      )}

      {comments.length === 0 && (
        <p className="font-sans text-sm text-gray-400 dark:text-gray-600 mb-8">
          暂无留言，来写第一条吧。
        </p>
      )}

      {/* Comment form */}
      {status === 'done' ? (
        <p className="font-serif text-sm text-accent dark:text-amber-400">
          留言已提交，谢谢。
          <button
            className="ml-3 font-sans text-xs text-gray-400 underline"
            onClick={() => setStatus('idle')}
          >
            再写一条
          </button>
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <div className="flex gap-3">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="姓名"
              required
              className="flex-1 font-sans text-sm px-3 py-2 rounded border border-amber-200/60 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent/40"
            />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="邮箱（不公开）"
              type="email"
              required
              className="flex-1 font-sans text-sm px-3 py-2 rounded border border-amber-200/60 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent/40"
            />
          </div>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="写下你的感想……"
            required
            rows={4}
            className="w-full font-sans text-sm px-3 py-2 rounded border border-amber-200/60 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent/40 resize-none"
          />
          {status === 'error' && (
            <p className="font-sans text-xs text-red-500">{errMsg}</p>
          )}
          <div className="flex items-center justify-between">
            <p className="font-sans text-xs text-gray-400 dark:text-gray-600">
              邮箱仅用于管理，不会显示给读者
            </p>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="font-sans text-sm px-5 py-2 rounded bg-accent/90 hover:bg-accent text-white dark:bg-amber-700 dark:hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? '提交中…' : '提交留言'}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

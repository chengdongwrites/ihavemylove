'use client'

import { useState, useRef, useEffect } from 'react'

export default function SubscribeButton() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'already' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrMsg(data.error ?? '出错了，请稍后再试')
        setStatus('error')
      } else if (data.already) {
        setStatus('already')
      } else {
        setStatus('ok')
        setEmail('')
      }
    } catch {
      setErrMsg('网络错误，请稍后再试')
      setStatus('error')
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => { setOpen(o => !o); setStatus('idle') }}
        className="nav-link tracking-wide text-sm font-sans"
      >
        订阅
      </button>

      {open && (
        <div className="absolute right-0 top-8 w-72 bg-paper dark:bg-gray-900 border border-amber-200/60 dark:border-gray-700 rounded shadow-lg p-4 z-50">
          <p className="font-sans text-xs text-gray-500 dark:text-gray-400 mb-1">
            订阅新文章通知
          </p>
          <p className="font-sans text-xs text-gray-400 dark:text-gray-500 mb-3 leading-relaxed">
            新文章上线时收到邮件提醒，与留言独立。
          </p>

          {status === 'ok' && (
            <p className="font-sans text-xs text-green-600 dark:text-green-400">
              已订阅！新文章上线时您会收到邮件。
            </p>
          )}
          {status === 'already' && (
            <p className="font-sans text-xs text-gray-400 dark:text-gray-500">
              此邮箱已在订阅列表中。
            </p>
          )}

          {status !== 'ok' && (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="您的邮箱"
                required
                className="flex-1 font-sans text-xs px-2 py-1.5 rounded border border-amber-200/60 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none focus:border-amber-400/60"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="font-sans text-xs px-3 py-1.5 rounded border border-amber-300/60 dark:border-amber-700/50 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? '…' : '订阅'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="font-sans text-xs text-red-400 mt-1">{errMsg}</p>
          )}
        </div>
      )}
    </div>
  )
}

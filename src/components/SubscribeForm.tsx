'use client'

import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'already' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

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
    <div className="mt-10 mb-2 pt-8 border-t border-amber-200/40 dark:border-gray-800/60">
      <p className="font-sans text-sm text-gray-500 dark:text-gray-400 tracking-wide mb-1">
        订阅新文章通知
      </p>
      <p className="font-sans text-xs text-gray-400 dark:text-gray-500 mb-4">
        订阅后每当有新文章上线，您会收到邮件通知（与留言独立）
      </p>

      {status === 'ok' && (
        <p className="font-sans text-xs text-green-600 dark:text-green-400">
          已订阅，新文章上线时您会收到邮件通知。
        </p>
      )}
      {status === 'already' && (
        <p className="font-sans text-xs text-gray-400 dark:text-gray-500">
          此邮箱已在订阅列表中。
        </p>
      )}

      {status !== 'ok' && (
        <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="您的邮箱"
            required
            className="font-sans text-xs px-3 py-1.5 rounded border border-amber-200/60 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none focus:border-amber-400/60 w-48"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="font-sans text-xs px-3 py-1.5 rounded border border-amber-300/60 dark:border-amber-700/50 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '…' : '订阅'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="font-sans text-xs text-red-400 mt-1">{errMsg}</p>
      )}
    </div>
  )
}

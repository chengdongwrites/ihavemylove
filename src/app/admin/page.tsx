'use client'
import { useState, useEffect, useCallback } from 'react'

interface Comment {
  id: number
  page_slug: string
  name: string
  email: string
  body: string
  approved: boolean
  created_at: string
}

interface BlockedEmail {
  email: string
  blocked_at: string
}

export default function AdminPage() {
  const [token, setToken]       = useState('')
  const [authed, setAuthed]     = useState(false)
  const [authErr, setAuthErr]   = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [blocked, setBlocked]   = useState<BlockedEmail[]>([])
  const [tab, setTab]           = useState<'comments' | 'blocked'>('comments')
  const [loading, setLoading]   = useState(false)

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'x-admin-token': token,
  }), [token])

  const loadComments = useCallback(async () => {
    const res = await fetch('/api/admin?view=comments', { headers: headers() })
    if (!res.ok) { setAuthed(false); setAuthErr(true); return }
    setComments(await res.json())
  }, [headers])

  const loadBlocked = useCallback(async () => {
    const res = await fetch('/api/admin?view=blocked', { headers: headers() })
    if (res.ok) setBlocked(await res.json())
  }, [headers])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/admin?view=comments', {
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
    })
    setLoading(false)
    if (res.ok) {
      setAuthed(true)
      setAuthErr(false)
      setComments(await res.json())
    } else {
      setAuthErr(true)
    }
  }

  useEffect(() => {
    if (!authed) return
    if (tab === 'comments') loadComments()
    else loadBlocked()
  }, [authed, tab, loadComments, loadBlocked])

  async function deleteComment(id: number) {
    if (!confirm('隐藏这条留言？')) return
    await fetch('/api/admin', {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({ action: 'delete_comment', id }),
    })
    loadComments()
  }

  async function blockEmail(email: string) {
    if (!confirm(`屏蔽 ${email}？此操作将隐藏该邮箱的所有留言。`)) return
    await fetch('/api/admin', {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({ action: 'block_email', email }),
    })
    loadComments()
    loadBlocked()
  }

  async function unblockEmail(email: string) {
    await fetch('/api/admin', {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({ action: 'unblock_email', email }),
    })
    loadBlocked()
  }

  const pageLabel = (slug: string) => {
    if (slug === 'home') return '首页'
    if (slug === 'ba')   return '跋'
    if (slug === 'voices') return '文友之声'
    return slug
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <form onSubmit={login} className="w-full max-w-xs space-y-4">
          <h1 className="font-serif text-xl text-center text-ink dark:text-gray-200 mb-6">
            后台管理
          </h1>
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="管理密码"
            className="w-full font-sans text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-accent/40"
          />
          {authErr && (
            <p className="font-sans text-xs text-red-500">密码不正确</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-sans text-sm py-2 rounded bg-accent text-white hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {loading ? '验证中…' : '登录'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-xl text-ink dark:text-gray-200">后台管理</h1>
          <button
            onClick={() => { setAuthed(false); setToken('') }}
            className="font-sans text-xs text-gray-400 hover:text-red-500"
          >
            退出
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-800">
          {(['comments', 'blocked'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-sans text-sm pb-2 px-1 border-b-2 transition-colors ${
                tab === t
                  ? 'border-accent text-accent dark:text-amber-400 dark:border-amber-400'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {t === 'comments' ? `留言 (${comments.length})` : `已屏蔽邮箱 (${blocked.length})`}
            </button>
          ))}
        </div>

        {tab === 'comments' && (
          <div className="space-y-4">
            {comments.length === 0 && (
              <p className="font-sans text-sm text-gray-400">暂无留言</p>
            )}
            {comments.map(c => (
              <div
                key={c.id}
                className={`rounded-lg border p-4 ${
                  c.approved
                    ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                    : 'bg-gray-100 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 opacity-50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-serif text-sm font-medium text-ink dark:text-gray-200">
                        {c.name}
                      </span>
                      <span className="font-sans text-xs text-gray-400">{c.email}</span>
                      <span className="font-sans text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {pageLabel(c.page_slug)}
                      </span>
                      <span className="font-sans text-xs text-gray-400">
                        {new Date(c.created_at).toLocaleString('zh-CN')}
                      </span>
                      {!c.approved && (
                        <span className="font-sans text-xs text-red-400">已隐藏</span>
                      )}
                    </div>
                    <p className="font-sans text-sm text-gray-700 dark:text-gray-400 whitespace-pre-wrap">
                      {c.body}
                    </p>
                  </div>
                  {c.approved && (
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="font-sans text-xs text-red-400 hover:text-red-600 whitespace-nowrap"
                      >
                        隐藏
                      </button>
                      <button
                        onClick={() => blockEmail(c.email)}
                        className="font-sans text-xs text-orange-400 hover:text-orange-600 whitespace-nowrap"
                      >
                        屏蔽邮箱
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'blocked' && (
          <div className="space-y-3">
            {blocked.length === 0 && (
              <p className="font-sans text-sm text-gray-400">无屏蔽邮箱</p>
            )}
            {blocked.map(b => (
              <div
                key={b.email}
                className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3"
              >
                <div>
                  <span className="font-sans text-sm text-ink dark:text-gray-300">{b.email}</span>
                  <span className="font-sans text-xs text-gray-400 ml-3">
                    屏蔽于 {new Date(b.blocked_at).toLocaleString('zh-CN')}
                  </span>
                </div>
                <button
                  onClick={() => unblockEmail(b.email)}
                  className="font-sans text-xs text-green-500 hover:text-green-700"
                >
                  解除屏蔽
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import { useCallback, useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export function useContent(prefix = '') {
  const [map, setMap] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchContent = useCallback(async () => {
    if (!API_BASE) return
    setLoading(true)
    setError('')
    try {
      const url = `${API_BASE}/api/content${prefix ? `?prefix=${encodeURIComponent(prefix)}` : ''}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Gagal memuat konten')
      const data = await res.json()
      const next = {}
      for (const item of data.items || []) next[item.key] = item.value
      setMap(next)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [prefix])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const get = useCallback((key, fallback = '') => {
    return map[key] ?? fallback
  }, [map])

  const set = useCallback(async (key, value) => {
    if (!API_BASE) throw new Error('BACKEND URL belum dikonfigurasi')
    const res = await fetch(`${API_BASE}/api/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    })
    if (!res.ok) throw new Error('Gagal menyimpan konten')
    const doc = await res.json()
    setMap((m) => ({ ...m, [doc.key]: doc.value }))
    return doc
  }, [])

  return { loading, error, get, set, refresh: fetchContent, data: map }
}

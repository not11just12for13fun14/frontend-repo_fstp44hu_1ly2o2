import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MapPin, Home, Building2, LandPlot, Search } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

const typeOptions = [
  { value: '', label: 'Semua Tipe' },
  { value: 'house', label: 'Rumah' },
  { value: 'shophouse', label: 'Ruko/Shophouse' },
  { value: 'kavling', label: 'Kavling' },
]

export default function Properties() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  const [filters, setFilters] = useState({
    type: params.get('type') || '',
    location: params.get('location') || '',
    min_price: params.get('min_price') || '',
    max_price: params.get('max_price') || '',
    bedrooms: params.get('bedrooms') || '',
  })

  const queryString = useMemo(() => {
    const q = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== '' && v !== null && v !== undefined) q.set(k, v)
    })
    return q.toString()
  }, [filters])

  useEffect(() => {
    setParams(new URLSearchParams(queryString))
  }, [queryString, setParams])

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        const url = `${API_BASE}/api/properties?limit=30&${queryString}`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Gagal memuat data')
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [queryString])

  return (
    <div className="pt-28 pb-16 bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">Properti Unggulan</h1>
          <p className="text-gray-600 mt-2">Temukan rumah mewah, shophouse premium, dan kavling strategis sesuai kebutuhan Anda.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm mb-8">
          <form
            onSubmit={(e) => { e.preventDefault() }}
            className="grid grid-cols-1 md:grid-cols-6 gap-4"
          >
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Lokasi</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                placeholder="Jakarta, BSD, Surabaya..."
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Tipe</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {typeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Harga Min (Rp)</label>
              <input
                type="number"
                inputMode="numeric"
                value={filters.min_price}
                onChange={(e) => setFilters((f) => ({ ...f, min_price: e.target.value }))}
                placeholder="1000000000"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Harga Maks (Rp)</label>
              <input
                type="number"
                inputMode="numeric"
                value={filters.max_price}
                onChange={(e) => setFilters((f) => ({ ...f, max_price: e.target.value }))}
                placeholder="5000000000"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Kamar Tidur</label>
              <input
                type="number"
                min="0"
                value={filters.bedrooms}
                onChange={(e) => setFilters((f) => ({ ...f, bedrooms: e.target.value }))}
                placeholder="3"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setFilters({ type: '', location: '', min_price: '', max_price: '', bedrooms: '' })}
                className="w-full rounded-xl bg-gray-900 text-white px-4 py-2 hover:bg-black transition"
              >
                Terapkan Filter
              </button>
            </div>
          </form>
        </div>

        {loading && <div className="text-gray-600">Memuat...</div>}
        {error && <div className="text-red-600">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => (
            <Link key={item.id} to={`/properti/${item.id}`} className="group block rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300" />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <span className="text-sm font-medium text-gray-700">Rp {new Intl.NumberFormat('id-ID').format(item.price)}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" /> {item.location}
                </div>
                <div className="mt-2 text-gray-600 text-sm">
                  {item.bedrooms != null ? `${item.bedrooms} KT` : ''}
                  {item.bathrooms != null ? ` • ${item.bathrooms} KM` : ''}
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-gray-900 font-medium group-hover:gap-3 transition-all">
                  Lihat detail
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!loading && !error && items.length === 0 && (
          <div className="text-gray-600">Tidak ada properti yang cocok dengan filter.</div>
        )}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, ArrowLeft } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function PropertyDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}/api/properties/${id}`)
        if (!res.ok) throw new Error('Gagal memuat detail properti')
        const data = await res.json()
        setItem(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="pt-28 px-6">Memuat...</div>
  if (error) return <div className="pt-28 px-6 text-red-600">{error}</div>
  if (!item) return null

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="mx-auto max-w-6xl px-6">
        <Link to="/properti" className="inline-flex items-center gap-2 text-gray-900 hover:gap-3 transition">
          <ArrowLeft className="w-4 h-4" /> Kembali ke daftar
        </Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{item.title}</h1>
            <div className="mt-2 flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" /> {item.location}
            </div>
            <div className="mt-4 text-2xl font-semibold">Rp {new Intl.NumberFormat('id-ID').format(item.price)}</div>
            <div className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
              {item.description || 'Tidak ada deskripsi.'}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700">
              {item.bedrooms != null && (
                <div className="rounded-xl border border-gray-200 p-3">Kamar Tidur: <b>{item.bedrooms}</b></div>
              )}
              {item.bathrooms != null && (
                <div className="rounded-xl border border-gray-200 p-3">Kamar Mandi: <b>{item.bathrooms}</b></div>
              )}
              {item.building_area_sqm != null && (
                <div className="rounded-xl border border-gray-200 p-3">Luas Bangunan: <b>{item.building_area_sqm} m²</b></div>
              )}
              {item.land_area_sqm != null && (
                <div className="rounded-xl border border-gray-200 p-3">Luas Tanah: <b>{item.land_area_sqm} m²</b></div>
              )}
            </div>

            <a href="#hubungi" className="mt-8 inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-black transition">
              Hubungi Konsultan
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useContent } from '../components/useContent'

const fields = [
  { key: 'homepage.brand', label: 'Nama Brand', placeholder: 'Aurum Estates' },
  { key: 'homepage.nav.koleksi', label: 'Menu: Koleksi', placeholder: 'Koleksi' },
  { key: 'homepage.nav.sorotan', label: 'Menu: Sorotan', placeholder: 'Sorotan' },
  { key: 'homepage.nav.kontak', label: 'Menu: Kontak', placeholder: 'Kontak' },
  { key: 'homepage.hero.kicker', label: 'Hero Kicker', placeholder: 'Mewah • Kontemporer • Urban' },
  { key: 'homepage.hero.title', label: 'Hero Judul', placeholder: 'Tingkatkan Gaya Hidup Anda di Jantung Kota' },
  { key: 'homepage.hero.subtitle', label: 'Hero Subjudul', placeholder: 'Koleksi hunian dan investasi utama...' },
  { key: 'homepage.hero.cta_primary', label: 'CTA Utama', placeholder: 'Jelajahi Koleksi' },
  { key: 'homepage.hero.cta_secondary', label: 'CTA Sekunder', placeholder: 'Jadwalkan Kunjungan' },
  { key: 'homepage.hero.spline_url', label: 'URL Spline Scene (Hero)', placeholder: 'https://prod.spline.design/.../scene.splinecode' },
  { key: 'homepage.collections.title', label: 'Koleksi: Judul', placeholder: 'Hunian & Investasi' },
  { key: 'homepage.collections.subtitle', label: 'Koleksi: Subjudul', placeholder: 'Pilih rumah berkelas...' },
  { key: 'homepage.featured.title', label: 'Unggulan: Judul', placeholder: 'Properti Pilihan' },
  { key: 'homepage.featured.subtitle', label: 'Unggulan: Subjudul', placeholder: 'Sekilas dari koleksi kami...' },
  { key: 'homepage.footer.title', label: 'Footer: Judul', placeholder: 'Jadwalkan private viewing' },
  { key: 'homepage.footer.subtitle', label: 'Footer: Subjudul', placeholder: 'Tim concierge kami akan menyiapkan tur...' },
]

export default function Editor() {
  const { get, set, loading, error } = useContent('homepage.')
  const [values, setValues] = useState({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const v = {}
    for (const f of fields) v[f.key] = get(f.key, '')
    setValues(v)
  }, [get])

  const handleChange = (key, val) => setValues((s) => ({ ...s, [key]: val }))

  const saveAll = async () => {
    setSaving(true)
    setMessage('')
    try {
      for (const f of fields) {
        await set(f.key, values[f.key] ?? '')
      }
      setMessage('Tersimpan!')
    } catch (e) {
      setMessage(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-3xl font-semibold mb-2">Editor Konten</h1>
        <p className="text-gray-600 mb-8">Ubah semua tulisan di beranda dan hero Spline. Simpan untuk langsung terlihat di situs.</p>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="space-y-5">
          {fields.map((f) => (
            <div key={f.key} className="">
              <label className="block text-sm text-gray-600">{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={values[f.key] ?? ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <div className="mt-1 text-xs text-gray-400">Key: {f.key}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3">
          <button onClick={saveAll} disabled={saving} className="rounded-xl bg-gray-900 text-white px-5 py-3 hover:bg-black transition disabled:opacity-60">
            {saving ? 'Menyimpan...' : 'Simpan Semua'}
          </button>
          {message && <div className="text-gray-700">{message}</div>}
        </div>
      </div>
    </div>
  )
}

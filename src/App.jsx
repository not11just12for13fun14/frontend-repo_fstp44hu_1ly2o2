import React from 'react'
import Spline from '@splinetool/react-spline'
import { Home, Building2, MapPin, Phone, ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useContent } from './components/useContent'

function TiltCard({ children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])

  return (
    <motion.div
      className="[transform-style:preserve-3d]"
      style={{ perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        x.set(dx)
        y.set(dy)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      <motion.div style={{ rotateX, rotateY }} className="[transform-style:preserve-3d]">
        {children}
      </motion.div>
    </motion.div>
  )
}

function Navbar() {
  const { get } = useContent('homepage.')
  const brand = get('homepage.brand', 'Aurum Estates')
  return (
    <div className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-lg flex items-center justify-between px-5 py-3">
          <a href="/" className="text-white font-semibold tracking-wide text-lg">{brand}</a>
          <div className="hidden md:flex items-center gap-8 text-white/90">
            <a href="/properti" className="hover:text-white transition">{get('homepage.nav.koleksi', 'Koleksi')}</a>
            <a href="#highlights" className="hover:text-white transition">{get('homepage.nav.sorotan', 'Sorotan')}</a>
            <a href="#contact" className="hover:text-white transition">{get('homepage.nav.kontak', 'Kontak')}</a>
            <a href="/edit" className="inline-flex items-center gap-2 bg-white text-gray-900 font-medium px-4 py-2 rounded-xl hover:bg-white/90 transition">
              <Phone className="w-4 h-4" /> Edit Teks
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const { get } = useContent('homepage.')
  const kicker = get('homepage.hero.kicker', 'Mewah • Kontemporer • Urban')
  const title = get('homepage.hero.title', 'Tingkatkan Gaya Hidup Anda di Jantung Kota')
  const subtitle = get('homepage.hero.subtitle', 'Koleksi hunian dan investasi utama: rumah mewah, shophouse premium, serta kavling strategis — dirancang untuk gaya hidup modern.')
  const ctaPrimary = get('homepage.hero.cta_primary', 'Jelajahi Koleksi')
  const ctaSecondary = get('homepage.hero.cta_secondary', 'Jadwalkan Kunjungan')
  const splineUrl = get('homepage.hero.spline_url', 'https://prod.spline.design/1VHYoewWfi45VYZ5/scene.splinecode')

  return (
    <section className="relative h-[92vh] w-full overflow-hidden" aria-label="Luxury Real Estate Hero">
      <div className="absolute inset-0">
        <Spline scene={splineUrl} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div className="text-white max-w-3xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="uppercase tracking-[0.3em] text-white/70 text-xs md:text-sm mb-4">{kicker}</p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight md:leading-[1.1]">
              {title}
            </h1>
            <p className="mt-5 text-white/80 text-base md:text-lg max-w-2xl">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/properti" className="pointer-events-auto inline-flex items-center gap-2 bg-white text-gray-900 font-medium px-5 py-3 rounded-xl hover:bg-white/90 transition shadow-lg">
                {ctaPrimary} <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="pointer-events-auto inline-flex items-center gap-2 bg-transparent text-white border border-white/40 px-5 py-3 rounded-xl hover:bg-white/10 transition">
                {ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CollectionCard({ Icon, title, description, badge, accent }) {
  return (
    <TiltCard>
      <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-black/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-10 transition`} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-gray-900 group-hover:scale-105 transition">
              <Icon className="w-6 h-6" />
            </div>
            {badge && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-black text-white">{badge}</span>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className="px-6 pb-6">
          <a href="/properti" className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all">
            Lihat detail <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </TiltCard>
  )
}

function Collections() {
  const { get } = useContent('homepage.')
  const sectionTitle = get('homepage.collections.title', 'Hunian & Investasi')
  const sectionSubtitle = get('homepage.collections.subtitle', 'Pilih rumah berkelas, shophouse bernilai sewa, dan kavling strategis di lokasi prima.')
  return (
    <section id="collections" className="relative py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 md:mb-16">
          <p className="uppercase tracking-[0.25em] text-gray-500 text-xs md:text-sm">Koleksi Kami</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3">{sectionTitle}</h2>
          <p className="text-gray-600 mt-3 max-w-2xl">{sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <CollectionCard
            Icon={Home}
            title="Rumah Mewah"
            description="Desain arsitektural, layout lapang, fasilitas privat, dan finishing terkurasi."
            badge="Baru"
            accent="from-emerald-400/60 to-emerald-600/60"
          />
          <CollectionCard
            Icon={Building2}
            title="Shophouse Premium"
            description="Unit komersial-residensial di distrik hidup dengan traffic tinggi."
            badge="Favorit"
            accent="from-amber-400/60 to-amber-600/60"
          />
          <CollectionCard
            Icon={MapPin}
            title="Kavling (Tanah)"
            description="Lahan freehold strategis untuk rumah impian atau pengembangan masa depan."
            badge="Terbatas"
            accent="from-sky-400/60 to-sky-600/60"
          />
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section id="highlights" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: 'Lokasi Premium', value: '30+' },
            { label: 'Listing Eksklusif', value: '120+' },
            { label: 'Kepuasan Klien', value: '98%' },
            { label: 'Pengalaman', value: '15+' },
          ].map((item) => (
            <TiltCard key={item.label}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-3xl font-semibold text-gray-900">{item.value}</div>
                <div className="mt-2 text-gray-600">{item.label}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function Featured() {
  const { get } = useContent('homepage.')
  const title = get('homepage.featured.title', 'Properti Pilihan')
  const subtitle = get('homepage.featured.subtitle', 'Sekilas dari koleksi kami. Hubungi tim untuk katalog pribadi lengkap.')
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 md:mb-16">
          <p className="uppercase tracking-[0.25em] text-gray-500 text-xs md:text-sm">Pilihan Unggulan</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3">{title}</h2>
          <p className="text-gray-600 mt-3 max-w-2xl">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1,2,3].map((i) => (
            <TiltCard key={i}>
              <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Penthouse {i}</h3>
                    <span className="text-sm font-medium text-gray-700">Mulai $ {i} .2M</span>
                  </div>
                  <p className="text-gray-600 mt-2">Pemandangan skyline, teras privat, dan interior kustom.</p>
                  <button className="mt-4 inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all">
                    Minta brosur <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { get } = useContent('homepage.')
  const title = get('homepage.footer.title', 'Jadwalkan private viewing')
  const subtitle = get('homepage.footer.subtitle', 'Tim concierge kami akan menyiapkan tur sesuai preferensi Anda.')
  const brand = get('homepage.brand', 'Aurum Estates')
  return (
    <footer id="contact" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl p-8 md:p-12 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
                <p className="text-white/70 mt-2">{subtitle}</p>
              </div>
              <div className="md:justify-self-end">
                <a href="tel:+1234567890" className="inline-flex items-center gap-2 bg-white text-gray-900 font-medium px-5 py-3 rounded-xl hover:bg-white/90 transition">
                  <Phone className="w-4 h-4" /> +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-white font-semibold">{brand}</div>
              <div className="text-white/60 text-sm">© {new Date().getFullYear()} {brand}. Seluruh hak cipta.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Collections />
      <Highlights />
      <Featured />
      <Footer />
    </div>
  )
}

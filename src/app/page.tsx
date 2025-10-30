'use client'

import LayoutWrapper from '@/components/templates/web/v1/LayoutWrapper'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, FileDown } from 'lucide-react'
import api from '@/services/api'

export default function Home() {
  const [headlines, setHeadlines] = useState<any[]>([])
  const [pengumuman, setPengumuman] = useState<any[]>([]) // ✅ Tambahan state pengumuman
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [carouselHeight, setCarouselHeight] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // ✅ Ambil data headline dari backend
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await api.get('/berita/headline', {
          headers: { 'Cache-Control': 'no-store' },
        })
        if (Array.isArray(res.data)) setHeadlines(res.data)
      } catch (err) {
        console.error('❌ Gagal memuat headline:', err)
      }
    }
    fetchHeadlines()
  }, [])

  // ✅ Ambil data pengumuman dari backend
  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const res = await api.get('/download/jenis/pengumuman', {
          headers: { 'Cache-Control': 'no-store' },
        })
        if (Array.isArray(res.data)) setPengumuman(res.data)
      } catch (err) {
        console.error('❌ Gagal memuat pengumuman:', err)
      }
    }
    fetchPengumuman()
  }, [])

  // ✅ Carousel otomatis berganti
  const nextSlide = () =>
    setCurrent((prev) => (headlines.length ? (prev + 1) % headlines.length : 0))
  const prevSlide = () =>
    setCurrent((prev) =>
      headlines.length ? (prev - 1 + headlines.length) % headlines.length : 0,
    )
  const goToSlide = (index: number) => setCurrent(index)

  useEffect(() => {
    if (!isPaused && headlines.length > 0)
      intervalRef.current = setInterval(nextSlide, 7000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, headlines])

  // ✅ Menyesuaikan tinggi pengumuman dengan tinggi carousel
  useEffect(() => {
    function updateHeight() {
      if (carouselRef.current) {
        setCarouselHeight(carouselRef.current.offsetHeight)
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* ===== HEADLINE + PENGUMUMAN ===== */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* ===== Carousel Headline (tidak diubah) ===== */}
          <div
            ref={carouselRef}
            className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-200 shadow-lg md:col-span-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {headlines.length === 0 ? (
              <div className="flex h-full items-center justify-center text-gray-500">
                Memuat headline...
              </div>
            ) : (
              headlines.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                    index === current ? 'z-10 opacity-100' : 'z-0 opacity-0'
                  }`}
                >
                  {/* Efek Ken Burns */}
                  <div
                    className={`absolute inset-0 transform transition-transform duration-[7000ms] ${
                      index === current ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/foto_berita/${item.gambar}`}
                      alt={item.judul}
                      fill
                      priority
                      className="h-full w-full object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Overlay teks */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-white transition-all duration-700 ${
                      index === current
                        ? 'animate-fadeInUp'
                        : 'translate-y-6 opacity-0'
                    }`}
                  >
                    <p className="mb-1 text-xs opacity-90 md:text-sm">
                      {new Date(item.tanggal).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <h2 className="mb-2 text-base font-semibold leading-snug drop-shadow-lg md:text-xl">
                      {item.judul}
                    </h2>
                    <a
                      href={`/berita/${item.judul_seo}`}
                      className="w-fit rounded-md bg-yellow-500 px-3 py-2 text-xs font-medium transition hover:bg-yellow-400 md:text-sm"
                    >
                      Baca Selengkapnya →
                    </a>
                  </div>
                </div>
              ))
            )}

            {/* Tombol Navigasi */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-transform hover:scale-110 hover:bg-black/60"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-transform hover:scale-110 hover:bg-black/60"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dot Navigasi */}
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
              {headlines.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'scale-125 bg-yellow-400 shadow-md'
                      : 'bg-white/60 hover:bg-white/90'
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* ===== Pengumuman dari backend ===== */}
          <div
            className="mobile-scroll overflow-y-auto rounded-sm bg-teal-900 p-4 shadow-lg"
            style={{
              height: carouselHeight ? `${carouselHeight}px` : 'auto',
            }}
          >
            <h3 className="mb-3 text-lg font-semibold text-yellow-400">
              Pengumuman Terbaru
            </h3>

            {pengumuman.length === 0 ? (
              <div className="text-white text-sm italic">
                Memuat pengumuman...
              </div>
            ) : (
              <div className="space-y-3">
                {pengumuman.map((p) => (
                  <a
                    key={p.id}
                    href={`${process.env.NEXT_PUBLIC_API_URL}/${p.path_file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded border-b border-teal-700 px-2 pb-2 transition hover:bg-teal-600"
                  >
                    <p className="text-sm font-medium text-yellow-400">
                      {p.judul}
                    </p>
                    <p className="text-xs text-white">
                      {new Date(p.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===== Sambutan ===== */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-teal-800">
            Selamat Datang di Portal BKPSDM Bone Bolango
          </h2>
          <p className="text-gray-700">
            Website resmi Badan Kepegawaian dan Pengembangan SDM Kabupaten Bone
            Bolango, sebagai pusat informasi kepegawaian, pelatihan, dan
            pengumuman resmi ASN.
          </p>
        </section>
      </div>

      {/* ===== Animasi ===== */}
      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @media (max-width: 768px) {
          .mobile-scroll {
            max-height: 500px !important;
            overflow-y: auto;
          }
        }
      `}</style>
    </LayoutWrapper>
  )
}

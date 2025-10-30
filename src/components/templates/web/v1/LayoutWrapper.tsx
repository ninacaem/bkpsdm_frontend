'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import Header from './Header'
import SidebarLeft from './SidebarLeft'
import Footer from './Footer'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const images = [
    '/images/banner/banner0.jpg',
    '/images/banner/banner1.jpg',
    '/images/banner/banner2.jpg',
    '/images/banner/banner3.jpg',
  ]

  const [current, setCurrent] = useState(0)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length)
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ✅ Header */}
      <Header onMenuClick={() => setMobileSidebarOpen(true)} />

{/* ✅ Banner */}
<div className="relative mt-2 w-full overflow-hidden rounded-lg shadow-md">
  {/* Gunakan container dengan aspect ratio 4:1 */}
  <div className="relative w-full aspect-[4/1]">
    <img
      src={images[current]}
      alt={`Banner ${current + 1}`}
      className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
    />
  </div>

  {/* Tombol navigasi kiri */}
  <button
    onClick={prevSlide}
    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-teal-600/70 p-2 text-white shadow hover:bg-teal-700"
  >
    <ChevronLeft size={20} />
  </button>

  {/* Tombol navigasi kanan */}
  <button
    onClick={nextSlide}
    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-teal-600/70 p-2 text-white shadow hover:bg-teal-700"
  >
    <ChevronRight size={20} />
  </button>

  {/* Indikator */}
  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
    {images.map((_, idx) => (
      <span
        key={idx}
        className={`h-3 w-3 rounded-full transition-all ${
          idx === current ? 'bg-teal-600' : 'bg-teal-200'
        }`}
      />
    ))}
  </div>
</div>


      {/* ✅ Wrapper utama: Sidebar + Konten */}
      <div className="relative mt-4 flex flex-col gap-6 px-4 md:flex-row">
        {/* Sidebar kiri */}
        <div className="md:w-1/4">
          <SidebarLeft
            mobileOpen={mobileSidebarOpen}
            setMobileOpen={setMobileSidebarOpen}
          />
        </div>

        {/* Konten kanan */}
        <div className="flex flex-col gap-4 md:w-3/4">
          {/* 🔔 Flash Info */}
          <div className="overflow-hidden rounded-lg border border-teal-300 bg-teal-100 p-2">
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'block',
                animation: 'scroll 15s linear infinite',
              }}
            >
              <span>
                🔔 Info Terkini: Pelaporan Data Pegawai bulan Oktober sudah
                dibuka. | Diklat Kepemimpinan dimulai tanggal 21 Oktober 2025. |
                Update sistem presensi versi terbaru sudah tersedia!
              </span>
            </div>

            <style jsx>{`
              @keyframes scroll {
                from {
                  transform: translateX(100%);
                }
                to {
                  transform: translateX(-100%);
                }
              }
            `}</style>
          </div>

          {/* Konten dinamis (children) */}
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

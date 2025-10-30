'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const headlines = [
  {
    title: 'ASN Berprestasi Diberikan Penghargaan Langsung oleh Bupati',
    img: 'https://picsum.photos/1200/600',
    date: '5 Oktober 2025',
  },
  {
    title: 'Upacara HUT Kabupaten Bone Bolango ke-22',
    img: 'https://picsum.photos/1200/600',
    date: '3 Oktober 2025',
  },
]

const pengumuman = [
  { title: 'Pengumuman 1', date: '5 Oktober 2025' },
  { title: 'Pengumuman 2', date: '4 Oktober 2025' },
  { title: 'Pengumuman 3', date: '3 Oktober 2025' },
  { title: 'Pengumuman 4', date: '2 Oktober 2025' },
  { title: 'Pengumuman 5', date: '1 Oktober 2025' },
]

export default function HeadlineWithPengumuman() {
  return (
    <div className="mx-auto mt-6 max-w-6xl">
      {/* ===== Card Utama: Headline + Pengumuman ===== */}
      <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg md:flex-row">
        {/* ===== Carousel (2/3) ===== */}
        <div className="w-full md:w-2/3">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            loop
            className="h-full w-full"
          >
            {headlines.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  className="relative w-full"
                  style={{ aspectRatio: '16/9' }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 p-6 text-white">
                    <p className="text-sm text-yellow-300">{item.date}</p>
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {item.title}
                    </h3>
                    <button className="mt-3 rounded bg-yellow-400 px-4 py-1 text-sm text-black hover:bg-yellow-500">
                      Baca Selengkapnya →
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ===== Pengumuman (1/3) ===== */}
        <div className="w-full border-l border-gray-200 md:w-1/3">
          <div className="flex h-full max-h-[100%] flex-col overflow-y-auto p-4">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Pengumuman Terbaru
            </h3>
            <ul className="space-y-3">
              {pengumuman.map((item, i) => (
                <li key={i} className="border-b pb-2">
                  <p className="text-sm font-medium text-gray-700">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

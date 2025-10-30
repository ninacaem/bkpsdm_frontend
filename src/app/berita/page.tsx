'use client'

import { useEffect, useState } from 'react'
import LayoutWrapper from '@/components/templates/web/v1/LayoutWrapper'
import Link from 'next/link'
import Image from 'next/image'
import api from '@/services/api'

export default function BeritaPage() {
  const [berita, setBerita] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/berita')
        setBerita(res.data)
      } catch (err) {
        console.error('❌ Gagal memuat berita:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <LayoutWrapper>
      <div className="space-y-4 rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Berita Terkini</h1>
        {loading ? (
          <p className="text-gray-500">Memuat berita...</p>
        ) : berita.length === 0 ? (
          <p className="text-gray-500">Belum ada berita tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {berita.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.judul_seo}`}
                className="group overflow-hidden rounded-lg border bg-white shadow hover:shadow-lg transition"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/foto_berita/${item.gambar}`}
                    alt={item.judul}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 group-hover:text-teal-700 line-clamp-2">
                    {item.judul}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(item.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                    {item.sub_judul || 'Selengkapnya...'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}

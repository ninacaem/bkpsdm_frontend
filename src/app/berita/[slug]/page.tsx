'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import LayoutWrapper from '@/components/templates/web/v1/LayoutWrapper'
import Image from 'next/image'
import api from '@/services/api'

export default function BeritaDetailPage() {
  const { slug } = useParams()
  const [berita, setBerita] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/berita/slug/${slug}`)
        setBerita(res.data)
      } catch (err) {
        console.error('❌ Gagal memuat detail berita:', err)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchData()
  }, [slug])

  if (loading) {
    return (
      <LayoutWrapper>
        <p className="text-gray-500">Memuat berita...</p>
      </LayoutWrapper>
    )
  }

  if (!berita) {
    return (
      <LayoutWrapper>
        <p className="text-red-600">Berita tidak ditemukan.</p>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <article className="space-y-6 rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800">{berita.judul}</h1>
        <p className="text-sm text-gray-500">
          {new Date(berita.tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}{' '}
          • oleh {berita.username}
        </p>

        {berita.gambar && (
          <div className="relative aspect-video overflow-hidden rounded-md">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/foto_berita/${berita.gambar}`}
              alt={berita.judul}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div
          className="prose max-w-none prose-img:rounded-md prose-a:text-teal-700 hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: berita.isi_berita }}
        />

        {berita.kategori && (
          <p className="mt-6 text-sm text-gray-600">
            Kategori:{' '}
            <span className="font-medium text-teal-700">
              {berita.kategori.nama}
            </span>
          </p>
        )}
      </article>
    </LayoutWrapper>
  )
}

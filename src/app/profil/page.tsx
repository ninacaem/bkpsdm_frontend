'use client'

import LayoutWrapper from '@/components/templates/web/v1/LayoutWrapper'

export default function ProfilPage() {
  return (
    <LayoutWrapper>
      <div className="space-y-4 rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800">
          Profil BKPSDM Bone Bolango
        </h1>
        <p className="text-gray-600">
          Badan Kepegawaian dan Pengembangan Sumber Daya Manusia (BKPSDM) Bone
          Bolango bertugas untuk mengelola data kepegawaian, pelatihan, dan
          pengembangan ASN di Kabupaten Bone Bolango.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded bg-gray-50 p-4 shadow">
            <h3 className="font-semibold">Alamat</h3>
            <p>Jl. Raya Bone Bolango No. 123, Gorontalo</p>
          </div>
          <div className="rounded bg-gray-50 p-4 shadow">
            <h3 className="font-semibold">Kontak</h3>
            <p>Email: info@bkpsdm.go.id</p>
            <p>Telp: (0434) 123456</p>
          </div>
        </div>

        <div className="rounded bg-gray-50 p-4 shadow">
          <h3 className="font-semibold">Visi & Misi</h3>
          <p>
            <strong>Visi:</strong> Terwujudnya ASN yang profesional dan
            berintegritas.
          </p>
          <p>
            <strong>Misi:</strong> Meningkatkan kompetensi, kualitas pelayanan,
            dan pengembangan SDM.
          </p>
        </div>
      </div>
    </LayoutWrapper>
  )
}

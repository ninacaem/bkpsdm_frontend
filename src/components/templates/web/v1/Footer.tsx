import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-8 bg-teal-600 text-sm text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h4 className="mb-2 font-semibold">Alamat</h4>
          <p>Jl. Prof. Dr. Aloei Saboe No.12, Bone Bolango</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Kontak</h4>
          <p>Email: bkpsdm@bonebolangokab.go.id</p>
          <p>Telepon: (0435) 123456</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Link Cepat</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/layanan" className="hover:underline">
                Layanan
              </Link>
            </li>
            <li>
              <Link href="/pengumuman" className="hover:underline">
                Pengumuman
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-teal-700 py-3 text-center text-xs">
        © {new Date().getFullYear()} BKPSDM Bone Bolango. All Rights Reserved.
      </div>
    </footer>
  )
}

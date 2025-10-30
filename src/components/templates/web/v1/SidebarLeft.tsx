'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { ChevronDown, ChevronRight, X } from 'lucide-react'

export default function SidebarLeft({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const toggleMenu = (menuName: string) =>
    setOpenMenu(openMenu === menuName ? null : menuName)

  return (
    <>
      {/* 🖥️ Sidebar Desktop */}
      <aside className="hidden w-64 space-y-4 self-start rounded-lg border bg-white p-4 shadow-md md:block">
        <div className="flex items-center justify-between rounded-md border-b bg-gray-100 p-3">
          <span className="text-sm font-semibold text-gray-700">
            Menu Utama
          </span>
        </div>

        <SidebarContent toggleMenu={toggleMenu} openMenu={openMenu} />
      </aside>

      {/* 📱 Sidebar Mobile (overlay) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 md:hidden">
          <div className="absolute left-0 top-0 h-full w-64 overflow-y-auto bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between border-b pb-2">
              <span className="text-sm font-semibold">Menu Utama</span>
              <button onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <SidebarContent toggleMenu={toggleMenu} openMenu={openMenu} />
          </div>
        </div>
      )}
    </>
  )
}

/* 🧩 Isi Menu Sidebar */
function SidebarContent({
  toggleMenu,
  openMenu,
}: {
  toggleMenu?: (menuName: string) => void
  openMenu?: string | null
}) {
  return (
    <nav className="flex flex-col space-y-2 text-sm text-gray-700">
      <Link
        href="/"
        className="rounded-md px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
      >
        Beranda
      </Link>

      <Link
        href="/berita"
        className="rounded-md px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
      >
        Berita
      </Link>

      {/* Layanan Kepegawaian */}
      <div>
        <button
          onClick={() => toggleMenu?.('layanan')}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
        >
          <span>Layanan Kepegawaian</span>
          {openMenu === 'layanan' ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
        {openMenu === 'layanan' && (
          <div className="ml-4 mt-1 flex flex-col space-y-1 border-l border-gray-200 pl-3">
            <Link href="https://i-simpeg.bonebolangokab.go.id/" target="blank" className="hover:text-teal-700">
              Integrated Simpeg
            </Link>
            <Link href="https://asndigital.bkn.go.id/" target="blank" className="hover:text-teal-700">
              ASN Digital
            </Link>
            <Link href="#" className="hover:text-teal-700">
              Lentera ASN
            </Link>
          </div>
        )}
      </div>

      {/* Informasi Kepegawaian */}
      <div>
        <button
          onClick={() => toggleMenu?.('informasi')}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
        >
          <span>Informasi Kepegawaian</span>
          {openMenu === 'informasi' ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
        {openMenu === 'informasi' && (
          <div className="ml-4 mt-1 flex flex-col space-y-1 border-l border-gray-200 pl-3">
            <Link href="/download/Pengumuman" className="hover:text-teal-700">
              Pengumuman
            </Link>
			<Link href="/download/peraturan" className="hover:text-teal-700">
              Peraturan
            </Link>
            <Link href="/informasi/statistik" className="hover:text-teal-700">
              ASN dalam Angka
            </Link>
          </div>
        )}
      </div>

      <Link
        href="/profil"
        className="rounded-md px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
      >
        Profil
      </Link>

      <Link
        href="/kontak"
        className="rounded-md px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
      >
        Kontak
      </Link>
    </nav>
  )
}

'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-teal-600 text-white shadow-md">
      <div className="flex flex-col space-y-2 p-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        {/* 🔷 Logo + Tagline */}
        <div className="flex w-full items-center justify-between lg:w-auto">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo_bkpsdm.png"
              alt="Logo BKPSDM"
              width={300}
              height={50}
              className="object-contain"
            />
            {/* Tagline tampil mulai md */}
            <span className="hidden text-sm font-medium italic tracking-wide md:block">
              “ASN BerTALENTA, Bone Bolango JUARA...!!!”
            </span>
          </div>

          {/* 🔷 Tombol burger hanya tampil di mobile */}
          <button
            className="focus:outline-none lg:hidden"
            onClick={onMenuClick}
            aria-label="Buka menu navigasi"
          >
            <Menu size={26} />
          </button>
        </div>

        {/* 🔷 Navbar (hanya tampil di desktop) */}
        <nav className="hidden items-center space-x-6 lg:flex">
          <Link href="/" className="font-medium hover:text-teal-200">
            Home
          </Link>
          <Link href="/profil" className="font-medium hover:text-teal-200">
            Profil
          </Link>
          <Link href="/kontak" className="font-medium hover:text-teal-200">
            Kontak
          </Link>

          {/* 🔷 Search Box */}
          <form className="ml-4 flex items-center overflow-hidden rounded-full bg-white shadow-inner">
            <input
              type="text"
              placeholder="Cari..."
              className="w-40 px-3 py-1 text-sm text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-teal-500 px-3 py-1 text-sm font-semibold text-white hover:bg-teal-600"
            >
              🔍
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}

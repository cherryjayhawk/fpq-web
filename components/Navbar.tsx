'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lusitana } from 'next/font/google'
import ButtonDonasi from './ButtonDonasi'

const lusitana = Lusitana({
    subsets: ['latin'],
    weight: ['400']
})

function Navbar() {
  const path = usePathname()

  return (
    <div className='flex justify-between items-baseline w-full max-w-7xl px-4 py-6 mx-auto bg-sky-100'>
        <h1 className={`${lusitana.className} text-2xl text-cyan-900`}>PELAYAN <span className='text-cyan-400'>QURAN</span></h1>
        <div className='flex items-center h-6 gap-4'>
            <Link href={'/'} className={`${path === '/' ? 'text-cyan-400' : 'text-gray-700'}` + ' px-4 py-2 border-2 border-transparent hover:text-cyan-400 font-bold'}>Beranda</Link>
            <Link href={'/galeri'}  className={`${path === '/galeri' ? 'text-cyan-400' : 'text-gray-700'}` + ' px-4 py-2 border-2 border-transparent hover:text-cyan-400 font-bold'}>Galeri</Link>
            <Link href={'/tentang-kami'}  className={`${path === '/tentang-kami' ? 'text-cyan-400' : 'text-gray-700'}` + ' px-4 py-2 border-2 border-transparent hover:text-cyan-400 font-bold mr-2'}>Tentang Kami</Link>
            <ButtonDonasi/>
        </div>
    </div>
  )
}

export default Navbar
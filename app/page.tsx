import Image from 'next/image'
import Navbar from '@/components/Navbar'
import LandingPage from '@/components/LandingPage'
import PenyaluranDonasi from '@/components/PenyaluranDonasi'
import Testimonial from '@/components/Testimonial'
import SocialMedia from '@/components/SocialMedia'

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <PenyaluranDonasi />
      <Testimonial />
      <SocialMedia />
    </>
  )
}

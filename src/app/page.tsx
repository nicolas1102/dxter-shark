import Image from 'next/image'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { HomeCarousel } from '@/components/HomeCarousel'

export default function Home() {
  return (
    <div className='mx-full text-center flex flex-col items-center'>
      <HomeCarousel />
    </div>
  )
}

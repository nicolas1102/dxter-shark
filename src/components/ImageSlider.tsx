import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageSliderProps {
  urls: string[]
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null)

  const [activeIndex, setActiveIndex] = useState(0)

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  })

  useEffect(() => {
    swiper?.on(
      'slideChange',
      // this is no reactive, we cannot trust in it
      ({ activeIndex }) => {
        setActiveIndex(activeIndex)
        setSlideConfig({
          isBeginning: activeIndex === 0,
          isEnd: activeIndex === (urls.length ?? 0) - 1,
        })
      }
    )
  }, [swiper, urls])

  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-500'

  const inactiveStyles = 'hidden text-gray-400'

  return (
    <div className='group relative bg-secondary h-96 w-full overflow-hidden'>
      <div className='absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition'>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slideNext()
          }}
          className={cn(activeStyles, 'right-3 transition', {
            [inactiveStyles]: slideConfig.isEnd,
            'hover:bg-primary-300 text-primary-800 opacity-100':
              !slideConfig.isEnd,
          })}
          aria-label='next image'
        >
          <ChevronRight className='h-4 w-4 text-zinc-700' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slidePrev()
          }}
          className={cn(activeStyles, 'left-3 transition', {
            [inactiveStyles]: slideConfig.isBeginning,
            'hover:bg-primary-300 text-primary-800 opacity-100':
              !slideConfig.isBeginning,
          })}
          aria-label='previous image'
        >
          <ChevronLeft className='h-4 w-4 text-zinc-700' />
        </button>
      </div>

      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination]}
        className='h-full w-full'
        pagination={{
          renderBullet: (_, className) => {
            return `<span class='rounded-full transition ${className}'></span>`
          },
        }}
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className='-z-10 relative h-full w-full'>
            <Image
              fill
              // starts loading sooner
              loading='eager'
              src={url}
              alt='Product Image'
              className='-z-10 h-full object-cover object-center'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSlider

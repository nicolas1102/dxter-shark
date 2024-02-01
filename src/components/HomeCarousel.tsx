'use client'

import { HOME_CAROUSEL } from '@/config/const'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Link from 'next/link'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from './ui/button'
import { formatToUpperCase } from '@/lib/utils'

export function HomeCarousel() {
  return (
    <Carousel
      className='w-full flex flex-col mb-20 mt-3'
      opts={{
        align: 'center',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
    >
      <CarouselContent className=''>
        {HOME_CAROUSEL.map((item) => (
          <CarouselItem
            key={item.about}
            className='md:basis-1/2 lg:basis-10/12 '
          >
            <div className='p-3 md:p-1'>
              <Card className='overflow-hidden'>
                <CardContent className='flex items-center justify-center p-6 h-96 md:h-[600px] relative'>
                  <Image
                    src={item.imageSrc}
                    alt={item.about}
                    fill
                    className='object-cover object-center'
                    priority
                    autoSave='true'
                  />
                  <Link href={item.href} className='z-50'>
                    <Button className='mt-40 md:mt-64'>
                      <strong className='tracking-widest font-light dark:font-semibold'>
                        {formatToUpperCase(item.buttonDescription)}
                      </strong>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}

import ProductReel from '@/components/ProductReel'
import { HomeCarousel } from '@/components/HomeCarousel'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function Home() {
  return (
    <div className='mx-full text-center flex flex-col items-center'>
      <HomeCarousel />
      <MaxWidthWrapper>
        <ProductReel
          query={{ sort: 'desc', limit: 4 }}
          title='Brand new'
          href='/products?sort=recent'
        />
      </MaxWidthWrapper>
    </div>
  )
}

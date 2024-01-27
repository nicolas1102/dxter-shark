import type { ImageInterface, Featured } from '@/types'

export const ANNOUNCEMENT_BAR = 'FREE SHIPPING FOR ALL U.S ORDERS OVER $75'

export const PRODUCT_CATEGORIES: {
  title: string
  value: string
  href: string
  image: ImageInterface
  featured: Featured[]
}[] = [
  {
    title: 'For Him',
    value: 'for_him' as const,
    href: '#',
    image: {
      imageSrc: '/nav-bar/for-him.webp',
      alt: 'for him',
    },
    featured: [
      {
        title: 'All Products',
        href: '#',
      },
      {
        title: 'Tanks',
        href: '#',
      },
      {
        title: 'Shirts',
        href: '#',
      },
      {
        title: 'Shorts',
        href: '#',
      },
      {
        title: 'Joggers',
        href: '#',
      },
    ],
  },
  {
    title: 'For Her',
    value: 'for_her' as const,
    href: '#',
    image: {
      imageSrc: '/nav-bar/for-her.webp',
      alt: 'for her',
    },
    featured: [
      {
        title: 'All Products',
        href: '#',
      },
      {
        title: 'Bras',
        href: '#',
      },
      {
        title: 'Tops',
        href: '#',
      },
      {
        title: 'Shorts',
        href: '#',
      },
      {
        title: 'Leggins',
        href: '#',
      },
    ],
  },
]

export const HOME_CAROUSEL = [
  {
    about: 'Youngla for her',
    href: '#',
    imageSrc: '/home-carousel/YFH_Jan-18th_2024_1400x.webp',
    buttonDescription: 'Shop Now'
  },
  {
    about: 'Youngla Coming Soon',
    href: '#',
    imageSrc: '/home-carousel/01.30.24-CSoon_Desktop_1400x.webp',
    buttonDescription: 'Coming Soon'
  },
  {
    about: 'Restock',
    href: '#',
    imageSrc: '/home-carousel/YFH_23th_Restock_Desktop-2_1400x.webp',
    buttonDescription: 'Shop Now'
  },
];
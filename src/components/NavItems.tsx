import Image from 'next/image'
import Link from 'next/link'
import NavItem from './NavItem'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { PRODUCT_CATEGORIES } from '@/config'
import React from 'react'
import { Featured } from '@/types'

const NavItems = () => {
  return (
    <NavigationMenuList>
      {PRODUCT_CATEGORIES.map((category) => (
        <NavigationMenuItem key={category.title}>
          <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-x-3 gap-y-2 p-7 md:w-[500px] md:grid-cols-2 lg:w-[700px]'>
              <li className='row-span-5'>
                <NavigationMenuLink asChild>
                  <Link href={category.href}>
                    <div className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md relative overflow-hidden'>
                      <Image
                        src={category.image.imageSrc}
                        fill
                        alt={category.image.alt}
                        className='object-cover object-center'
                        sizes='300'
                      />
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              {category.featured.map((item: Featured) => (
                <NavItem key={item.title} title={item.title} href={item.href} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  )
}

export default NavItems

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
import { PRODUCT_CATEGORIES } from '@/config/const'
import React from 'react'
import { Featured } from '@/types'
import { formatToUpperCase } from '@/lib/utils'

const NavItems = () => {
  return (
    <NavigationMenuList className='flex justify-start gap-x-1'>
      {PRODUCT_CATEGORIES.map((category) => (
        <NavigationMenuItem
          key={category.title}
          className=''
        >
          <NavigationMenuTrigger className='tracking-widest'>{formatToUpperCase(category.title)}</NavigationMenuTrigger>
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

'use client'

import React from 'react'
import NavItems from './NavItems'
import ModeToggle from './ModeToggle'
import Cart from './Cart'
import Link from 'next/link'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { ANNOUNCEMENT_BAR } from '@/config'

const Navbar = () => {
  const user = null
  return (
    <div className='sticky z-50 top-0 inset-x-0 items-center justify-center w-full'>
      {/* TODO: mobile nav */}

      <div className='w-full text-center p-3 bg-primary dark:bg-secondary'>
        <p className='text-secondary dark:text-primary text-sm font-light dark:font-medium tracking-widest'>
          {ANNOUNCEMENT_BAR}
        </p>
      </div>
      <NavigationMenu className='min-w-full p-3 gap-3 flex justify-between backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 '>
        <div className='w-1/3'>
          <NavItems />
        </div>
        <div className='w-1/3'>
          <Link
            href='/'
            color='black'
            className=' text-3xl font-extrabold tracking-widest text-primary sm:text-4xl dark:text-secondary '
          >
            <p className='text-center'>YOUNGLA</p>
          </Link>
        </div>
        <div className='gap-x-2 flex flex-row items-center justify-end w-1/3'>
          <div>
            <p className='text-xs tracking-widest px-2'>QUESTIONS? (818) 206-8764</p>
          </div>
          <ModeToggle />
          <Cart />
          <ModeToggle />
        </div>
      </NavigationMenu>
    </div>
  )
}

export default Navbar

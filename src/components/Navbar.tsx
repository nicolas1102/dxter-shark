'use client'

import React from 'react'
import NavItems from './NavItems'
import ModeToggle from './ModeToggle'
import Cart from './Cart'
import Link from 'next/link'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { ANNOUNCEMENT_BAR, NAME_PAGE, QUESTIONS_NUMBER } from '@/config/const'
import Profile from './Profile'

const Navbar = () => {
  const user = null
  return (
    <div className='sticky z-50 top-0 inset-x-0 items-center justify-center w-full'>
      {/* TODO: mobile nav */}

      <div className='w-full text-center p-3 bg-primary'>
        <p className='text-secondary text-sm font-light dark:font-medium tracking-widest'>
          {ANNOUNCEMENT_BAR}
        </p>
      </div>
      <NavigationMenu className='min-w-full p-3 gap-3 flex justify-between backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 '>
        <div className='w-1/3'>
          <NavItems />
        </div>
        <div className='w-1/3'>
          <Link href='/'>
            <p className=' text-2xl font-extrabold tracking-wider text-center text-primary sm:text-3xl'>
              {NAME_PAGE}
            </p>
          </Link>
        </div>
        <div className='gap-x-1 flex flex-row items-center justify-end w-1/3'>
          <div>
            <p className='text-xs tracking-wider px-2'>{QUESTIONS_NUMBER}</p>
          </div>
          <Profile />
          <Cart />
          <ModeToggle />
        </div>
      </NavigationMenu>
    </div>
  )
}

export default Navbar

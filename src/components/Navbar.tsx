'use client'

import React from 'react'
import NavItems from './NavItems'
import ModeToggle from './ModeToggle'
import Cart from './Cart'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { ANNOUNCEMENT_BAR } from '@/config'

const Navbar = () => {
  const user = null
  return (
    <div className='sticky z-50 top-0 inset-x-0 items-center justify-center w-full'>
      {/* TODO: mobile nav */}

      <div className='w-full text-center p-1 bg-black dark:bg-white'>
        <p className='text-white dark:text-black text-sm'>{ANNOUNCEMENT_BAR}</p>
      </div>
      <NavigationMenu className='min-w-full p-3 gap-3 flex justify-between backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 '>
        <div>
          <NavItems />
        </div>

        {/* TODO: centrar titulo principal */}

        <h1
          color='black'
          className=' text-3xl font-bold tracking-widest text-black sm:text-4xl dark:text-white'
        >
          YOUNGLA
        </h1>
        <div className='gap-x-3 flex flex-row items-center'>
          <div>
            <p className='text-sm'>Questions? (818) 206-8764</p>
          </div>
          <ModeToggle />
          <ModeToggle />
          <Cart />
        </div>
      </NavigationMenu>
    </div>
  )
}

export default Navbar

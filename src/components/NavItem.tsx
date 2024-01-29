import { cn } from '@/lib/utils'
import {
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import React from 'react'
import { ArrowRight } from 'lucide-react'

const NavItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex flex-row items-center justify-between',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
          <ArrowRight className='h-4 w-4' />
        </a>
      </NavigationMenuLink>
    </li>
  )
})
NavItem.displayName = 'NavItem'

export default NavItem

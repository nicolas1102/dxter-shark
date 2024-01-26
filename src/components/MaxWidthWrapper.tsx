import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  classname,
  children,
}: {
  classname?: string
  children: ReactNode
}) => {
  return (
    // el primer valor de cn es el default
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
        classname
      )}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper

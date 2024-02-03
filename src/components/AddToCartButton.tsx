'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const AddToCartButton = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <Button
      onClick={() => {
        setIsSuccess(true)
      }}
      size='lg'
      className={cn(
        {
          'bg-slate-500': isSuccess,
        },
        'w-full'
      )}
    >
      {isSuccess ? 'Added' : 'Add to Cart'}
    </Button>
  )
}

export default AddToCartButton

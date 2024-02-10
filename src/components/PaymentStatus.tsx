'use client'

import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
  const router = useRouter()

  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      // it only query as long as the order is not false. Once the order is true, dont query more
      enabled: isPaid === false,
      // we create a interval for requerying
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  )

  useEffect(() => {
    if (data?.isPaid) router.refresh()
  }, [data?.isPaid, router])

  return (
    <div className='mt-12 grid grid-cols-2 gap-x-4 text-sm text-gray-600'>
      <div>
        <p className='font-medium text-primary'>Shipping To</p>
        <p>{orderEmail}</p>
      </div>

      <div>
        <p className='font-medium text-primary'>Order Status</p>
        <p>{isPaid ? 'Payment successful' : 'Pending payment'}</p>
      </div>
    </div>
  )
}

export default PaymentStatus

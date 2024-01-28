// this provider function allows us to use trpc throughtout the wntire forntend part

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { trpc } from '@/trpc/client'
import { httpBatchLink } from '@trpc/client'

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // this is the url of the backend (created at index.ts file)
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
          fetch(url, options) {
            return fetch(url, { ...options, credentials: 'include' })
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {/* this allows us to use tankstack react query */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers

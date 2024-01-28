import { appRouter } from '@/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) => {
  // whatever the request is, we can simply pass it onto this fetch handler to do all the heavy lifting for us
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })
}

export { handler as GET, handler as POST }

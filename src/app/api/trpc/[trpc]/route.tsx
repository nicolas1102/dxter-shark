import { appRouter } from '@/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) => {
  // whatever the request is, we can simply pass it onto this fetch handler to do all the heavy lifting for us
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // @ts-expect-error context already passed from express middleware
    // a error, cause typescript not recognizing that the actual context comes froms express and not from here
    createContext: () => ({}),
  })
}

export { handler as GET, handler as POST }

// this is our backend

import { publicProcedure, router } from './trpc';

// this is an API endpoint
export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => {
    return 'hello'
  }),
})

export type AppRouter = typeof appRouter
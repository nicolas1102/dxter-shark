// this is our backend

import { authRouter } from './auth-router';
import { router } from './trpc';

// this where we create our API endpoints
export const appRouter = router({
  // // publicProcedure means that everyone can access to this end point
  // anyApiRoute: publicProcedure.query(() => {
  //   return 'hello'
  // }),
  auth: authRouter,
})

export type AppRouter = typeof appRouter
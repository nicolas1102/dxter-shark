import { User } from '@/payload-types';
import { ExpressContext } from '@/server';
import { TRPCError, initTRPC } from '@trpc/server';
import { PayloadRequest } from 'payload/types';

// we say typescript what type of context will be dealing with
const t = initTRPC.context<ExpressContext>().create()

const isAuth = t.middleware(async ({ ctx, next }) => {
  const req = ctx.req as PayloadRequest // from next

  const { user } = req as { user: User | null }

  if (!user || !user.id) { // if user is null, the user is no logged in
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: { user, },
  })
})

export const router = t.router

// we will be able to call this API endpoind. 
export const publicProcedure = t.procedure
// we make sure the user is logged in
export const privateProcedure = t.procedure.use(isAuth)

// This means everyone can used (we used in our backend)
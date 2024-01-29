import { ExpressContext } from '@/server';
import { initTRPC } from '@trpc/server';

// we say typescript what type of context will be dealing with
const t = initTRPC.context<ExpressContext>().create()

export const router = t.router
// we will be able to call this API endpoind
export const publicProcedure = t.procedure
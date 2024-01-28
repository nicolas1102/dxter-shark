import { initTRPC } from '@trpc/server';

const t = initTRPC.context().create()

export const router = t.router
// we will be able to call this API endpoind
export const publicProcedure = t.procedure
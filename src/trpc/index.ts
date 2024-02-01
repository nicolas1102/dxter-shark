// this is our backend

import { z } from 'zod';
import { authRouter } from './auth-router'
import { publicProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload';

// this where we create our API endpoints
export const appRouter = router({
  auth: authRouter,
  // publicProcedure means that everyone can access to this end point
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        // inifinite scroll
        cursor: z.number().nullish(),
        // custom validator (at query-validator.ts file)
        query: QueryValidator,
      }))
    .query(async ({ input }) => {
      const { query, cursor } = input
      const { sort, limit, ...queryOpts } = query // queryOpts is for making very extendable
      const payload = await getPayloadClient() // get the products of the database

      // parsing queryOpts. We're putting the queryOptions in our CMS sintax
      const parsedQueryOpts: Record<string, { equals: string }> = {} 
      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        }
      })

      const page = cursor || 1
      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: 'products',
        where: {
          // we're don't wanna sell product that haven't been aproved by admins
          approvedForSale: {
            equals: 'approved'
          },
          ...parsedQueryOpts
        },
        sort,
        depth: 1, // fetch one level depth
        limit, // partimos el resultado
        page,
      })
      return {
        items,
        nextPage: hasNextPage ? nextPage : null
      }
    })
})

export type AppRouter = typeof appRouter
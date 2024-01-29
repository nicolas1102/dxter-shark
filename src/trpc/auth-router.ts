import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator';
import { publicProcedure, router } from './trpc';
import { getPayloadClient } from '../get-payload';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const authRouter = router({
  // 'publicProcedure' means that literlly anoyine can go into this endpoint, they don't need to be logged in to do
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input
      const payload = await getPayloadClient()

      // check it user already exist
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email
          }
        }
      })

      // check if the users already exists
      if (users.length !== 0) throw new TRPCError({ code: 'CONFLICT' })

      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'user'
        }
      })

      return { succesful: true, sentToEmail: email }
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    // we dont use 'motation' cause we are not changing any data, We're just reading
    .query(async ({ input }) => {
      const { token } = input

      const payload = await getPayloadClient()
      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      })

      // if isVerified is successful (equal true), that means in the database (mongodb in this case) the users got a true in the '_verifield' field

      if (!isVerified) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return { success: true }

    })
})
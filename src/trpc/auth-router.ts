import { AuthCredentialsValidator } from '@/lib/validators/account-credentials-validator';
import { publicProcedure, router } from './trpc';
import { getPayloadClient } from '@/get-payload';

export const authRouter = router({
  // 'publicProcedure' means that literlly anoyine can go into this endpoint, they don't need to be logged in to do
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input
      const payload = await getPayloadClient()

      
    })
})
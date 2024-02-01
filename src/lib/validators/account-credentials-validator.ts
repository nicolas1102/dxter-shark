// validaciones del lado del cliente

import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 character long.' }),
})

export const SignUpCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 character long.' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Confirm password must be at least 8 character long.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type TSignUpCredentialsValidator = z.infer<typeof SignUpCredentialsValidator>

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
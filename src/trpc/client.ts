import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '.';

// the front-end imports the type of the backend
export const trpc = createTRPCReact<AppRouter>({})
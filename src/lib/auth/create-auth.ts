import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { PrismaClient } from '../../generated/prisma/client.js';

export function createAuth(prisma: PrismaClient) {
  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        role: {
          type: ['PARTICIPANT', 'ADMIN'],
          required: false,
          defaultValue: 'PARTICIPANT',
          input: false,
        },
      },
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;

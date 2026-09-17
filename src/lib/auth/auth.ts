import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';
import { createAuth } from './create-auth.js';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

export const auth = createAuth(
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
  }),
);

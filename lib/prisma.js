import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;
const globalForPrisma = globalThis;

function getPrismaClient() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }

  const pool =
    globalForPrisma.pgPool ||
    new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

  const adapter = new PrismaPg(pool);

  const prisma = new PrismaClient({
    adapter,
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
    globalForPrisma.pgPool = pool;
  }

  return prisma;
}

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getPrismaClient();
      const value = client[prop];

      if (typeof value === "function") {
        return value.bind(client);
      }

      return value;
    },
  }
);
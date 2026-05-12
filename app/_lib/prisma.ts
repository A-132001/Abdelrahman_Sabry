import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const rawConnectionString = process.env.DATABASE_URL;

function normalizeConnectionString(value: string): string {
  const url = new URL(value);

  if (url.hostname.includes("supabase.com")) {
    if (!url.searchParams.has("sslmode")) {
      url.searchParams.set("sslmode", "require");
    }
    if (!url.searchParams.has("uselibpqcompat")) {
      url.searchParams.set("uselibpqcompat", "true");
    }
  }

  return url.toString();
}

const prismaClient =
  rawConnectionString && globalForPrisma.prisma
    ? globalForPrisma.prisma
    : rawConnectionString
      ? new PrismaClient({
          adapter: new PrismaPg({
            connectionString: normalizeConnectionString(rawConnectionString),
          }),
        })
      : null;

export const prisma = prismaClient as PrismaClient;

if (process.env.NODE_ENV !== "production" && prismaClient) {
  globalForPrisma.prisma = prisma;
}

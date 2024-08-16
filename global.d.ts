import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;

  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SALT_OR_ROUNDS: string;
    }
  }
}

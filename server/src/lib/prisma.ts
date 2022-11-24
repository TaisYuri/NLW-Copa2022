import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["query"], //retorna log de monitoramento
  });
  
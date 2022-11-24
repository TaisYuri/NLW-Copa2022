import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import ShortUniqueId from "short-unique-id";
import z from "zod";

export async function poolsRoutes(fastify: FastifyInstance) {
  // http://localhost:3333/pools/count
  //contagem de boloes
  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();
    return { count };
  });

  //criação de bolões
  fastify.post("/pools", async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createPoolBody.parse(request.body);

    const generateId = new ShortUniqueId({ length: 6 }); //gera código unico
    const code = String(generateId()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code,
      },
    });

    return reply.status(201).send({ code });
  });
}

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import ShortUniqueId from "short-unique-id";
import z from "zod";
import { authenticate } from '../plugins/authenticate';

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

    try{  //usuario autenticado atravez do check do jwt
      await request.jwtVerify()

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants:{
            create:{
              userId: request.user.sub
            }
          }
        },
      });

    } catch{  //usuario não autenticado (web)
      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });
    }
    

    return reply.status(201).send({ code });
  });


  fastify.post('/pools/join', {
    onRequest: [authenticate]
  }, async (request, reply) => {
    const joinPoolBody = z.object({
      code: z.string(),
    });

    const { code } = joinPoolBody.parse(request.body)

    const pool = await prisma.pool.findUnique({
      where:{
        code,
      },
      include:{
        participants:{
          where:{
            userId: request.user.sub,
          }
        }
      }
    })

    if(!pool){
      return reply.status(400).send({
        message: 'Pool not found',
      })
    }

    if (pool.participants.length > 0){
      return reply.status(400).send({
        message: 'You already joined this pool',
      })
    }

    if(!pool.ownerId){  //se o bolão não tiver dono, será atribuido ao primeiro usuario que entrar.
      await prisma.pool.update({
        where:{
          id: pool.id,
        },
        data:{
          ownerId: request.user.sub
        }
      })
    }

    await prisma.participant.create({
      data:{
        poolId: pool.id,
        userId: request.user.sub
      }
    })


    return reply.status(201).send()

  })

  //retorna todos os bolões em que o usuario está participando
  fastify.get('/pools', {
    onRequest: [authenticate]
  }, async (request) => {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub
          }
        }
      },
      include:{
        _count: {
          select:{
            participants: true
          }
        },
        participants:{
          select:{
            id: true,
            user:{
              select:{
                avatarUrl: true
              }
            }
          }, 
          take: 4
        },
        owner: {
          select:{
            name: true,
            id: true
          }
        }
      }
    })

    return {pools}
  })

  //retorna os detalhes do bolão
  fastify.get('/pools/:id', {
    onRequest: [authenticate]
  }, async (request) => {
    const getPoolsParams = z.object({
      id: z.string(),
    })

    const { id } = getPoolsParams.parse(request.params)

    const pool = await prisma.pool.findUnique({
      where: {
       id
      },
      include:{
        _count: {
          select:{
            participants: true
          }
        },
        participants:{
          select:{
            id: true,
            user:{
              select:{
                avatarUrl: true
              }
            }
          }, 
          take: 4
        },
        owner: {
          select:{
            name: true,
            id: true
          }
        }
      }
    })
    return { pool }
  })
}


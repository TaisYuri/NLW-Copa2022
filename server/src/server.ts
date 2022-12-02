import Fastify from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { poolsRoutes } from "./routes/pools";
import { userRoutes } from "./routes/users";
import { guessRoutes } from "./routes/guess";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";

async function bootstrap() {
  const fastify = Fastify({
    logger: true, //retorna log para monitoramento de cada função executada
  });

  await fastify.register(cors, {
    origin: true, //informa que qualquer aplicação poderá acessar o banco de dados
  });

  // gerando JWT
  // Em produção precisa ser variavel de ambiente
  await fastify.register(jwt, {
    secret: 'nlwcopa'
  });

 await fastify.register(poolsRoutes);
 await fastify.register(authRoutes);
 await fastify.register(gameRoutes);
 await fastify.register(guessRoutes);
 await fastify.register(userRoutes);
 

  await fastify.listen({
     port: 3333, 
     host: "0.0.0.0" 
    });
}

bootstrap();

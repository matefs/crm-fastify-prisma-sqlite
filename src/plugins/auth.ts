import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: "super-secret-jwt-key" // em produção, use variável de ambiente
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      userId: number;
      orgId: number;
    };
  }
}

declare module "fastify" {
  interface FastifyRequest {
    user: {
      userId: number;
      orgId: number;
    };
  }
}


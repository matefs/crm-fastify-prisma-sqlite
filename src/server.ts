import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import authPlugin from "./plugins/auth";
import authRoutes from "./routes/auth";
import leadsRoutes from "./routes/leads";
import fastifyCors from "@fastify/cors";


const app = Fastify({
	  logger: true
	});

app.register(prismaPlugin);
app.register(authPlugin);

app.register(fastifyCors, {
  origin: true // autoriza todas as origens
});



app.addHook("preHandler", async (req, res) => {
  if (req.routerPath?.startsWith("/auth")) return;
  await app.authenticate(req, res);
});

app.register(authRoutes, { prefix: "/auth" });
app.register(leadsRoutes, { prefix: "/leads" });


app.listen({ port: 3000, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});


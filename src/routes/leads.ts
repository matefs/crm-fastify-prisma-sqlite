import { FastifyInstance } from "fastify";
import { addOrgFilter } from "../utils/multiTenant";

export default async function (app: FastifyInstance) {
  app.get("/", async (req, res) => {
    const q: any = {};
    addOrgFilter(q, req.user.orgId);
    const leads = await app.prisma.lead.findMany(q);
    res.send(leads);
  });

  app.post("/", async (req, res) => {
    const data = req.body as any;
    const lead = await app.prisma.lead.create({
      data: { ...data, orgId: req.user.orgId }
    });
    res.status(201).send(lead);
  });
}


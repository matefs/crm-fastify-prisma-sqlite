import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";

export default async function (app: FastifyInstance) {
  app.post("/register", async (req, res) => {
    const { email, name, password, orgName } = req.body as any;
    const hash = await bcrypt.hash(password, 10);

    const org = await app.prisma.organization.create({
      data: {
        name: orgName,
        users: {
          create: { name, email, password: hash }
        }
      },
      include: { users: true }
    });

    const user = org.users[0];
    const token = app.jwt.sign({ userId: user.id, orgId: org.id });

    res.send({ token });
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body as any;
    const user = await app.prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).send({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send({ message: "Invalid credentials" });

    const token = app.jwt.sign({ userId: user.id, orgId: user.orgId });
    res.send({ token });
  });
}


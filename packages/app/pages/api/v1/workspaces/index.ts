import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

const workspacesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token == null) {
    res.status(401);
    return;
  }

  const { name } = body as {
    name: string;
  };

  switch (method) {
    case "GET": {
      break;
    }
    case "POST": {
      if (token.sub == null) {
        res.status(400).json({ error: "Missing subject or userId" });
        return;
      }
      if (name == null || token.sub == null) {
        res.status(400).json({ error: "Missing name" });
        return;
      }

      const transactionRes = await prisma.$transaction(async (prisma) => {
        if (token.sub == null) {
          return;
        }
        const tag = await prisma.permissionTag.create({
          data: {
            name: `workspace:${name}`,
          },
        });

        const page = await prisma.page.create({ data: {} });

        const workspace = await prisma.workspace.create({
          data: {
            name: name,
            pages: {
              connect: {
                id: page.id,
              },
            },
            permissions: {
              connect: {
                id: tag.id,
              },
            },
          },
        });

        await prisma.user.update({
          where: {
            id: token.sub,
          },
          data: {
            profile: {
              upsert: {
                update: {
                  lastActive: page.id,
                  workspaces: {
                    connect: {
                      id: workspace.id,
                    },
                  },
                  tags: {
                    connect: {
                      id: tag.id,
                    },
                  },
                },
                create: {
                  lastActive: page.id,
                  workspaces: {
                    connect: {
                      id: workspace.id,
                    },
                  },
                  tags: {
                    connect: {
                      id: tag.id,
                    },
                  },
                },
              },
            },
          },
        });

        return workspace;
      });

      res.status(200).json(transactionRes);
      break;
    }
    case "PATCH": {
      break;
    }
    case "DELETE": {
      break;
    }
    default: {
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
};
export default workspacesHandler;

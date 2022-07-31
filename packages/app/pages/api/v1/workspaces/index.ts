import { prisma } from "@idealjs/chao-feng-shared";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { SCRUD, TAG_TYPE } from "../../../../lib/type";
import { authOptions } from "../../auth/[...nextauth]";

const workspacesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session == null) {
    res.status(401).json(null);
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
      if (session.user.id == null) {
        res.status(422).json({ error: "Missing subject in token" });
        return;
      }
      if (name == null || session.user == null) {
        res.status(422).json({ error: "Missing name" });
        return;
      }

      const transactionRes = await prisma.$transaction(async (prisma) => {
        if (session.user == null) {
          return;
        }
        const tag = await prisma.permissionTag.create({
          data: {
            name: `workspace:${name}`,
            scrud: SCRUD.S | SCRUD.C | SCRUD.R | SCRUD.U | SCRUD.D,
            type: TAG_TYPE.INCLUDE,
          },
        });

        const page = await prisma.page.create({
          data: {
            childOrder: [],
            blockOrder: [],
            workspace: {
              create: {
                name: name,
                permissions: {
                  connect: {
                    id: tag.id,
                  },
                },
                pageOrder: [],
              },
            },
          },
          include: {
            workspace: true,
          },
        });

        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            profile: {
              upsert: {
                update: {
                  lastActive: page.id,
                  workspaces: {
                    connect: {
                      id: page.workspace!.id,
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
                      id: page.workspace!.id,
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

        return page.workspace;
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

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const pagesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { pid } = query as { pid: string };

  switch (method) {
    case "GET": {
      break;
    }
    case "POST": {
      const { workspaceId, parentId, name } = body as {
        workspaceId: string;
        parentId?: string;
        name?: string;
      };
      if (workspaceId == null) {
        res.status(400).json({ error: "Missing workspaceId" });
        return;
      }

      const workspace = await prisma.workspace.findUnique({
        where: {
          id: workspaceId,
        },
        include: {
          permissions: true,
        },
      });

      res.status(200).json(
        await prisma.page.create({
          data: {
            workspace: {
              connect: {
                id: workspaceId,
              },
            },
            name: name,
            parent: {
              connect: {
                id: parentId,
              },
            },
            permissions: {
              connect: workspace?.permissions.map((p) => ({ id: p.id })),
            },
          },
        })
      );

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

export default pagesHandler;

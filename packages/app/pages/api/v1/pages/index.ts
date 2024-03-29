import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const pagesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;

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
        res.status(422).json({ error: "Missing workspaceId" });
        return;
      }

      const parent = await prisma.page.findUnique({
        where: {
          id: parentId,
        },
        include: {
          permissions: true,
        },
      });

      res.status(200).json(
        await prisma.page.create({
          data: {
            childOrder: [],
            blockOrder: [],
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
              connect: parent?.permissions.map((p) => ({ id: p.id })),
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

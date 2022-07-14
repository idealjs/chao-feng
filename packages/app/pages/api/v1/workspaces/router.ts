import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const routerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { workspaceId } = query as { workspaceId: string };

  switch (method) {
    case "GET": {
      const workspace = await prisma.workspace.findUnique({
        where: {
          id: workspaceId,
        },
        include: {
          pages: true,
        },
      });
      res.status(200).json(workspace);
      break;
    }
    case "POST": {
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
export default routerHandler;

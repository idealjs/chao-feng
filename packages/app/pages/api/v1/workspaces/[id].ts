import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const workspacesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { id: workspaceId } = query as { id: string };
  const token = await getToken({ req });
  if (token == null) {
    res.status(401).json(null);
    return;
  }

  switch (method) {
    case "GET": {
      res.status(200).json(
        await prisma.workspace.findUnique({
          where: {
            id: workspaceId,
          },
        })
      );
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
export default workspacesHandler;

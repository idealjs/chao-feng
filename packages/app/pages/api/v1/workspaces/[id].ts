import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

const workspacesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { id: workspaceId } = query as { id: string };
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    res.status(401);
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

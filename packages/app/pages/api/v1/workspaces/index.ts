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

  const { workspaceName } = body as {
    workspaceName: string;
  };

  switch (method) {
    case "GET": {
      break;
    }
    case "POST": {
      if (workspaceName == null || token.sub == null) {
        res.status(400).json({ error: "Missing workspaceName or userId" });
        return;
      }
      prisma.workspace.create({
        data: {
          user: {
            connect: {
              id: token.sub,
            },
          },
          permissionTag: {
            create: {
              name: workspaceName,
            },
          },
        },
      });
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

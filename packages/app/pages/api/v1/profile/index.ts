import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

const profileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token == null) {
    res.status(401).json(null);
    return;
  }
  switch (method) {
    case "GET": {
      res.status(200).json(
        await prisma.profile.findUnique({
          where: {
            userId: token?.sub,
          },
          include: {
            workspaces: true,
            tags: true,
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
    default: {
      res.setHeader("Allow", ["GET", "POST", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
};
export default profileHandler;

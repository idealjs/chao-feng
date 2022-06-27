import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

const profileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    res.status(401);
    return;
  }
  switch (method) {
    case "GET": {
      res.status(200).json(
        await prisma.profile.findUnique({
          where: {
            userId: token?.sub,
          },
        })
      );
      break;
    }
    case "PATCH": {
      break;
    }
    default: {
      res.setHeader("Allow", ["GET", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
};
export default profileHandler;

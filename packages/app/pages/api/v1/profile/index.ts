import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../../auth/[...nextauth]";

const profileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session == null) {
    res.status(401).json(null);
    return;
  }
  switch (method) {
    case "GET": {
      res.status(200).json(
        await prisma.profile.findUnique({
          where: {
            userId: session?.user.id,
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

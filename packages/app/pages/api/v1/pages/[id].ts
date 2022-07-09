import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const pagesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { id: pageId } = query as { id: string };

  switch (method) {
    case "GET": {
      res.status(200).json(
        await prisma.page.findUnique({
          where: {
            id: pageId,
          },
          include: {
            blocks: true,
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

export default pagesHandler;
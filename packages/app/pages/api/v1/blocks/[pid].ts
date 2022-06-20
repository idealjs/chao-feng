import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

const nanoid = customAlphabet("1234567890abcdef", 32);

const prisma = new PrismaClient();

const blocksHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { pid } = query as { pid: string };
  console.debug("[debug]");
  switch (method) {
    case "GET":
      res.status(200).json(
        await prisma.block.findUnique({
          where: {
            id: pid,
          },
          include: {
            blocks: true,
          },
        })
      );
      break;
    case "POST": {
      break;
    }
    case "PATCH": {
      break;
    }
    case "DELETE": {
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default blocksHandler;

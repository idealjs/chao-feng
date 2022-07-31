import { prisma } from "@idealjs/chao-feng-shared";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const blocksHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { id: blockId } = query as { id: string };

  switch (method) {
    case "GET": {
      res.status(200).json(
        await prisma.block.findUnique({
          where: {
            id: blockId,
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
      const block = await prisma.$transaction(async (prisma) => {
        const block = await prisma.block.findUnique({
          where: {
            id: blockId,
          },
          include: {
            page: true,
          },
        });

        const order = (block?.page?.blockOrder as Prisma.JsonArray).filter(
          (o) => o !== blockId
        );

        await prisma.page.update({
          where: {
            id: block?.page?.id,
          },
          data: {
            blocks: {
              delete: {
                id: blockId,
              },
            },
            blockOrder: order,
          },
        });
        return block;
      });

      res.status(200).json(block);
      break;
    }
    default: {
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
};

export default blocksHandler;

import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

const pagesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { pid } = query as { pid: string };

  switch (method) {
    case "GET": {
      res.status(200).json(
        await prisma.block.findUnique({
          where: {
            id: pid,
          },
        })
      );
      break;
    }
    case "POST": {
      const { pageId, type, properties, nextTo } = body as {
        pageId: string;
        type: string;
        properties: Prisma.InputJsonValue;
        nextTo: string;
      };
      if (pageId == null) {
        res.status(422).json({
          msg: "missing pageId",
        });
        return;
      }
      if (type == null) {
        res.status(422).json({
          msg: "missing type",
        });
        return;
      }
      if (properties == null) {
        res.status(422).json({
          msg: "missing properties",
        });
        return;
      }

      const transactionRes = await prisma.$transaction(async (prisma) => {
        const block = await prisma.block.create({
          data: {
            page: {
              connect: {
                id: pageId,
              },
            },
            type,
            properties,
          },
          include: {
            page: true,
          },
        });

        if (nextTo == null) {
          await prisma.page.update({
            where: {
              id: pageId,
            },
            data: {
              blockOrder: (block.page?.blockOrder?.split(",") ?? [])
                .concat(block.id)
                .join(","),
            },
          });
        }

        if (nextTo != null) {
          await prisma.page.update({
            where: {
              id: pageId,
            },
            data: {
              blockOrder: (block.page?.blockOrder?.split(",") ?? [])
                .flatMap((blockId) => {
                  if (blockId === nextTo) {
                    return [blockId, block.id];
                  }
                  return [blockId];
                })
                .join(","),
            },
          });
        }

        return block;
      });

      res.status(200).json(transactionRes);
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

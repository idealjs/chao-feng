import type { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

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
        properties?: Prisma.InputJsonObject;
        nextTo?: string;
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
        let linkPage;
        if (type === "link") {
          const page = await prisma.page.findUnique({
            where: {
              id: pageId,
            },
          });

          linkPage = await prisma.page.create({
            data: {
              childOrder: [],
              blockOrder: [],
              workspace: {
                connect: {
                  id: page?.workspaceId,
                },
              },
              parent: {
                connect: {
                  id: pageId,
                },
              },
            },
          });
        }
        const block = await prisma.block.create({
          data: {
            page: {
              connect: {
                id: pageId,
              },
            },
            type,
            properties: {
              ...properties,
              linkId: linkPage?.id,
            },
          },
          include: {
            page: true,
          },
        });

        await prisma.page.update({
          where: {
            id: pageId,
          },
          data: {
            blockOrder:
              nextTo == null
                ? ((block.page?.blockOrder ?? []) as Prisma.JsonArray).concat(
                    block.id
                  )
                : ((block.page?.blockOrder ?? []) as Prisma.JsonArray).flatMap(
                    (blockId) => {
                      if (blockId === nextTo) {
                        return [blockId, block.id];
                      }
                      return [blockId];
                    }
                  ),
            childOrder: [
              linkPage?.id,
              ...((block.page?.childOrder ?? []) as Prisma.JsonArray),
            ].filter((id): id is string => id != null),
          },
        });

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

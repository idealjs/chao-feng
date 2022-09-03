import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import type { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

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
      const { pageId, type, nextTo } = body as {
        pageId: string;
        type: string;
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

      let properties: Record<string, any> = schema
        .node("doc", null, [
          schema.node("paragraph", null, [schema.text("hello world!")]),
        ])
        .toJSON();

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
          properties = schema
            .node("doc", null, [
              schema.node("paragraph", null, [
                schema.text("hello link!", [
                  schema.mark("link", {
                    title: "undefined",
                    href: linkPage?.id,
                  }),
                ]),
              ]),
            ])
            .toJSON();
        }

        const block = await prisma.block.create({
          data: {
            page: {
              connect: {
                id: pageId,
              },
            },
            type,
            properties: properties,
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

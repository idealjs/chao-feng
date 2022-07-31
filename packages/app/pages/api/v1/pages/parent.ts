import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const parentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;

  const { pageId } = query as { pageId: string };

  switch (method) {
    case "GET": {
      const data = await prisma.$queryRaw(Prisma.sql`with recursive r as(
        select "parentId","id","name"
        from "Page"
        where id = ${pageId}
        union all
        select c."parentId",c."id",c."name"
        from "Page" c
        join r on r."parentId" = c.id
    )select * from r`);
      res.status(200).json(data);
      break;
    }
    default: {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
};
export default parentHandler;

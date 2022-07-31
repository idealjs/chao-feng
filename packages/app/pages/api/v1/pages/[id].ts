import { prisma } from "@idealjs/chao-feng-shared";
import type { NextApiRequest, NextApiResponse } from "next";

const pagesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { id: pageId } = query as { id: string };

  switch (method) {
    case "GET": {
      const page = await prisma.page.findUnique({
        where: {
          id: pageId,
        },
      });
      if (page == null) {
        res.status(404).json({});
        return;
      }
      res.status(200).json(page);
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

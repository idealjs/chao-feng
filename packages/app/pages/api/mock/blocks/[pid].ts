import type { NextApiRequest, NextApiResponse } from "next";

import nanoid from "../../../../lib/nanoid";
import { IBlock } from "../../../../lib/type";

const node2: Partial<IBlock> = {
  id: nanoid(),
  type: "text",
  properties: {
    title: ["hello"],
  },
};

const node1: Partial<IBlock> = {
  id: "abc",
  type: "page",
};

const blocksHandler = (
  req: NextApiRequest,
  res: NextApiResponse<{
    [key: string]: Partial<IBlock>;
  }>
) => {
  const { query, body, method } = req;
  const { pid } = query;
  console.debug("[debug]");
  switch (method) {
    case "GET":
      res.status(200).json({
        [node1.id!]: node1,
        [node2.id!]: node2,
      });
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default blocksHandler;

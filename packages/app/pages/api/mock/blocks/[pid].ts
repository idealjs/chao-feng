import { customAlphabet } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

import { IBaseBlock } from "../../../../lib/type";

const nanoid = customAlphabet("1234567890abcdef", 32);

const node1 = { id: nanoid() };
const node2 = { id: nanoid() };

const blocksHandler = (
  req: NextApiRequest,
  res: NextApiResponse<{
    [key: string]: Partial<IBaseBlock>;
  }>
) => {
  const { query, body, method } = req;
  const { pid } = query;
  console.debug("[debug]");
  switch (method) {
    case "GET":
      res.status(200).json({
        [node1.id]: node1,
        [node2.id]: node2,
      });
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default blocksHandler;

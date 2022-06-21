import type { NextApiRequest, NextApiResponse } from "next";

const workspacesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  switch (method) {
    case "GET": {
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
export default workspacesHandler;

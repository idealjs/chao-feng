import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const checkAuthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const { email } = body as {
    email: string | undefined;
  };
  switch (method) {
    case "POST": {
      if (process.env.NEXT_PUBLIC_NODE_ENV !== "prod") {
        await prisma.verificationToken.deleteMany();
      }
      res.status(200).json({
        allow: true,
      });
      break;
    }
    default: {
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
};

export default checkAuthHandler;

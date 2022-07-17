import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      image: string | null;
      name: string;
      userId?: string;
    };
    expires: ISODateString;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NODE_ENV: string | undefined;
      NEXT_PUBLIC_WEBSOCKET_URL: string | undefined;
    }
  }
}

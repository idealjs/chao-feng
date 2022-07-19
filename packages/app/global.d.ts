import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
    expires: ISODateString;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NODE_ENV: string | undefined;
      NEXT_PUBLIC_WEBSOCKET_URL: string | undefined;
      NEXT_PUBLIC_SYNC_EDIT: "disabled" | undefined;
    }
  }
}

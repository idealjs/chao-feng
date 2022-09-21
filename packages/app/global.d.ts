import "next-auth";

declare module "next-auth" {
  interface Session {
    externalJwt?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    externalJwt?: string;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NODE_ENV: string | undefined;
      NEXT_PUBLIC_WEBSOCKET_URL: string | undefined;
    }
  }
  interface IPropsWithClassName {
    className?: string;
  }
  type PropsWithClassName<P = unknown> = P & { className?: string };
}

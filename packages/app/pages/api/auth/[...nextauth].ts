import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import EmailProvider from "next-auth/providers/email";

const providers: Provider[] = [
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  }),
  {
    id: "wechat",
    name: "wechat",
    type: "oauth",
    wellKnown:
      "https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect",
    authorization: { params: { scope: "openid email profile" } },
    idToken: true,
    checks: ["pkce", "state"],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
  },
];

const mockProvider: Provider[] = [
  EmailProvider({
    async generateVerificationToken() {
      return "0000";
    },
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
    sendVerificationRequest: (params) => {
      console.debug("[debug]:mock sendVerificationRequest", params);
    },
  }),
];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers:
    process.env.NEXT_PUBLIC_NODE_ENV === "prod" ? providers : mockProvider,
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);

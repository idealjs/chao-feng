import "../styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

import SocketProvider from "../components/SocketProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SocketProvider uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL}>
        <Component {...pageProps} />
      </SocketProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);

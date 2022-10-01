import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";

import usePageId from "../../hooks/usePageId";
import YDocProvider from "../../lib/react-yjs/src/YDocProvider";
import Editor from "../Editor";
import SocketProvider from "../SocketProvider";
import { yDoc } from "../state";

const UserLand = () => {
  const pageId = usePageId();
  const { data: session, status } = useSession();
  const router = useRouter();

  const opts = useMemo(() => {
    return { query: { pageId, externalJwt: session?.externalJwt } };
  }, [pageId, session?.externalJwt]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/notfound");
    }
  }, [router, status]);

  if (status !== "authenticated") {
    return null;
  }

  return (
    <YDocProvider yDoc={yDoc}>
      {pageId != null && (
        <SocketProvider uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL} opts={opts}>
          <Editor />
        </SocketProvider>
      )}
    </YDocProvider>
  );
};

export default UserLand;

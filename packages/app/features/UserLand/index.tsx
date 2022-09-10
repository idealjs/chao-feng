import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import usePageId from "../../hooks/usePageId";
import YDocProvider from "../../lib/react-yjs/src/YDocProvider";
import Editor from "../Editor";
import SocketProvider from "../SocketProvider";

const UserLand = () => {
  const pageId = usePageId();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/notfound");
    }
  }, [router, status]);

  if (status !== "authenticated") {
    return null;
  }

  return (
    <YDocProvider>
      {pageId != null && (
        <SocketProvider
          uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL}
          opts={{ query: { pageId } }}
        >
          <Editor />
        </SocketProvider>
      )}
    </YDocProvider>
  );
};

export default UserLand;

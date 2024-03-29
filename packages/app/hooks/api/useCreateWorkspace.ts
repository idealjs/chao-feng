import type { Workspace } from "@prisma/client";
import { useCallback } from "react";

import { useSocket } from "../../features/SocketProvider";

const useCreateWorkspace = () => {
  const socket = useSocket();
  return useCallback(
    async (name: string) => {
      const res = await fetch("/api/v1/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      const workspace = (await res.json()) as Workspace;
      socket?.emit("RES_CREATED", {
        resURL: "/api/v1/profile",
      });
      return workspace;
    },
    [socket]
  );
};

export default useCreateWorkspace;

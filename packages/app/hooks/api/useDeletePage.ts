import { Page } from "@prisma/client";
import { useCallback } from "react";

import { useSocket } from "../../components/SocketProvider";

const useDeletePage = () => {
  const socket = useSocket();
  return useCallback(
    async (params: { pageId: string }) => {
      const { pageId } = params;
      const res = await fetch(`/api/v1/pages/${pageId}`, {
        method: "DELETE",
      });
      const page = (await res.json()) as Page;

      if (page.parentId) {
        socket?.emit("updated", {
          updatedUrl: `/api/v1/pages/${page.parentId}`,
        });
      } else {
        socket?.emit("updated", {
          updatedUrl: `/api/v1/workspaces/${page.workspaceId}`,
        });
      }
      return page;
    },
    [socket]
  );
};

export default useDeletePage;

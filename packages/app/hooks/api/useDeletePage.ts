import type { Page } from "@prisma/client";
import { useCallback } from "react";

const useDeletePage = () => {
  return useCallback(async (params: { pageId: string }) => {
    const { pageId } = params;
    const res = await fetch(`/api/v1/pages/${pageId}`, {
      method: "DELETE",
    });
    const page = (await res.json()) as Page;
    return page;
  }, []);
};

export default useDeletePage;

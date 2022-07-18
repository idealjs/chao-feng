import { useCallback } from "react";

const useDeletePage = () => {
  return useCallback(async (params: { pageId: string }) => {
    const { pageId } = params;
    const res = await fetch(`/api/v1/pages/${pageId}`, {
      method: "DELETE",
    });
    return await res.json();
  }, []);
};

export default useDeletePage;

import { useCallback } from "react";

const useDeleteBlock = () => {
  return useCallback(async (params: { blockId: string }) => {
    const { blockId } = params;
    const res = await fetch(`/api/v1/blocks/${blockId}`, {
      method: "DELETE",
    });
    return res.json();
  }, []);
};

export default useDeleteBlock;

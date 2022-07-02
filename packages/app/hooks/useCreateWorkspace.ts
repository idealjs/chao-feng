import { useCallback } from "react";
import { useSWRConfig } from "swr";

const useCreateWorkspace = () => {
  return useCallback(async (name: string) => {
    const res = await fetch("/api/v1/workspaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    return res.json();
  }, []);
};

export default useCreateWorkspace;

import { useCallback } from "react";
import { useSWRConfig } from "swr";

const useCreateWorkspace = () => {
  const { mutate } = useSWRConfig();

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

      mutate("/api/v1/profile/");

      return res.json();
    },
    [mutate]
  );
};

export default useCreateWorkspace;

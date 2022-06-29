import { useCallback } from "react";

const useCreateWorkspace = () => {
  return useCallback(async (name: string) => {
    return (
      await fetch("/api/v1/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      })
    ).json();
  }, []);
};

export default useCreateWorkspace;

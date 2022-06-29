import { useCallback } from "react";

const useCreateWorkspace = () => {
  return useCallback(async (name: string) => {
    await fetch("/api/v1/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
  }, []);
};

export default useCreateWorkspace;

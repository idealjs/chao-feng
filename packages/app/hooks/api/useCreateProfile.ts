import { useCallback } from "react";

const useCreateProfile = () => {
  return useCallback(async () => {
    const res = await fetch("/api/v1/profile", {
      method: "POST",
    });
    return await res.json();
  }, []);
};

export default useCreateProfile;

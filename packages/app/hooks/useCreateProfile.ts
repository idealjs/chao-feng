import { useCallback } from "react";

const useCreateProfile = () => {
  return useCallback(async () => {
    const res = await fetch("/api/v1/profile", {
      method: "POST",
    });
    return res.json();
  }, []);
};

export default useCreateProfile;

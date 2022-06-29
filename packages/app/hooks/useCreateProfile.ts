import { useCallback } from "react";

const useCreateProfile = () => {
  return useCallback(async () => {
    await fetch("/api/v1/profile", {
      method: "POST",
    });
  }, []);
};

export default useCreateProfile;

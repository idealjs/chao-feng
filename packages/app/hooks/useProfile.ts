import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useProfile = () => {
  const { data, error, mutate, isValidating } = useSWR<{
    lastActive: string | null;
    userId: string;
  }>("/api/v1/profile", fetcher);
  return { data };
};

export default useProfile;

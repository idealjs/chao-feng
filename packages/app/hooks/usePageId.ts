import { useRouter } from "next/router";

const usePageId = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  return pid;
};

export default usePageId;

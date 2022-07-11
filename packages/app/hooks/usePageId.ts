import { useRouter } from "next/router";

const usePageId = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  if (pid == null) {
    throw new Error("Page id is not defined");
  }
  return pid;
};

export default usePageId;

import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const Page: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { data: res, mutate } = useSWR(`/api/mock/blocks/${pid}`, fetcher);
  console.log("test test", res);
  return (
    <div className="h-screen w-screen flex">
      <div className="w-64">sidebar pid:{pid}</div>
      <div className="flex-1 flex flex-col ">
        <div className="h-12">head</div>
        <div className="flex-1 h-full">
          <div className="flex ">
            <div className="pl-24">title</div>
          </div>
          <div className="flex ">
            <div className="px-24 pb-36 max-w-5xl">welcome</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

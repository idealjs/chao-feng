import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

import Block from "../components/Block";
import { useEvent } from "../lib/effector";
import fetcher from "../lib/fetcher";
import { IBlock } from "../lib/type";
import { $setBlocks } from "../store/blocks";

const Page: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string };
  const { data, mutate } = useSWR<{ [key: string]: IBlock | undefined }>(
    `/api/mock/blocks/${pid}`,
    fetcher
  );

  const setBlocks = useEvent($setBlocks);

  useEffect(() => {
    setBlocks(data ?? {});
  }, [data, setBlocks]);

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
            <div className="px-24 pb-36 max-w-5xl">
              <Block blockId={pid} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

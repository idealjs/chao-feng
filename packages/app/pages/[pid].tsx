import type { NextPage } from "next";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import useSWR from "swr";

import Block from "../components/Block";
import fetcher from "../lib/fetcher";
import { useStoreNext } from "../lib/react-rxjs";
import { IBlock } from "../lib/type";
import { blocksStore } from "../store/blocks";

const Page: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string };

  const { data, mutate } = useSWR<{ [key: string]: IBlock | undefined }>(
    `/api/mock/blocks/${pid}`,
    fetcher
  );

  const setBlocks = useStoreNext(blocksStore);

  useEffect(() => {
    setBlocks(data ?? {});
  }, [data, setBlocks]);

  return (
    <div className="h-screen w-screen flex">
      <div className="w-64">
        <span>sidebar pid:{pid}</span>
        <button
          onClick={async () => {
            await signOut({ callbackUrl: "/" });
          }}
        >
          signout
        </button>
      </div>
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

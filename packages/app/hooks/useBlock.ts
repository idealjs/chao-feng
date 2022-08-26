import type { Prisma } from "@prisma/client";
import useSWR from "swr";

import fetcher from "../lib/fetcher";
import { IBlock } from "../lib/type";

const useBlock = <P extends Prisma.JsonObject = {}>(blockId: string) => {
  const { data } = useSWR<IBlock<P>>(`/api/v1/blocks/${blockId}`, fetcher);

  return data;
};

export default useBlock;

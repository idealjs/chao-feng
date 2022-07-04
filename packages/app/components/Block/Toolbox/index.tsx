import { MenuIcon, PlusIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import { PropsWithChildren, RefObject, useRef } from "react";
import { useSWRConfig } from "swr";

import useCreateBlock from "../../../hooks/useCreateBlock";
import { useBind } from "./BindContext";
import { useBlockRef } from "./RefContext";

const toolbox = clsx(
  "z-50 h-full",
  "flex items-center",
  "opacity-0 group-hover:opacity-100",
  "whitespace-nowrap absolute right-full"
);

interface IProps {
  blockId: string;
}

const Toolbox = (props: PropsWithChildren<IProps>) => {
  const { children, blockId } = props;
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  const createBlock = useCreateBlock(pid!);
  const bind = useBind();
  const ref = useBlockRef();

  return (
    <div className="group relative" ref={ref}>
      <div className={toolbox}>
        <button
          className="h-5 w-5 mr-2"
          onClick={async () => {
            await createBlock({
              type: "text",
              properties: {},
              nextTo: blockId,
            });
            mutate(`/api/v1/pages/${pid}`);
          }}
        >
          <PlusIcon />
        </button>
        <button className="h-5 w-5 mr-2" {...bind()}>
          <MenuIcon />
        </button>
      </div>
      {children}
    </div>
  );
};

export default Toolbox;

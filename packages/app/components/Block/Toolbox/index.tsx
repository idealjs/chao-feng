import { MenuIcon, PlusIcon } from "@heroicons/react/outline";
import { useDrag, useGesture } from "@use-gesture/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { PropsWithChildren, RefObject, useRef } from "react";
import { useSWRConfig } from "swr";

import useBlockOrder from "../../../hooks/useBlockOrder";
import useCreateBlock from "../../../hooks/useCreateBlock";
import useStateRef from "../../../lib/useStateRef";
import { useSpringApi } from "./SpringApiProvider";

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
  const springApi = useSpringApi();
  const blockOrder = useBlockOrder(pid!);
  const blockOrderRef = useStateRef(blockOrder);

  const bind = useDrag(
    ({ active, args: [blockId], movement: [mx, my], swipe }) => {
      springApi?.start((index) => {
        const blockIndex = blockOrderRef.current?.indexOf(blockId);
        if (index === blockIndex) {
          return { y: active ? my : 0, immediate: active };
        }
        return {
          y: 0,
        };
      });
    }
  );

  const bindDragOver = useGesture({
    onDragOver: ({ args: [blockId] }) => {
      console.log("test test state", blockId);
    },
  });

  return (
    <div className="group relative" {...bindDragOver(blockId)}>
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
        <button
          className="h-5 w-5 mr-2"
          style={{ touchAction: "none" }}
          {...bind(blockId)}
        >
          <MenuIcon />
        </button>
      </div>
      {children}
    </div>
  );
};

export default Toolbox;

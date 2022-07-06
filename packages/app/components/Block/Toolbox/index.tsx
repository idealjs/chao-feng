import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { MenuIcon, PlusIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";
import { useSWRConfig } from "swr";

import useCreateBlock from "../../../hooks/useCreateBlock";

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

  const [activeDrag, setActiveDrag] = useState<string | null>(null);

  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  const createBlock = useCreateBlock(pid!);

  useDndMonitor({
    onDragStart: (e) => {
      setActiveDrag(e.active.id as string);
    },
    onDragEnd: () => {
      setActiveDrag(null);
    },
  });

  const { setNodeRef: setDragNodeRef, listeners } = useDraggable({
    id: blockId,
    data: {},
  });

  const { setNodeRef: setDropNodeRef } = useDroppable({
    id: blockId,
    data: {},
  });

  return (
    <div className="group relative" ref={setDropNodeRef}>
      <div
        className={clsx(
          "z-50 h-full",
          "flex items-center",
          "whitespace-nowrap absolute right-full",
          {
            "opacity-0": activeDrag !== blockId,
            "group-hover:opacity-100":
              activeDrag === blockId || activeDrag === null,
          }
        )}
      >
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
        <button className="h-5 w-5 mr-2" ref={setDragNodeRef} {...listeners}>
          <MenuIcon />
        </button>
      </div>
      {children}
    </div>
  );
};

export default Toolbox;

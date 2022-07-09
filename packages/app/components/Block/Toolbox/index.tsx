import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuIcon, PlusIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";
import { useSWRConfig } from "swr";

import useCreateBlock from "../../../hooks/useCreateBlock";
import Menu from "./Menu";

interface IProps {
  blockId: string;
}

const Toolbox = (props: PropsWithChildren<IProps>) => {
  const { children, blockId } = props;
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  const createBlock = useCreateBlock(pid!);

  const { listeners, setNodeRef, transform } = useSortable({
    id: blockId,
  });

  return (
    <div
      className="group relative my-1"
      ref={setNodeRef}
      style={{
        transform: transform
          ? CSS.Transform.toString({
              x: transform.x,
              y: transform.y,
              scaleX: 1,
              scaleY: 1,
            })
          : undefined,
      }}
    >
      <div
        className={clsx(
          "z-50 h-full",
          "flex items-start pt-0.5",
          "opacity-0 group-hover:opacity-100",
          "whitespace-nowrap absolute right-full",
          {
            "opacity-100": open,
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
        <button
          className="h-5 w-5 mr-2"
          {...listeners}
          onClick={() => {
            setOpen((h) => !h);
          }}
        >
          <MenuIcon />
        </button>
        <Menu open={open} />
      </div>
      {children}
    </div>
  );
};

export default Toolbox;

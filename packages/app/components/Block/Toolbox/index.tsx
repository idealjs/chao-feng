import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "@headlessui/react";
import { MenuIcon, PlusIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { useSWRConfig } from "swr";

import useCreateBlock from "../../../hooks/useCreateBlock";

const toolbox = clsx(
  "z-50 h-full",
  "flex items-start pt-0.5",
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
        <Menu>
          <Menu.Button className="h-5 w-5 mr-2" {...listeners}>
            <MenuIcon />
          </Menu.Button>
          <Menu.Items>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-blue-500"}`}
                  href="/account-settings"
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-blue-500"}`}
                  href="/account-settings"
                >
                  Documentation
                </a>
              )}
            </Menu.Item>
            <Menu.Item disabled>
              <span className="opacity-75">Invite a friend (coming soon!)</span>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      {children}
    </div>
  );
};

export default Toolbox;

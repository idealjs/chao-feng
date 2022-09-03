import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuIcon, PlusIcon } from "@heroicons/react/outline";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { useSWRConfig } from "swr";

import useCreateBlock from "../../../hooks/api/useCreateBlock";
import usePageId from "../../../hooks/usePageId";
import Menu from "./Menu";

interface IProps {
  blockId: string;
}

const Toolbox = (props: PropsWithChildren<IProps>) => {
  const { children, blockId } = props;
  const { mutate } = useSWRConfig();
  const pageId = usePageId();
  const createBlock = useCreateBlock();

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
        tabIndex={0}
        className={clsx(
          "h-full",
          "flex items-start pt-0.5",
          "opacity-0 group-hover:opacity-100 focus-within:opacity-100",
          "whitespace-nowrap absolute right-full"
        )}
        onClick={(e) => {
          e.currentTarget.blur();
        }}
      >
        <div
          className="h-5 w-5 mr-2 cursor-pointer"
          onClick={async (e) => {
            if (pageId == null) {
              return;
            }
            await createBlock({
              pageId,
              type: "text",
              properties: schema
                .node("doc", null, [
                  schema.node("paragraph", null, [schema.text("hello world!")]),
                ])
                .toJSON(),
              nextTo: blockId,
            });
            mutate(`/api/v1/pages/${pageId}`);
          }}
        >
          <PlusIcon />
        </div>
        <div
          tabIndex={0}
          className="dropdown h-5 w-5 mr-2 cursor-pointer"
          {...listeners}
          onClick={(e) => {
            e.stopPropagation();
            if (e.currentTarget.classList.contains("dropdown-open")) {
              e.currentTarget.blur();
            } else {
              e.currentTarget.classList.add("dropdown-open");
            }
          }}
          onBlur={(e) => {
            e.currentTarget.classList.remove("dropdown-open");
          }}
        >
          <MenuIcon />
          <Menu blockId={blockId} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Toolbox;

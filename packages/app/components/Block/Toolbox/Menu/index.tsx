import clsx from "clsx";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

import useCreateBlock from "../../../../hooks/useCreateBlock";
import useDeleteBlock from "../../../../hooks/useDeleteBlock";
import usePageId from "../../../../hooks/usePageId";
import { ILinkBlock } from "../../Link";

interface IProps {
  blockId: string;
}

const Menu = (props: IProps) => {
  const { blockId } = props;
  const router = useRouter();

  const pageId = usePageId();
  const deleteBlock = useDeleteBlock();
  const createBlock = useCreateBlock();
  const { mutate } = useSWRConfig();

  return (
    <ul
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={clsx(
        "dropdown-content menu shadow bg-base-100 w-56 rounded-box p-2 index z-10"
      )}
    >
      <li>
        <button
          onClick={async () => {
            await createBlock({
              pageId: pageId,
              type: "text",
              nextTo: blockId,
              properties: {},
            });
            mutate(`/api/v1/pages/${pageId}`);
          }}
        >
          create text
        </button>
      </li>
      <li>
        <button
          onClick={async () => {
            const block = (await createBlock({
              pageId: pageId,
              type: "link",
              nextTo: blockId,
              properties: {},
            })) as ILinkBlock;
            router.push(block.properties.linkId);
          }}
        >
          create sub page
        </button>
      </li>
      <li>
        <button
          onClick={async () => {
            await deleteBlock({
              blockId,
            });
            mutate(`/api/v1/pages/${pageId}`);
          }}
        >
          delete
        </button>
      </li>
    </ul>
  );
};

export default Menu;

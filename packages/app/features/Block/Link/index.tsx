import { BookOpenIcon } from "@heroicons/react/outline";
import { Block } from "@prisma/client";
import { useRouter } from "next/router";

import usePage from "../../../hooks/usePage";
import { Decoration, IBaseTextBlock } from "../../../lib/type";

export interface ILinkBlock extends IBaseTextBlock {
  type: "text";
  properties: {
    title?: Decoration | undefined;
    linkId: string;
  };
}

interface IProps {
  block: ILinkBlock;
}

const Link = (props: IProps) => {
  const { block } = props;
  const router = useRouter();
  const page = usePage(block.properties.linkId);

  return (
    <div
      className="cursor-pointer flex items-center"
      onClick={() => {
        router.push(block.properties.linkId);
      }}
    >
      <BookOpenIcon className="h-5" />
      <div>Link {page?.name ?? "untitled"}</div>
    </div>
  );
};

export default Link;

export const isLinkBlock = (block?: Block): block is ILinkBlock => {
  if (block?.type === "link") {
    return true;
  }
  return false;
};

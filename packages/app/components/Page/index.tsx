import { Fragment } from "react";

import usePage from "../../hooks/usePage";
import { useParsedBlocksOrder } from "../../store/blocksOrder";
import Block from "../Block";
import Empty from "./Empty";

interface IProps {
  pageId: string;
}

const Page = (props: IProps) => {
  const { pageId } = props;
  const { data: page } = usePage(pageId);

  const parsedBlockOrder = useParsedBlocksOrder();

  return (
    <Fragment>
      <div className="flex-1 flex flex-col ">
        <div className="h-12">head</div>
        <div className="flex-1 h-full">
          <div className="flex flex-1 justify-center">
            <div className="pl-24 w-3/5">
              {page?.name != null ? page.name : "untitled"}
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="px-24 w-3/5 pb-36 max-w-5xl">
              {parsedBlockOrder.length === 0 && <Empty pageId={pageId} />}
              {parsedBlockOrder.map((blockId) => {
                return <Block key={blockId} blockId={blockId} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;

import { Fragment } from "react";

import usePage from "../../hooks/usePage";
import Block from "../Block";

interface IProps {
  pageId: string;
}

const Page = (props: IProps) => {
  const { pageId } = props;
  const { data: page } = usePage(pageId);

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
              {page?.blocks.length === 0 && <div>click create block</div>}
              {page?.blocks.map((block) => {
                return <Block key={block.id} blockId={block.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;

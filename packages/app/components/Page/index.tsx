import {
  closestCenter,
  DndContext,
  MouseSensor,
  useDroppable,
  useSensors,
} from "@dnd-kit/core";
import { useSensor } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import useBlockOrder from "../../hooks/useBlockOrder";
import usePage from "../../hooks/usePage";
import Block from "../Block";
import Empty from "./Empty";
import Head from "./Head";

interface IProps {
  pageId: string;
}

const Page = (props: IProps) => {
  const { pageId } = props;
  const page = usePage(pageId);
  const blockOrder = useBlockOrder(pageId);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const { setNodeRef } = useDroppable({ id: "page" });

  return (
    <div className="h-full w-full">
      <div className="h-full">
        <Head />
        <div className="flex justify-center">
          <div className="w-4/5 xl:px-16 max-w-5xl">
            {page?.name != null ? page.name : "untitled"}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-4/5 xl:px-16 max-w-5xl lg:pb-36">
            {(blockOrder == null || blockOrder?.length === 0) && (
              <Empty pageId={pageId} />
            )}
            {blockOrder && (
              <DndContext sensors={sensors} collisionDetection={closestCenter}>
                <SortableContext
                  id={"page"}
                  items={blockOrder}
                  strategy={rectSortingStrategy}
                >
                  <div ref={setNodeRef} style={{ background: "#e2dfdf" }}>
                    {blockOrder?.map((blockId) => {
                      return <Block key={blockId} blockId={blockId} />;
                    })}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

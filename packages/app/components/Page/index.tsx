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
      <label htmlFor="chaofeng-drawer" className="lg:hidden">
        Open drawer
      </label>
      <div className="flex-1 h-full">
        <div className="flex flex-1 justify-center">
          <div className="lg:px-24 w-3/5 lg:pb-36">
            {page?.name != null ? page.name : "untitled"}
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="lg:px-24 w-3/5 lg:pb-36 max-w-5xl">
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

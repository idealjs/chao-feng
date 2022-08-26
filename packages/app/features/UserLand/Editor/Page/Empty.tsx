import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { useSWRConfig } from "swr";

import useCreateBlock from "../../../../hooks/api/useCreateBlock";

interface IProps {
  pageId: string;
}

const Empty = (props: IProps) => {
  const { pageId } = props;
  const createBlock = useCreateBlock();
  const { mutate } = useSWRConfig();

  return (
    <div
      onClick={async () => {
        await createBlock({
          pageId,
          type: "text",
          properties: schema
            .node("doc", null, [
              schema.node("paragraph", null, [schema.text("hello ")]),
              schema.node("paragraph", null, [schema.text("world!")]),
            ])
            .toJSON(),
        });
        mutate(`/api/v1/pages/${pageId}`);
      }}
    >
      click create block
    </div>
  );
};
export default Empty;

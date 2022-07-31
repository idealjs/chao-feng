import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { prosemirrorJSONToYDoc } from "y-prosemirror";
import { Doc } from "yjs";

import MockEditor from "../components/MockEditor";
import SocketProvider from "../features/SocketProvider";
import { YDocProvider } from "../lib/react-yjs";

interface IProps {
  yDoc: Doc | null;
}

const Editor = (props: IProps) => {
  const { yDoc } = props;
  console.log("test test", yDoc);
  return (
    <YDocProvider yDoc={yDoc}>
      <SocketProvider
        uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL}
        opts={{ query: { pageId: "mockeditor" } }}
      >
        <MockEditor />
      </SocketProvider>
    </YDocProvider>
  );
};

export default Editor;

export async function getServerSideProps() {
  const pageId = "cl5wpenib0059dkv95zhlhati";
  const page = await prisma.page.findUnique({
    where: {
      id: pageId,
    },
    include: {
      blocks: true,
    },
  });

  const yDoc = new Doc();

  yDoc
    .getArray("blockOrder")
    .insert(0, (page?.blockOrder as string[] | undefined) ?? []);

  page?.blocks.forEach((block) => {
    const subDoc = prosemirrorJSONToYDoc(schema, {
      type: "doc",
      content: [],
    });
    yDoc.getMap(pageId).set(block.id, subDoc);
  });

  return {
    props: {
      yDoc: null,
    }, // will be passed to the page component as props
  };
}

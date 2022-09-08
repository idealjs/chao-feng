import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { Socket } from "socket.io";
import { Doc } from "yjs";

const onRootDocUpdated =
  (options: { socket: Socket; yDoc: Doc }) =>
  async (msg: { pageId: string }) => {
    const { socket, yDoc } = options;

    console.debug("[debug] ROOT_DOC_UPDATED", msg.pageId);

    const page = await prisma.page.findUnique({ where: { id: msg.pageId } });

    if (page == null) {
      return;
    }

    yDoc.getMap("pages").set(msg.pageId, page);
  };

export default onRootDocUpdated;

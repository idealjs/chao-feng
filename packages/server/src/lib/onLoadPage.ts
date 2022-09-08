import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import type { Page } from "prisma/prisma-client";
import { Socket } from "socket.io";
import { Doc, encodeStateAsUpdate } from "yjs";

const onLoadPage =
  (options: { socket: Socket; yDoc: Doc }) =>
  async (msg: { pageId: string }) => {
    const { socket, yDoc } = options;

    console.debug("[debug] LOAD_PAGE", msg.pageId);

    let page = yDoc.getMap<Page>("pages").get(msg.pageId) ?? null;
    if (page == null) {
      page = await prisma.page.findUnique({ where: { id: msg.pageId } });
      if (page == null) {
        return;
      }
      yDoc.getMap("pages").set(msg.pageId, page);
    } else {
      const update = encodeStateAsUpdate(yDoc);

      socket.emit("DOC_UPDATE", {
        update: update,
      });
    }
  };

export default onLoadPage;

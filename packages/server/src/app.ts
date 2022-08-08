import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { Array, Doc, encodeStateAsUpdate, Map } from "yjs";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { prosemirrorJSONToYDoc } from "y-prosemirror";
const io = new Server({
  cors: {
    origin: "*",
  },
});

const yDoc = new Doc();

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

pubClient.connect();
subClient.connect();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", async (socket) => {
  const { pageId } = socket.handshake.query as {
    pageId: string | undefined;
  };
  // verify token

  if (pageId == null) {
    socket.emit("error", {
      msg: "missing pageId",
    });
    socket.disconnect(true);
    return;
  }
  socket.join(pageId);

  socket.on("PAGE_DOC_INIT", async (msg: { pageId: string }) => {
    console.debug("[debug] PAGE_DOC_INIT", msg.pageId);

    let pageMap = yDoc.getMap<Map<unknown>>("pages").get(msg.pageId);
    if (pageMap == null) {
      const page = await prisma.page.findUnique({ where: { id: msg.pageId } });
      if (page == null) {
        return;
      }
      const pageMap = new Map(Object.entries(page));
      yDoc.getMap("pages").set(msg.pageId, pageMap);
    } else {
      const update = encodeStateAsUpdate(yDoc);

      socket.emit("DOC_UPDATE", {
        update: update,
      });
    }
  });

  socket.on("BLOCK_DOC_INIT", async (msg: { blockId: string }) => {
    console.debug("[debug] BLOCK_DOC_INIT", msg.blockId);

    let blockMap = yDoc.getMap<Map<unknown>>("blocks").get(msg.blockId);
    if (blockMap == null) {
      const block = await prisma.block.findUnique({
        where: { id: msg.blockId },
      });

      if (block == null) {
        return;
      }
      const { createdAt, updatedAt, ...mappable } = block;
      const blockMap = new Map(Object.entries(mappable));
      yDoc.getMap("blocks").set(msg.blockId, blockMap);
    } else {
      const update = encodeStateAsUpdate(yDoc);

      socket.emit("DOC_UPDATE", {
        update: update,
      });
    }
  });

  socket.on("ROOT_DOC_INIT", async () => {
    yDoc.on("update", (update) => {
      socket.emit("DOC_UPDATE", { update });
    });
  });
});

export default io;

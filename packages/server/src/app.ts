import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { Doc, encodeStateAsUpdate } from "yjs";

const io = new Server({
  cors: {
    origin: "*",
  },
});

const doc = new Doc();

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

pubClient.connect();
subClient.connect();

io.adapter(createAdapter(pubClient, subClient));

doc.on("subdocs", (data) => {
  // console.log("test test doc loaded", data);
});

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

  socket.on("BLOCK_DOC_UPDATE", (msg: { pageId: string; blockId: string }) => {
    socket.to(pageId).emit("BLOCK_DOC_UPDATE", {});
  });

  socket.on("BLOCK_DOC_LOAD", (msg: { guid: string }) => {
    socket.emit("BLOCK_DOC_LOAD", {});
  });

  socket.on("DOC_LOAD", (msg: { guid: string }) => {
    new Doc({ guid: msg.guid });

    console.log("test test DOC_LOAD", msg);
    // socket.emit("PAGE_DOC_LOAD", {});
  });

  socket.on("PAGE_DOC_INIT", async () => {
    const page = await prisma.page.findUnique({ where: { id: pageId } });

    const subDoc = new Doc({ guid: pageId });
    doc.getMap("pages").set(pageId, subDoc);

    subDoc
      .getArray("blockOrder")
      .insert(0, (page?.blockOrder as string[] | undefined) ?? ["a", "b", "c"]);

    const update = encodeStateAsUpdate(doc);

    socket.emit("PAGE_DOC_INIT", {
      pageId,
      update: update,
    });
  });
});

export default io;

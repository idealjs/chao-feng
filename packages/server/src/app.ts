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

const yDoc = new Doc();

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

pubClient.connect();
subClient.connect();

io.adapter(createAdapter(pubClient, subClient));

yDoc.on(
  "subdocs",
  ({
    loaded,
    added,
  }: {
    loaded: Set<Doc>;
    added: Set<Doc>;
    removed: Set<Doc>;
  }) => {
    added.forEach((subDoc) => {
      subDoc.on("update", (update) => {});
    });
    console.log(
      "test test doc subdocs",
      yDoc.getMap<Doc>("pages").get("abc")?.getArray("blockOrder").toJSON()
    );

    added.forEach((doc) => {
      console.log("test test doc added", doc.toJSON(), loaded.has(doc));
    });

    loaded.forEach((doc) => {
      console.log("test test doc loaded", doc.toJSON());
    });
  }
);

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

  socket.on("PAGE_DOC_INIT", async (msg: { pageId: string }) => {
    console.log("test test PAGE_DOC_INIT", msg);
    let pageDoc = yDoc.getMap<Doc>("pages").get(msg.pageId);
    if (pageDoc == null) {
      const page = await prisma.page.findUnique({ where: { id: pageId } });
      pageDoc = new Doc({ guid: pageId });
      pageDoc
        .getArray("blockOrder")
        .insert(
          0,
          (page?.blockOrder as string[] | undefined) ?? ["a", "b", "c"]
        );
      yDoc.getMap("pages").set(pageId, pageDoc);
    }
    const update = encodeStateAsUpdate(pageDoc);

    pageDoc.on("update", (update) => {
      socket.emit("PAGE_DOC_UPDATE", {
        pageId: msg.pageId,
        update,
      });
    });

    socket.emit("PAGE_DOC_UPDATE", {
      pageId,
      update: update,
    });
  });

  socket.on("ROOT_DOC_INIT", async () => {
    // if (!yDoc.getSubdocGuids().has(pageId)) {
    //   const page = await prisma.page.findUnique({ where: { id: pageId } });
    //   const subDoc = new Doc({ guid: pageId });
    //   subDoc
    //     .getArray("blockOrder")
    //     .insert(
    //       0,
    //       (page?.blockOrder as string[] | undefined) ?? ["a", "b", "c"]
    //     );
    //   yDoc.getMap("pages").set(pageId, subDoc);
    // }
    // const update = encodeStateAsUpdate(yDoc);
    // socket.emit("ROOT_DOC_UPDATE", {
    //   pageId,
    //   update: update,
    // });
  });
});

export default io;

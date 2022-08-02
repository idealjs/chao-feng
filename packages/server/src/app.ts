import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const io = new Server({
  cors: {
    origin: "*",
  },
});

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

pubClient.connect();
subClient.connect();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
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

  socket.on("DOC_UPDATE", (msg: { pageId: string; blockId: string }) => {
    socket.to(pageId).emit("DOC_UPDATE", {});
  });

  socket.on("DOC_LOAD", (msg: { blockId: string }) => {
    socket.emit("DOC_UPDATE", {});
  });
});

export default io;

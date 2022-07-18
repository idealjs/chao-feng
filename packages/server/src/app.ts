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

  socket.on("updated", (msg: { updatedUrl: string | undefined }) => {
    const { updatedUrl } = msg;
    socket.to(pageId).emit("updated", { updatedUrl });
  });
  socket.on("created", (msg: { parentUrl: string | undefined }) => {
    const { parentUrl } = msg;
    socket.to(pageId).emit("created", { parentUrl });
  });
  socket.on("deleted", (msg: { parentUrl: string | undefined }) => {
    const { parentUrl } = msg;
    socket.to(pageId).emit("deleted", { parentUrl });
  });
});

export default io;
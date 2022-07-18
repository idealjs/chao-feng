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

  socket.on("updated", (msg: { updatedUrl: string | undefined }) => {
    console.log("test test updated", msg);
    const { updatedUrl } = msg;
    socket.to(pageId).emit("updated", { updatedUrl });
  });
});

export default io;

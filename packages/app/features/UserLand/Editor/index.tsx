import { useRouter } from "next/router";

import MockEditor from "../../../components/MockEditor";
import { useYDocSocket } from "../../../lib/react-yjs/";
import Page from "../../Page";
import SideDrawer from "../../SideDrawer";
import { useSocket } from "../../SocketProvider";

const Editor = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  const socket = useSocket();
  useYDocSocket(socket);

  return (
    <div className="drawer drawer-mobile">
      <input id="chaofeng-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {pid && <Page pageId={pid} />}
        <MockEditor />
      </div>
      <div className="drawer-side">
        <label htmlFor="chaofeng-drawer" className="drawer-overlay"></label>
        <SideDrawer />
      </div>
    </div>
  );
};

export default Editor;

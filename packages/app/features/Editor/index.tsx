import usePageId from "../../hooks/usePageId";
import useYDocSocket from "../../hooks/yjs/useYDocSocket";
import EditorPage from "../EditorPage";
import SideDrawer from "../SideDrawer";
import { useSocket } from "../SocketProvider";

const Editor = () => {
  const pageId = usePageId();
  const socket = useSocket();
  useYDocSocket(socket);

  return (
    <div className="drawer drawer-mobile">
      <input id="chaofeng-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {pageId && <EditorPage pageId={pageId} />}
      </div>
      <div className="drawer-side">
        <label htmlFor="chaofeng-drawer" className="drawer-overlay"></label>
        <SideDrawer />
      </div>
    </div>
  );
};

export default Editor;

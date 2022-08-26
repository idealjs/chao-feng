import usePageId from "../../../hooks/usePageId";
import useLoadPageDoc from "../../../hooks/yjs/useLoadPage";
import { useYDocSocket } from "../../../lib/react-yjs/";
import SideDrawer from "../../SideDrawer";
import { useSocket } from "../../SocketProvider";
import Page from "./Page";

const Editor = () => {
  const pageId = usePageId();
  const socket = useSocket();
  useYDocSocket(socket);
  useLoadPageDoc(pageId);

  return (
    <div className="drawer drawer-mobile">
      <input id="chaofeng-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {pageId && <Page pageId={pageId} />}
      </div>
      <div className="drawer-side">
        <label htmlFor="chaofeng-drawer" className="drawer-overlay"></label>
        <SideDrawer />
      </div>
    </div>
  );
};

export default Editor;

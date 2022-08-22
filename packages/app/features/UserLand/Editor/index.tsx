import { useRouter } from "next/router";

import MockEditor from "../../../components/MockEditor";
import usePageId from "../../../hooks/usePageId";
import useInitPageDoc from "../../../hooks/yjs/useInitPageDoc";
import { useYDocSocket } from "../../../lib/react-yjs/";
import Page from "../../Page";
import SideDrawer from "../../SideDrawer";
import { useSocket } from "../../SocketProvider";

const Editor = () => {
  const pageId = usePageId();
  const socket = useSocket();
  useYDocSocket(socket);
  useInitPageDoc(pageId);

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

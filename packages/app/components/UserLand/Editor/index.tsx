import { useRouter } from "next/router";

import { createStore } from "../../../lib/react-rxjs";
import Page from "../../Page";
import SideDrawer from "../../Sidebar";

export const sidebarHiddenStore = createStore<boolean | null>(null);

const Editor = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };

  return (
    <div className="drawer drawer-mobile">
      <input id="chaofeng-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="chaofeng-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        {pid && <Page pageId={pid} />}
      </div>
      <div className="drawer-side">
        <label htmlFor="chaofeng-drawer" className="drawer-overlay"></label>
        <SideDrawer />
      </div>
    </div>
  );
};

export default Editor;

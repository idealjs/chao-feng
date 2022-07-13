import { useRouter } from "next/router";

import Page from "../../Page";
import SideDrawer from "../../SideDrawer";

const Editor = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };

  return (
    <div className="drawer drawer-mobile">
      <input id="chaofeng-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
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

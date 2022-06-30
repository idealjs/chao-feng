import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

import usePage from "../../../hooks/usePage";
import useWorkspace from "../../../hooks/useWorkspace";
import { useSetBlocksOrder } from "../../../store/blocksOrder";
import Page from "../../Page";
import Profile from "./Profile";

const Editor = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string };
  const { data: page } = usePage(pid);
  const { data: workspace } = useWorkspace(page?.workspaceId);

  const setBlocksOrder = useSetBlocksOrder();

  useEffect(() => {
    setBlocksOrder(page?.blocksOrder);
  }, [page?.blocksOrder, setBlocksOrder]);

  return (
    <div className="h-screen w-screen flex divide-x">
      <div className="w-64">
        <div>{workspace && <Profile currentWorkspace={workspace} />}</div>
        <div>
          <span>sidebar pid:{pid}</span>
        </div>
        <div>
          <span>workspace name:{workspace?.name}</span>
        </div>
        <button
          onClick={async () => {
            await signOut({ callbackUrl: "/" });
          }}
        >
          signout
        </button>
      </div>
      <Page pageId={pid} />
    </div>
  );
};

export default Editor;

import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import usePage from "../../../hooks/usePage";
import useWorkspace from "../../../hooks/useWorkspace";
import Page from "../../Page";
import Profile from "./Profile";

const Editor = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string };
  const { data: page } = usePage(pid);
  const { data: workspace } = useWorkspace(page?.workspaceId);

  return (
    <div className="h-screen w-screen flex">
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
      <div className="flex-none divide-x"></div>
      <Page pageId={pid} />
    </div>
  );
};

export default Editor;

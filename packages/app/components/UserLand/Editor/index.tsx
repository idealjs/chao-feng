import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import usePage from "../../../hooks/usePage";
import useWorkspace from "../../../hooks/useWorkspace";
import Page from "../../Page";
import Profile from "./Profile";

const Editor = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  const page = usePage(pid);
  const workspace = useWorkspace(page?.workspaceId);

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
      {pid && <Page pageId={pid} />}
    </div>
  );
};

export default Editor;

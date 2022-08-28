import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import usePage from "../../hooks/usePage";
import useWorkspaceRouter from "../../hooks/useWorkspaceRouter";
import Profile from "./Profile";

const SideDrawer = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  const page = usePage(pid);
  const workspace = useWorkspaceRouter(page?.workspaceId);

  return (
    <div className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content sm:border-r-2 sm:border-gray-300 flex justify-between	">
      {/* <div>{workspace && <Profile currentWorkspace={workspace} />}</div> */}
      <ul>
        {/* <li>
          <a>sidebar pid:{pid}</a>
        </li> */}
        <li>
          <a>workspace name:{workspace?.name}</a>
        </li>
      </ul>
      <ul>
        <li
          onClick={async () => {
            await signOut({ callbackUrl: "/" });
          }}
        >
          <a>sign out</a>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;

import clsx from "clsx";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import useDefaultHidden from "../../../hooks/responsive/useDefaultHidden";
import useTouchAway from "../../../hooks/responsive/useTouchAway";
import usePage from "../../../hooks/usePage";
import useWorkspace from "../../../hooks/useWorkspace";
import {
  createStore,
  useStoreNext,
  useStoreSelector,
} from "../../../lib/react-rxjs";
import Page from "../../Page";
import Profile from "./Profile";

export const sidebarHiddenStore = createStore<boolean | null>(null);

const Editor = () => {
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  const page = usePage(pid);
  const workspace = useWorkspace(page?.workspaceId);

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

        <div className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content sm:border-r-2 sm:border-gray-300">
          <div>{workspace && <Profile currentWorkspace={workspace} />}</div>
          <ul>
            <li>
              <a>sidebar pid:{pid}</a>
            </li>
            <li>
              <a>workspace name:{workspace?.name}</a>
            </li>
            <li
              onClick={async () => {
                await signOut({ callbackUrl: "/" });
              }}
            >
              <a>sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;

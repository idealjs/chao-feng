import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { Fragment, useRef } from "react";
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
  const smBreakPoint = useMediaQuery({ minWidth: 640 });
  const defaultHidden = useDefaultHidden();

  const hidden = useStoreSelector(sidebarHiddenStore, (hidden) => {
    return hidden != null ? hidden : defaultHidden;
  });
  const setHidden = useStoreNext(sidebarHiddenStore);

  const ref = useTouchAway(() => {
    setHidden(true);
  });

  return (
    <div className="h-screen w-screen flex relative">
      <div
        ref={ref}
        className={clsx(
          "w-64 ease-in-out duration-300 h-full sm:border-r-2 sm:border-gray-300 bg-slate-400",
          {
            absolute: !smBreakPoint,
            hidden,
          }
        )}
      >
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

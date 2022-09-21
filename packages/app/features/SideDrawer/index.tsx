import Link from "next/link";
import { signOut } from "next-auth/react";

import WorkspaceMenu from "./WorkspaceMenu";

const SideDrawer = () => {
  return (
    <aside className="bg-base-200 w-80 sm:border-r-2 sm:border-gray-300 flex flex-col">
      <div className="sticky flex items-baseline px-4 py-2 gap-2">
        <Link href="https://github.com/idealjs/chao-feng">
          <div className="btn btn-ghost px-2 font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
            <span className="lowercase">cháofēng</span>
          </div>
        </Link>
        <div data-tip="Changelog" className="tooltip tooltip-bottom">
          {process.env.NEXT_PUBLIC_APP_VERSION}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <WorkspaceMenu />

        <ul className="menu menu-compact lg:menu-normal rounded-box p-4">
          <li
            onClick={async () => {
              await signOut({ callbackUrl: "/" });
            }}
          >
            <a>sign out</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideDrawer;

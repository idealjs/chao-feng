import React from "react";

import usePageId from "../../../hooks/usePageId";
import useProfile from "../../../hooks/useProfile";
import useWorkspaceRouter from "../../../hooks/useWorkspaceRouter";
import usePage from "../../../hooks/yjs/usePage";

const WorkspaceMenu = () => {
  const { profile } = useProfile();
  const pageId = usePageId();
  const page = usePage(pageId);
  const workspace = useWorkspaceRouter(page?.workspaceId);

  return (
    <div className="collapse hover:bg-base-content hover:bg-opacity-10 overflow-visible rounded-box ">
      <input type="checkbox" />
      <div className="collapse-title">{workspace?.name}</div>
      <div className="collapse-content absolute">
        <ul className="menu bg-base-100 w-full rounded-box z-10">
          {profile?.workspaces.map((workspace) => {
            return (
              <li key={workspace.id}>
                <a>{workspace.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WorkspaceMenu;

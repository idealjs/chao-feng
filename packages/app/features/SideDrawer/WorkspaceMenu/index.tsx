import React from "react";

import DropdownMenu from "../../../components/DropdownMenu";
import DropdownMenuButton from "../../../components/DropdownMenu/DropdownMenuButton";
import DropdownMenuItem from "../../../components/DropdownMenu/DropdownMenuItem";
import DropdownMenuItems from "../../../components/DropdownMenu/DropdownMenuItems";
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
    <DropdownMenu>
      <DropdownMenuButton className="dropdown-menu-arrow">
        {workspace?.name}
      </DropdownMenuButton>
      <DropdownMenuItems className="menu">
        {profile?.workspaces.map((workspace) => {
          return (
            <DropdownMenuItem
              className="cursor-pointer"
              key={workspace.id}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <a>{workspace.name}</a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuItems>
    </DropdownMenu>
  );
};

export default WorkspaceMenu;

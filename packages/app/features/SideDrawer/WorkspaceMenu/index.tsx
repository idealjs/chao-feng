import React from "react";

import usePageId from "../../../hooks/usePageId";
import useWorkspaceRouter from "../../../hooks/useWorkspaceRouter";
import usePage from "../../../hooks/yjs/usePage";

const WorkspaceMenu = () => {
  const pageId = usePageId();
  const page = usePage(pageId);
  const workspace = useWorkspaceRouter(page?.workspaceId);

  return (
    <div tabIndex={0} className={"block"}>
      {workspace?.name}
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 flex"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};

export default WorkspaceMenu;

import { Workspace } from "@prisma/client";
import { useRouter } from "next/router";
import { Fragment } from "react";

import useProfile from "../../../hooks/useProfile";

interface IProps {
  currentWorkspace: Workspace;
}

const Profile = (props: IProps) => {
  const { currentWorkspace } = props;

  const profile = useProfile();

  return (
    <div></div>
    // <Menu as="div" className={"relative"}>
    //   <Menu.Button>{currentWorkspace.name}</Menu.Button>
    //   <Transition
    //     as={Fragment}
    //     enter="transition ease-out duration-100"
    //     enterFrom="transform opacity-0 scale-95"
    //     enterTo="transform opacity-100 scale-100"
    //     leave="transition ease-in duration-75"
    //     leaveFrom="transform opacity-100 scale-100"
    //     leaveTo="transform opacity-0 scale-95"
    //   >
    //     <Menu.Items
    //       className={
    //         "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    //       }
    //     >
    //       {profile?.workspaces.map((workspace) => {
    //         return (
    //           <Menu.Item key={workspace.id} as={"div"}>
    //             {workspace.name}
    //           </Menu.Item>
    //         );
    //       })}
    //     </Menu.Items>
    //   </Transition>
    // </Menu>
  );
};

export default Profile;

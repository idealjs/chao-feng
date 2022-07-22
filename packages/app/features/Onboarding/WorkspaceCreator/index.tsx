import { useRouter } from "next/router";
import { useRef } from "react";
import { useSWRConfig } from "swr";

import useCreateWorkspace from "../../../hooks/api/useCreateWorkspace";
import useProfile from "../../../hooks/useProfile";

const WorkspaceCreator = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { mutate } = useSWRConfig();

  const createWorkspace = useCreateWorkspace();
  const profile = useProfile();
  const router = useRouter();

  if (profile?.lastActive != null) {
    router.push(`/${profile.lastActive}`);
  }

  return (
    <div>
      <input type="text" ref={ref} />
      <button
        onClick={async () => {
          if (ref.current?.value != null && ref.current?.value !== "") {
            await createWorkspace(ref.current.value);
            mutate("/api/v1/profile");
          }
        }}
      >
        next
      </button>
    </div>
  );
};
export default WorkspaceCreator;
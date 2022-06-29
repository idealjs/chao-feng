import { useRef } from "react";

import useCreateWorkspace from "../../../hooks/useCreateWorkspace";

const WorkspaceCreator = () => {
  const ref = useRef<HTMLInputElement>(null);
  const createWorkspace = useCreateWorkspace();
  return (
    <div>
      <input type="text" ref={ref} />
      <button
        onClick={async () => {
          if (ref.current?.value != null && ref.current?.value !== "") {
            await createWorkspace(ref.current.value);
          }
        }}
      >
        next
      </button>
    </div>
  );
};
export default WorkspaceCreator;

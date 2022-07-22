import { useRouter } from "next/router";
import { useRef } from "react";
import { useSWRConfig } from "swr";

import useCreateWorkspace from "../../hooks/api/useCreateWorkspace";
import useProfile from "../../hooks/useProfile";

const Onboarding = () => {
  const profile = useProfile();
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { mutate } = useSWRConfig();

  const createWorkspace = useCreateWorkspace();

  if (profile?.lastActive) {
    router.push(`/${profile.lastActive}`);
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create Your Workspace</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Workspace Name</span>
              </label>
              <input
                type="text"
                placeholder="workspace name"
                className="input input-bordered"
                ref={ref}
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  if (ref.current?.value != null && ref.current?.value !== "") {
                    await createWorkspace(ref.current.value);
                    mutate("/api/v1/profile");
                  }
                }}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Onboarding;

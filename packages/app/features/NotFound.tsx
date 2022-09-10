import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NotFound = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Permission Denied</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                router.push("/");
              }}
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Page not found</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                router.push("/");
              }}
            >
              Back to my content
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default NotFound;

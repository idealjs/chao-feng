import { useSession } from "next-auth/react";
import { Fragment } from "react";

import Profile from "./Profile";
import SignIn from "./SignIn";

const Test = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return null;
  }

  return <Fragment>{data ? <Profile session={data} /> : <SignIn />}</Fragment>;
};

export default Test;

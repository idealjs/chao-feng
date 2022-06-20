import { signIn } from "next-auth/react";

const Intro = () => {
  return (
    <div>
      <div>Not signed in</div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default Intro;

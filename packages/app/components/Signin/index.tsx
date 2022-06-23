import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

import checkEmail from "./checkEmail";

const Signin = () => {
  const [hasEmail, setHasEmail] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const verCodeRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input ref={emailRef} type="text" placeholder="input email" />
      {hasEmail && (
        <input ref={verCodeRef} type="text" placeholder="verification code" />
      )}
      <button
        onClick={async () => {
          if (!hasEmail) {
            const res = await checkEmail(emailRef.current?.value);
            if (res.data.hasEmail) {
              setHasEmail(true);
            }
          }
          if (hasEmail) {
            signIn("verCode", {
              email: emailRef.current?.value,
              verCode: verCodeRef.current?.value,
            });
          }
        }}
      >
        next
      </button>
    </div>
  );
};

export default Signin;

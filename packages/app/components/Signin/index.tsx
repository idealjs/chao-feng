import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

import checkAuth from "./checkAuth";

const Signin = () => {
  const [checked, setChecked] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const verCodeRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  return (
    <div>
      <input
        name="email"
        ref={emailRef}
        type="text"
        placeholder="input email"
        autoComplete={"on"}
      />
      {checked && (
        <input ref={verCodeRef} type="text" placeholder="verification code" />
      )}
      <button
        onClick={async () => {
          if (!checked) {
            const res = await checkAuth(emailRef.current?.value);
            if (res.allow) {
              await signIn("email", {
                email: emailRef.current?.value,
                redirect: false,
                callbackUrl: "/onboarding",
              });
              setChecked(true);
            }
          }
          if (checked) {
            const params = new URLSearchParams({
              callbackUrl: `${router.query.callbackUrl}`,
              token: verCodeRef.current?.value ?? "",
              email: emailRef.current?.value ?? "",
            });

            window.location.href = `${
              router.basePath
            }/api/auth/callback/email?${params.toString()}`;
          }
        }}
      >
        next
      </button>
    </div>
  );
};

export default Signin;

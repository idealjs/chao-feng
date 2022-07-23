import { useRef, useState } from "react";

interface IProps {
  check?: (input: string | undefined) => Promise<boolean>;
  next?: (
    input: string | undefined,
    nextInput: string | undefined
  ) => Promise<void>;
}

const HeroInput = (props: IProps) => {
  const { check, next } = props;
  const [checked, setChecked] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const verCodeRef = useRef<HTMLInputElement>(null);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
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
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder="email"
                className="input input-bordered"
                autoComplete={"on"}
                ref={emailRef}
              />
            </div>
            {checked && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Security Code</span>
                </label>
                <input
                  type="text"
                  placeholder="security code"
                  className="input input-bordered"
                  ref={verCodeRef}
                />
              </div>
            )}

            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  if (!checked) {
                    if (await check?.(emailRef.current?.value)) {
                      setChecked(true);
                    }
                  }
                  if (checked) {
                    await next?.(
                      emailRef.current?.value,
                      verCodeRef.current?.value
                    );
                  }
                }}
              >
                {checked ? "Login" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInput;

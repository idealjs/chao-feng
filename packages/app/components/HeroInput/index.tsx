import { useRef, useState } from "react";

interface IProps {
  title?: string;
  content?: string;
  input?: {
    label: string;
    placeholder: string;
  };
  nextInput?: {
    label: string;
    placeholder: string;
  };
  button?: {
    check?: string;
    next?: string;
  };
  check?: (input: string | undefined) => Promise<boolean> | boolean;
  next?: (
    input: string | undefined,
    nextInput: string | undefined
  ) => Promise<void> | void;
}

const HeroInput = (props: IProps) => {
  const { title, content, input, nextInput, button, check, next } = props;

  const [checked, setChecked] = useState(check == null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          {title != null && <h1 className="text-5xl font-bold">{title}</h1>}
          <p className="py-6">{content}</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{input?.label}</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder={input?.placeholder}
                className="input input-bordered"
                autoComplete={"on"}
                ref={inputRef}
              />
            </div>
            {checked && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{nextInput?.label}</span>
                </label>
                <input
                  type="text"
                  placeholder={nextInput?.placeholder}
                  className="input input-bordered"
                  ref={nextInputRef}
                />
              </div>
            )}

            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  if (!checked) {
                    if (await check?.(inputRef.current?.value)) {
                      setChecked(true);
                    }
                  }
                  if (checked) {
                    await next?.(
                      inputRef.current?.value,
                      nextInputRef.current?.value
                    );
                  }
                }}
              >
                {checked ? button?.next : button?.check}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInput;

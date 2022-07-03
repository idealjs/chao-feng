import { MenuIcon, PlusIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

import useCreateBlock from "../../../hooks/useCreateBlock";

const toolbox = clsx(
  "z-50 h-full",
  "flex items-center",
  "invisible group-hover:visible",
  "whitespace-nowrap absolute right-full"
);

interface IProps {
  className?: string;
}

const Toolbox = (props: IProps) => {
  const { className } = props;
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  const createBlock = useCreateBlock(pid!);

  return (
    <div className={clsx(toolbox, className)}>
      <button
        className="h-5 w-5 mr-2"
        onClick={async () => {
          const block = await createBlock({ type: "", properties: {} });
          mutate(`/api/v1/pages/${pid}`);
        }}
      >
        <PlusIcon />
      </button>
      <button className="h-5 w-5 mr-2">
        <MenuIcon />
      </button>
    </div>
  );
};

export default Toolbox;

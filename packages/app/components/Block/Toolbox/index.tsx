import { MenuIcon, PlusIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

import useCreateBlock from "../../../hooks/useCreateBlock";

const toolbox = clsx(
  "z-50 h-full",
  "flex items-center",
  "opacity-0 group-hover:opacity-100",
  "whitespace-nowrap absolute right-full"
);

interface IProps {
  blockId: string;
  className?: string;
}

const Toolbox = (props: IProps) => {
  const { className, blockId } = props;
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { pid } = router.query as { pid: string | undefined };
  const createBlock = useCreateBlock(pid!);

  return (
    <div className={clsx(toolbox, className)}>
      <button
        className="h-5 w-5 mr-2"
        onClick={async () => {
          await createBlock({ type: "text", properties: {}, nextTo: blockId });
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

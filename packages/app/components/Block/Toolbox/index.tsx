import { MenuIcon, PlusIcon } from "@heroicons/react/outline";
import clsx from "clsx";

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
  return (
    <div className={clsx(toolbox, className)}>
      <button className="h-5 w-5">
        <PlusIcon />
      </button>
      <button className="h-5 w-5">
        <MenuIcon />
      </button>
    </div>
  );
};

export default Toolbox;

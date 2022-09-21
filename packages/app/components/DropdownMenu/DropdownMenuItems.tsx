import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface IProps extends IPropsWithClassName {}

const DropdownMenuItems = (props: PropsWithChildren<IProps>) => {
  const { className, children } = props;

  return (
    <ul className={clsx("dropdown-menu-content", className)}>{children}</ul>
  );
};

export default DropdownMenuItems;

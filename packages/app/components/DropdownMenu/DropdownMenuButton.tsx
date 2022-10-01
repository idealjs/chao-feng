import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface IProps extends IPropsWithClassName {}

const DropdownMenuButton = (props: PropsWithChildren<IProps>) => {
  const { className, children } = props;

  return (
    <div className={clsx("dropdown-menu-button", className)}>{children}</div>
  );
};

export default DropdownMenuButton;

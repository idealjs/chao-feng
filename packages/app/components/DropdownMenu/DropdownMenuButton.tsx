import React, { forwardRef, PropsWithChildren } from "react";

interface IProps extends IPropsWithClassName {}

const DropdownMenuButton = (props: PropsWithChildren<IProps>) => {
  const { className, children } = props;

  return <div className={className}>{children}</div>;
};

export default DropdownMenuButton;

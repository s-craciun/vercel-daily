"use client";

import { type FC } from "react";
import { Button, type IButtonProps } from "./button";

interface IClientButtonProps extends IButtonProps {
  onClick?: () => void;
}

export const ClientButton: FC<IClientButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  );
};

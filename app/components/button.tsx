"use client";
import { FC } from "react";
import { ButtonVariants } from "../utils/constants";

interface IButtonProps {
  variant?: ButtonVariants;
  children: React.ReactNode;
  onClick?: () => void;
}

const buttonVariants = {
  [ButtonVariants.DEFAULT]:
    "inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90",
  [ButtonVariants.OUTLINE]:
    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
  [ButtonVariants.LINK]: "text-primary underline-offset-4 hover:underline",
};

export const Button: FC<IButtonProps> = ({ children, onClick, variant }) => {
  const className = buttonVariants[variant || ButtonVariants.DEFAULT];
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={className} onClick={onClick ? handleClick : undefined}>
      {children}
    </button>
  );
};

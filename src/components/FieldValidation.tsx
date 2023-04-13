import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface FieldValidationProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const FieldValidation = ({ children, ...props }: FieldValidationProps) => {
  return (
    <span className={clsx("block text-xs  mt-1 before:content-['*']")} {...props}>
      {children}
    </span>
  );
};

export default FieldValidation;

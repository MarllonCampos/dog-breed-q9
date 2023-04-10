import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface FieldValidationProps extends HTMLAttributes<HTMLSpanElement> {
  isValid: boolean;
  children: ReactNode;
}

const FieldValidation = ({ isValid = true, children, ...props }: FieldValidationProps) => {
  return (
    <span
      className={clsx("block text-xs text-gray-400 mt-1 before:content-['*']", {
        "text-red-300": isValid == false,
      })}
      {...props}
    >
      {children}
    </span>
  );
};

export default FieldValidation;

import React from "react";
import FieldValidation from "./FieldValidation";
import clsx from "clsx";

interface EmailValidationProps {
  isValid: boolean;
}

const EmailValidation = ({ isValid = true, ...props }: EmailValidationProps) => {
  return (
    <div className={clsx("text-gray-400", { "text-red-300": isValid === false })}>
      <FieldValidation>O email precisa ter um caractere antes e depois do &ldquo;@&rdquo;</FieldValidation>
      <FieldValidation>
        O email precisa ter um domínio válido, como &ldquo;gmail.com&rdquo; ou &ldquo;yahoo.co.uk&rdquo;
      </FieldValidation>
      <FieldValidation>Caracteres especiais são permitidos em partes específicas do email.</FieldValidation>
    </div>
  );
};

export default EmailValidation;

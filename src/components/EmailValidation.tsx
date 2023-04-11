import React from "react";
import FieldValidation from "./FieldValidation";

interface EmailValidationProps {
  isValid: boolean;
}

const EmailValidation = ({ isValid = true }: EmailValidationProps) => {
  return (
    <>
      <FieldValidation isValid={isValid}>
        O email precisa ter um caractere antes e depois do &ldquo;@&rdquo;
      </FieldValidation>
      <FieldValidation isValid={isValid}>
        O email precisa ter um domínio válido, como &ldquo;gmail.com&rdquo; ou &ldquo;yahoo.co.uk&rdquo;
      </FieldValidation>
      <FieldValidation isValid={isValid}>
        Caracteres especiais são permitidos em partes específicas do email.
      </FieldValidation>
    </>
  );
};

export default EmailValidation;

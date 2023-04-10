import React from "react";
import FieldValidation from "./FieldValidation";

interface EmailValidationProps {
  isValid: boolean;
}

const EmailValidation = ({ isValid = true }: EmailValidationProps) => {
  return (
    <>
      <FieldValidation isValid={isValid}>O email precisa ter um caractere antes e depois do "@"</FieldValidation>
      <FieldValidation isValid={isValid}>
        O email precisa ter um domínio válido, como "gmail.com" ou "yahoo.co.uk"
      </FieldValidation>
      <FieldValidation isValid={isValid}>
        O email precisa ter um domínio válido, como "gmail.com" ou "yahoo.co.uk"
      </FieldValidation>
    </>
  );
};

export default EmailValidation;

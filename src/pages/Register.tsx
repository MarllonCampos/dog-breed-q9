import React, { FormEvent, useState } from "react";
import dogImage from "../assets/dog.svg";
import Email from "../services/email";
import clsx from "clsx";
import EmailValidation from "../components/EmailValidation";
function Register() {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [email, setEmail] = useState("");

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = event.target.value;
    if (newEmail.length === 0) return setIsEmailValid(true);
    setIsEmailValid(Email.validateEmail(newEmail));
    setEmail(newEmail);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (Email.validateEmail(email) === false) return window.alert("Email não é válido por favor preencha corretamente");
  }

  return (
    <div className="flex h-screen">
      <div className="max-sm:hidden flex flex-1 bg-blue-300 items-center ">
        <img src={dogImage} alt="A dog" />
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-6">
        <form className="max-w-sm w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={clsx(
                "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-2 ring-blue-700 focus:border-transparent",
                { "text-red-400 ring-red-400 focus:border-transparent border-red-300": isEmailValid === false }
              )}
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
            />

            <EmailValidation isValid={isEmailValid} />
          </div>
          <div className="flex justify-center">
            <button
              className="
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded transition focus:outline-none  focus:ring-2 ring-offset-2 ring-blue-700 focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-blue-500"
              disabled={!isEmailValid}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

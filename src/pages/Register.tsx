import React, { FormEvent, useState } from "react";
import dogImage from "../assets/dog.svg";
import maleImage from "../assets/male.svg";
import Email from "../services/email";
import clsx from "clsx";
import EmailValidation from "../components/EmailValidation";
import LoadingSpinner from "../components/loadingSpinner";
import { api } from "../lib/api";
import { Storage } from "../services/storage";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = event.target.value;
    if (newEmail.length === 0) return setIsEmailValid(true);
    setIsEmailValid(Email.validateEmail(newEmail));
    setEmail(newEmail);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (Email.validateEmail(email) === false) {
      setIsEmailValid(false);
      return;
    }
    setLoading(true);

    api
      .post("/register", { email })
      .then((response) => {
        const token = response.data.user.token;
        Storage.saveToken(token);
        navigate("/list");
      })
      .catch(({ response }) => {
        alert(response.data.error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex h-screen">
      <div className="max-sm:hidden flex flex-1 bg-blue-300 items-center ">
        <img src={dogImage} alt="A dog" />
      </div>

      <div className="flex-1 bg-neutral-100 flex items-center justify-center p-6">
        <form className="max-w-sm w-full" onSubmit={handleSubmit}>
          <img src={maleImage} alt="a male avatar" className="max-w-[180px] aspect-square mx-auto mb-2" />
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
              data-testid="input-email"
            />

            <EmailValidation isValid={isEmailValid} />
          </div>
          <div className="flex justify-center">
            <button
              className="
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded transition flex items-center justify-center focus:outline-none  focus:ring-2 ring-offset-2 ring-blue-700 focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-blue-500"
              disabled={!isEmailValid}
              type="submit"
              data-testid="register-button"
            >
              {loading ? <LoadingSpinner backgroundColor="text-blue-500" fillColor="fill-white" size="w-6" /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

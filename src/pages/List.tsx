import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import chihuahuaImage from "../assets/chihuahua.svg";
import huskyImage from "../assets/husky.svg";
import pugImage from "../assets/pug.svg";
import labradorImage from "../assets/fake-labrador.svg";
import { Link } from "react-router-dom";
import clsx from "clsx";

const breedList = [
  {
    name: "chihuahua",
    image: chihuahuaImage,
  },
  {
    name: "husky",
    image: huskyImage,
  },
  {
    name: "pug",
    image: pugImage,
  },
  {
    name: "labrador",
    image: labradorImage,
  },
];
function List() {
  const navigation = useNavigate();
  const { breed } = useParams();

  return (
    <div className="p-4 w-full h-screen min-h-screen flex flex-col bg-neutral-100">
      <button
        onClick={() => navigation("/")}
        className="flex items-center gap-2 mb-4 text-slate-400 font-semibold  hover:-translate-x-[5px] transition "
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[15px] h-[15px] fill-slate-400"
        >
          <path d="M12.5757 19.895L11.4917 20.979C11.0327 21.438 10.2905 21.438 9.83643 20.979L0.344238 11.4917C-0.114746 11.0327 -0.114746 10.2905 0.344238 9.83643L9.83643 0.344238C10.2954 -0.114746 11.0376 -0.114746 11.4917 0.344238L12.5757 1.42822C13.0395 1.89209 13.0298 2.64893 12.5562 3.10303L6.67236 8.7085H20.7056C21.355 8.7085 21.8774 9.23096 21.8774 9.88037V11.4429C21.8774 12.0923 21.355 12.6147 20.7056 12.6147H6.67236L12.5562 18.2202C13.0347 18.6743 13.0444 19.4312 12.5757 19.895Z" />
        </svg>
        Voltar
      </button>
      <div className="flex flex-wrap gap-y-3 items-center justify-between w-full mb-6">
        {breedList.map(({ name, image }, id) => (
          <Link
            to={`${name}`}
            key={id}
            className={clsx(
              "flex-shrink-0 w-40  items-center justify-center  p-2 rounded-md transition hover:shadow-md hover:bg-gradient-to-b hover:from-white  hover:-translate-x-[5px] hover:-translate-y-[5px] ",
              { "border-teal-200 border-solid  border-b-2": name === breed }
            )}
          >
            <img src={image} alt={`A dog of the race ${name}`} className="w-full h-32  rounded-lg " />
            <p
              className={clsx("mt-2 text-blue-500 underline underline-offset-2 text-center font-semibold capitalize", {
                "text-cyan-500": name === breed,
              })}
            >
              {name}
            </p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default List;

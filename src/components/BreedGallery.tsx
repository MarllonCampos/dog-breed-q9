import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import LoadingSpinner from "./loadingSpinner";
import clsx from "clsx";

const BreedGallery: React.FC = () => {
  const { breed } = useParams();
  const [images, setImages] = useState([] as Array<string>);
  const [selectedImage, setSelectedImage] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    api
      .get("list", { params: { breed } })
      .then((response) => {
        setImages(response.data.list);
      })
      .finally(() => setLoading(false));
  }, [breed]);

  useEffect(() => {
    selectedImage == ""
      ? window.document.body.classList.remove("overflow-y-hidden")
      : window.document.body.classList.add("overflow-y-hidden");

    return () => {};
  }, [selectedImage]);

  return (
    <div className={clsx("w-full p-1", { "flex-1": loading === true })}>
      {loading ? (
        <div className="w-full flex flex-col h-full flex-grow items-center justify-center">
          <LoadingSpinner backgroundColor="text-white" fillColor="fill-blue-500" size="w-32" />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-3 justify-around">
            {images.map((url, id) => (
              <img
                src={url}
                alt={breed}
                key={id}
                loading="lazy"
                className="w-[100px] md:w-[200px] object-cover aspect-square rounded-md cursor-pointer transition hover:-translate-x-[5px] hover:-translate-y-[5px]"
                onClick={() => setSelectedImage(url)}
              />
            ))}
          </div>

          {selectedImage !== "" && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 overflow-y-hidden">
              <div className="absolute inset-0 bg-black opacity-50 " onClick={() => setSelectedImage("")}></div>
              <img src={selectedImage} alt={breed} className="max-h-full max-w-full z-[70]" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BreedGallery;

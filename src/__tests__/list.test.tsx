import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import List from "../pages/List";

describe("List component", () => {
  test("renders breed list", async () => {
    const { findAllByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/:breed?" element={<List />} />
        </Routes>
      </MemoryRouter>
    );

    const breedList = await findAllByRole("link", { name: /./ });

    expect(breedList.length).toEqual(4);
  });

  test("renders selected breed and the little thumbnail", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/chihuahua"]}>
        <Routes>
          <Route path="/:breed?" element={<List />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      const dogImagesContainer = getByTestId("dog-images-container");
      const dogImagesThumbnail = getByTestId("dog-images-thumbnail");

      expect(dogImagesContainer).toBeInTheDocument();
      expect(dogImagesThumbnail).toBeInTheDocument();
    });
  });

  test("renders zoomed-in image on click", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/chihuahua"]}>
        <Routes>
          <Route path="/:breed?" element={<List />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      // Click on the first image to zoom in
      const dogImagesThumbnail = getByTestId("dog-images-thumbnail");
      fireEvent.click(dogImagesThumbnail);

      // Check if the background and zoomed-in image are rendered

      const backgroundZoom = getByTestId("background-zoom");
      const imageZoom = getByTestId("image-zoom");
      expect(backgroundZoom).toBeInTheDocument();
      expect(imageZoom).toBeInTheDocument();
    });
  });
});

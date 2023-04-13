import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import Register from "../pages/Register";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { api } from "../lib/api";
import { Storage } from "../services/storage";

const navigateMock = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

describe("Register", () => {
  test("handleSubmit should submit form with valid email", async () => {
    const email = "test@example.com";
    const tokenValue = "someToken";
    const postSpy = vi.spyOn(api, "post").mockResolvedValueOnce({
      data: { user: { token: tokenValue } },
    });

    const { getByLabelText, getByRole } = render(<Register />);
    const input = getByLabelText("Email");
    const button = getByRole("button", { name: "Login" });

    fireEvent.change(input, { target: { value: email } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith("/register", { email });
      expect(Storage.getToken()).toBe(tokenValue);
      expect(navigateMock).toHaveBeenCalledWith("/list");
    });
  });
  test("Submit button must be disabled and EmailValidation must be red ", async () => {
    const email = "invalidEmail";

    const { getByTestId } = render(<Register />);
    const input = getByTestId("input-email");
    const button = getByTestId("register-button");

    fireEvent.change(input, { target: { value: email } });

    await waitFor(() => {
      expect(input.classList.contains("ring-red-400")).toBe(true);
      expect(button).toHaveAttribute("disabled");
    });
  });
});

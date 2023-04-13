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
  test("handleSubmit should show alert and not submit form with invalid email", async () => {
    const postSpy = vi.spyOn(api, "post");

    const { getByTestId } = render(<Register />);
    const input = getByTestId("input-email");
    const button = getByTestId("register-button");
    fireEvent.change(input, { target: { value: "invalidEmail" } });
    fireEvent.click(button);
    const alertSpy = vi.fn();

    const saveAlert = window.alert;
    window.alert = () => {};
    window.alert = alertSpy;

    await waitFor(() => {
      expect(postSpy).not.toBeCalled();

      expect(alertSpy).toHaveBeenCalled();
    });
    window.alert = saveAlert;
  });

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
});

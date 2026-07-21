import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";
import Swal from "sweetalert2";

const mockLogin = jest.fn();
jest.mock("../queries/mutations/useLoginMutation", () => ({
  useLoginMutation: () => ({
    mutate: mockLogin,
    isPending: false,
  }),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

import LoginPage from "../components/pages/LoginPage";

test("renders title text, layout images, and form elements", () => {
  render(<LoginPage />);

  // @ts-expect-error 111
  expect(screen.getByText("Login to dashboard")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Login image 1")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByPlaceholderText("Enter your email...")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByPlaceholderText("Enter your password...")).toBeInTheDocument();
});

test("keeps login button disabled if form inputs are empty", () => {
  render(<LoginPage />);

  const submitButton = screen.getByRole("button", { name: /login/i });
  
  // @ts-expect-error 111
  expect(submitButton).toBeDisabled();
});

test("allows entering data and successfully submitting credentials", () => {
  render(<LoginPage />);

  const emailInput = screen.getByPlaceholderText("Enter your email...");
  const passwordInput = screen.getByPlaceholderText("Enter your password...");
  const submitButton = screen.getByRole("button", { name: /login/i });

  fireEvent.change(emailInput, { target: { value: "admin@hospital.com" } });
  fireEvent.change(passwordInput, { target: { value: "securePassword123" } });

  // @ts-expect-error 111
  expect(submitButton).not.toBeDisabled();

  fireEvent.click(submitButton);

  expect(mockLogin).toHaveBeenCalledTimes(1);

  expect(mockLogin).toHaveBeenCalledWith({
    email: "admin@hospital.com",
    password: "securePassword123",
  });
});

test("shows error toast on form submission if required fields are missing", () => {
  render(<LoginPage />);

  const submitButton = screen.getByRole("button", { name: /login/i });

  fireEvent.submit(submitButton.closest("form")!);

  expect(Swal.fire).toHaveBeenCalledWith({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: "error",
    text: "All fields are required",
  });
});
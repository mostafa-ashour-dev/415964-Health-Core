import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";
import AddPatientPage from "../components/pages/AddPatientPage";
import Swal from "sweetalert2";

const mockAddPatient = jest.fn();

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("../queries/mutations/useAddPatientMutation", () => ({
  useAddPatientMutation: () => ({
    mutate: mockAddPatient,
    isPending: false,
  }),
}));

test("renders page header, input placeholders, and layout images", () => {
  render(<AddPatientPage />);

  // @ts-expect-error 111
  expect(screen.getByText("Add new patient")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByPlaceholderText("Enter patient name...")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByPlaceholderText("Enter patient email...")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByPlaceholderText("Enter patient age...")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByPlaceholderText("Enter allergy...")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Login image 1")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Login image 2")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Login image 3")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Login image 4")).toBeInTheDocument();
});

test("keeps add patient button disabled when required form inputs are empty", () => {
  render(<AddPatientPage />);

  const submitButton = screen.getByRole("button", { name: /add patient/i });

  // @ts-expect-error 111
  expect(submitButton).toBeDisabled();
});

test("shows error toast on form submission if required fields are missing", () => {
  render(<AddPatientPage />);

  const submitButton = screen.getByRole("button", { name: /add patient/i });

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

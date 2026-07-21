import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";
import CreateTimeSlotPage from "../components/pages/CreateTimeSlotPage";
import Swal from "sweetalert2";

const mockCreateTimeslot = jest.fn();

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("../queries/mutations/useTimeslotMutation", () => ({
  useTimeslotMutation: () => ({
    mutate: mockCreateTimeslot,
    isPending: false,
  }),
}));

test("renders title text and layout images", () => {
  render(<CreateTimeSlotPage />);

  // @ts-expect-error 111
  expect(screen.getByText("Create timeslot")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Timeslot image 1")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Timeslot image 2")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Timeslot image 3")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Timeslot image 4")).toBeInTheDocument();
});

test("keeps create button disabled when form inputs are empty", () => {
  render(<CreateTimeSlotPage />);

  const submitButton = screen.getByRole("button", { name: /create slot/i });

  // @ts-expect-error 111
  expect(submitButton).toBeDisabled();
});

test("shows error toast on form submission if inputs are missing", () => {
  render(<CreateTimeSlotPage />);

  const submitButton = screen.getByRole("button", { name: /create slot/i });

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
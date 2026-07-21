import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";

jest.mock("../axios/appointment.instance.axios", () => ({
  api: {},
}));

const mockMutate = jest.fn();
jest.mock("../queries/mutations/useUpdateAppointmentStatusMutation", () => ({
  useUpdateAppointmentStatusMutation: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

const mockUseAuthData = { data: { user: { role: "user" } } };
jest.mock("../state/store", () => {
    // @ts-expect-error 123
  return jest.fn((selector: ({data: { user: { role: string } }}) =>  void ) => selector(mockUseAuthData));
});

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

import AppointmentCard, { type AppointmentCardProps } from "../components/cards/AppointmentCard";

const baseProps : AppointmentCardProps = {
  _id: "appointment-125",
  orderNumber: "123",
  status: "pending" as const,
  specialty: { name: "Cardiology" },
  user: {
    _id: "patient-99",
    full_name: "Test Patient",
    username: "test-patient",
    email: "test@patient.com",
    role: "user",
    age: "30",
    allergies: [],
  },
  doctor: {
    full_name: "Dr. House",
    sector: "Main",
    profilePicture: "",
  },
  timeslot: {
    _id: "slot-45",
    date: "2026-07-21",
    fromTime: "10:00 AM",
    toTime: "11:00 AM",
    status: "busy",
    doctor: {
      name: "Dr. House",
      specialization: "Cardiology",
      profilePicture: "",
    },
  },
};

test("renders basic elements like order number and status", () => {
  mockUseAuthData.data.user.role = "user";

  render(<AppointmentCard {...baseProps} />);

  // @ts-expect-error 111
  expect(screen.getByText(/123/i)).toBeInTheDocument();
  
  // @ts-expect-error 111
  expect(screen.getByText(/pending/i)).toBeInTheDocument();
});

test("shows Doctor name if logged-in user is a patient", () => {
  mockUseAuthData.data.user.role = "user";

  render(<AppointmentCard {...baseProps} />);

  // @ts-expect-error 111
  expect(screen.getByText("Dr. House")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByText("Cardiology")).toBeInTheDocument();
});

test("shows Patient name if logged-in user is a doctor", () => {
  mockUseAuthData.data.user.role = "doctor";

  render(<AppointmentCard {...baseProps} />);

  // @ts-expect-error 111
  expect(screen.getByText("Test Patient")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByText("Patient")).toBeInTheDocument();
});

test("opens dropdown and handles status updates", () => {
  mockUseAuthData.data.user.role = "doctor";

  render(<AppointmentCard {...baseProps} />);

  const toggleButton = screen.getByRole("button", { name: "togglebutton" });
  fireEvent.click(toggleButton); 
  
  // @ts-expect-error 111
  expect(screen.getByText("Manage")).toBeInTheDocument();

  const approveButton = screen.getByRole("button", { name: /approve/i });
  fireEvent.click(approveButton);

  expect(mockMutate).toHaveBeenCalledWith({
    id: "appointment-125",
    updateTo: "approved",
  });
});

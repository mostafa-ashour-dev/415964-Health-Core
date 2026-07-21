import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";
import BookAppointmentPage from "../components/pages/BookAppointmentPage";
import Swal from "sweetalert2";

const mockBook = jest.fn();

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("../state/store", () => ({
  __esModule: true,
  default: (
    selector: (state: {
      data: { user: { _id: string; role: string; specialty: { _id: string } } };
    }) => void,
  ) =>
    selector({
      data: {
        user: {
          _id: "doc123",
          role: "admin",
          specialty: { _id: "dep123" },
        },
      },
    }),
}));

jest.mock("../queries/mutations/useAppointmentMutation", () => ({
  useAppointmentMutation: () => ({
    mutate: mockBook,
  }),
}));

jest.mock("../queries/get-queries/useGetDepartmentsQuery", () => ({
  useGetDepartments: () => ({
    data: {
      data: [
        {
          _id: "dep1",
          name: "Cardiology",
          doctors: [
            { _id: "doc1", full_name: "Dr. Smith" },
            { _id: "doc2", full_name: "Dr. Adams" },
          ],
        },
      ],
    },
    isLoading: false,
  }),
}));

jest.mock("../queries/get-queries/useGetTimeslotQuery", () => ({
  useGetTimeslots: () => ({
    data: {
      data: [
        { _id: "slot1", time: "10:00 AM" },
        { _id: "slot2", time: "11:00 AM" },
      ],
    },
    isLoading: false,
  }),
}));

jest.mock("../queries/get-queries/useGetPatientsQuery", () => ({
  useGetPatientsQuery: () => ({
    data: {
      data: [
        { _id: "pat1", full_name: "John Doe" },
        { _id: "pat2", full_name: "Jane Doe" },
      ],
    },
    isLoading: false,
  }),
}));

jest.mock("../components/cards/TimeSlotCard", () => ({
  __esModule: true,
  default: ({ _id }: { _id: string }) => (
    <div data-testid={`timeslot-${_id}`}>TimeSlot</div>
  ),
}));

jest.mock("../components/shared/containers/GridContainer", () => ({
  __esModule: true,
  default: ({
    data,
    renderItem,
  }: {
    data: [];
    renderItem: (item: object, index: number) => React.ReactNode;
  }) => (
    <div>
      {data?.map((item: object, index: number) => renderItem(item, index))}
    </div>
  ),
}));

test("renders page header and decorative layout images", () => {
  render(<BookAppointmentPage />);

  // @ts-expect-error 111
  expect(screen.getByText("Book an appointment")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Book appointment image 1")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Book appointment image 2")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Book appointment image 3")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByAltText("Book appointment image 4")).toBeInTheDocument();
});

test("keeps submit button disabled initially when form fields are empty", () => {
  render(<BookAppointmentPage />);

  const submitButton = screen.getByRole("button", { name: /book/i });

  // @ts-expect-error 111
  expect(submitButton).toBeDisabled();
});

test("shows error toast on form submission if required fields are missing", () => {
  render(<BookAppointmentPage />);

  const submitButton = screen.getByRole("button", { name: /book/i });

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
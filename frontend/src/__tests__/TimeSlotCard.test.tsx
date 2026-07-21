import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import TimeSlotCard, {
  type TimeSlotCardProps,
} from "../components/cards/TimeSlotCard";

const mockProps: TimeSlotCardProps = {
  _id: "slot123",
  date: "2026-05-20",
  fromTime: "09:00",
  toTime: "10:00",
  status: "free",
  doctor: {
    name: "Dr. House",
    specialization: "Cardiology",
    profilePicture: "",
  },
};

test("renders formatted date correctly", () => {
  render(<TimeSlotCard {...mockProps} />);

  // @ts-expect-error 111
  expect(screen.getByText("May 20, 2026")).toBeInTheDocument();
});

test("renders minimized variant correctly without status badge", () => {
  render(<TimeSlotCard {...mockProps} variant="time_slot_minimized" />);

  // @ts-expect-error 111
  expect(screen.queryByText(/free/i)).not.toBeInTheDocument();
});

test("renders normal variant correctly with status badge and time labels", () => {
  render(<TimeSlotCard {...mockProps} variant="time_slot_normal" />);

  // @ts-expect-error 111
  expect(screen.getByText(/free/i)).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByText(/From/i)).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByText(/To/i)).toBeInTheDocument();
});

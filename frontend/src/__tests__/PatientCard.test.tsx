import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import PatientCard from "../components/cards/PatientCard";

const samplePatient = {
  _id: "patient-123",
  full_name: "John Doe",
  username: "johndoe",
  email: "johndoe@example.com",
  role: "user" as const,
  age: "28",
  allergies: ["Peanuts", "Penicillin"],
};

test("renders basic patient details like name, email, and age text", () => {
  render(<PatientCard {...samplePatient} />);

  // @ts-expect-error 111
  expect(screen.getByText("John Doe")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByText("Patient | 28 years")).toBeInTheDocument();
});

test("renders all elements inside the allergies array list", () => {
  render(<PatientCard {...samplePatient} />);

  // @ts-expect-error 111
  expect(screen.getByText("Peanuts")).toBeInTheDocument();

  // @ts-expect-error 111
  expect(screen.getByText("Penicillin")).toBeInTheDocument();
});

test("renders avatar profile picture correctly using full name as alt tag", () => {
  render(<PatientCard {...samplePatient} />);

  const imageElement = screen.getByRole("img");
  // @ts-expect-error 111
  expect(imageElement).toHaveAttribute("src", "/img5.png");

  // @ts-expect-error 111
  expect(imageElement).toHaveAttribute("alt", "John Doe");
});

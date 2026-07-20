import {
  CalendarDateRangeIcon,
  ClockIcon,
  PlusCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import CardContent from "../shared/card/CardContent";
import MainNavigationBar from "../shared/navbars/MainNavigationBar";
import Text from "../shared/text/Text";
import Button from "../shared/clickables/Button";
import GridContainer from "../shared/containers/GridContainer";
import { useGetAppointments } from "../../queries/get-queries/useGetAppointmentsQuery";
import useAuth from "../../state/store";
import AppointmentCard, {
  type AppointmentCardProps,
} from "../cards/AppointmentCard";
import Spinner from "../shared/animation/Spinner";
import Link from "../shared/clickables/Link";
import { useGetTimeslots } from "../../queries/get-queries/useGetTimeslotQuery";
import TimeSlotCard, { type TimeSlotCardProps } from "../cards/TimeSlotCard";
import { useEffect, useState } from "react";
import CardSurface from "../shared/card/CardSurface";
import { useGetPatientsQuery } from "../../queries/get-queries/useGetPatientsQuery";
import PatientCard, { type PatientCardProps } from "../cards/PatientCard";
import type { UserType } from "../../types/user.types";

const DoctorTimeslotSection = ({
  timeslots,
  isLoading,
}: {
  user?: UserType;
  timeslots: { data: TimeSlotCardProps[] };
  isLoading: boolean;
}) => {
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <Text
          variant="body_3xl"
          as="h2"
          className="font-semibold flex items-center gap-4"
        >
          <ClockIcon className="size-10 text-body_accent_primary" /> Timeslots
        </Text>

        <div className="border-s-1 border-body_border_primary ps-4">
          <Link href="/timeslot" variant="button_modern_primary" className="">
            <PlusCircleIcon className="size-6" /> Create
          </Link>
        </div>
      </div>

      <GridContainer
        loading={isLoading}
        loadingComponent={
          <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        }
        data={timeslots?.data}
        className="p-[10px] mt-6 bg-body_background_secondary border border-body_border_primary rounded-card_modern min-h-[100px]"
        cols={3}
        gap={4}
        scrollable
        scrollDir="horizontal"
        renderItem={(item, index) => {
          return (
            <TimeSlotCard
              key={index}
              {...(item as TimeSlotCardProps)}
              variant="time_slot_normal"
              className="!bg-body_accent_secondary"
            />
          );
        }}
      />
    </div>
  );
};

const AppointmentsSection = ({
  appointments,
  isAppointmentsLoading,
}: {
  isAppointmentsLoading: boolean;
  appointments: { data: AppointmentCardProps[] };
}) => {
  const [chosenFilter, setChosenFilter] = useState<"all" | "upcoming" | "past">(
    "all",
  );
  const [filteredAppointments, setFilteredAppointments] = useState(
    appointments?.data || [],
  );


  

  const handleFilterAppointments = (filter: "all" | "upcoming" | "past") => {
    setChosenFilter(filter);
    const data = appointments?.data || [];

    if (filter === "all") {
      setFilteredAppointments(data);
      return;
    }

    const now = Date.now();

    if (filter === "upcoming") {
      setFilteredAppointments(
        data.filter((appointment) => {
          const startDate = new Date(
            `${appointment.timeslot.date}T${appointment.timeslot.fromTime}`,
          );
          return startDate.getTime() > now;
        }),
      );
    } else if (filter === "past") {
      setFilteredAppointments(
        data.filter((appointment) => {
          const endDate = new Date(
            `${appointment.timeslot.date}T${appointment.timeslot.toTime}`,
          );
          return endDate.getTime() < now;
        }),
      );
    }
  };

  useEffect(() => {
    (function () {
      setFilteredAppointments(appointments?.data || []);
      setChosenFilter("all");
      handleFilterAppointments(chosenFilter);
    }());
  }, [chosenFilter, appointments?.data, handleFilterAppointments]);
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <Text
          variant="body_3xl"
          as="h2"
          className="font-semibold flex items-center gap-4"
        >
          <CalendarDateRangeIcon className="size-10 text-body_accent_primary" />{" "}
          Appointments
        </Text>

        <div className="flex">
          <div
            className={`flex gap-4 border-body_border_primary pe-4 border-e-1`}
          >
            <Button
              variant="button_modern_secondary"
              className={
                chosenFilter === "all"
                  ? "!bg-body_background_secondary hover:text-body_text_primary"
                  : ""
              }
              onClick={() => {
                handleFilterAppointments("all");
              }}
            >
              All
            </Button>
            <Button
              variant="button_modern_secondary"
              className={
                chosenFilter === "upcoming"
                  ? "!bg-body_background_secondary hover:text-body_text_primary"
                  : ""
              }
              onClick={() => {
                handleFilterAppointments("upcoming");
              }}
            >
              Upcoming
            </Button>
            <Button
              variant="button_modern_secondary"
              className={
                chosenFilter === "past"
                  ? "!bg-body_background_secondary hover:text-body_text_primary"
                  : ""
              }
              onClick={() => {
                handleFilterAppointments("past");
              }}
            >
              Past
            </Button>
          </div>

          <div className="border-s-1 border-body_border_primary ps-4">
            <Link href="/book" variant="button_modern_primary" className="">
              <PlusCircleIcon className="size-6" /> Book
            </Link>
          </div>
        </div>
      </div>

      <GridContainer
        loading={isAppointmentsLoading}
        loadingComponent={
          <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        }
        data={filteredAppointments}
        className="p-[10px] mt-6 bg-body_background_secondary border border-body_border_primary min-h-[250px] rounded-card_modern"
        cols={3}
        gap={4}
        scrollable
        scrollDir="horizontal"
        renderItem={(item, index) => {
          return (
            <AppointmentCard key={index} {...(item as AppointmentCardProps)} />
          );
        }}
      />
    </div>
  );
};

const PatientsSection = ({
  patients,
  isPatientsLoading,
}: {
  isPatientsLoading: boolean;
  patients: { data: PatientCardProps[] };
}) => {
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <Text
          variant="body_3xl"
          as="h2"
          className="font-semibold flex items-center gap-4"
        >
          <UsersIcon className="size-10 text-body_accent_primary" /> Patients
        </Text>

        <div className="flex">
          <div className=" border-body_border_primary ps-4">
            <Link href="/patient" variant="button_modern_primary" className="">
              <PlusCircleIcon className="size-6" /> Add New
            </Link>
          </div>
        </div>
      </div>

      <GridContainer
        loading={isPatientsLoading}
        loadingComponent={
          <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        }
        data={patients?.data}
        className="p-[10px] mt-6 bg-body_background_secondary border border-body_border_primary min-h-[200px] rounded-card_modern"
        cols={3}
        gap={4}
        scrollable
        scrollDir="horizontal"
        renderItem={(item, index) => {
          return <PatientCard key={index} {...(item as PatientCardProps)} />;
        }}
      />
    </div>
  );
};

export default function DashboardPage() {
  const user = useAuth((state) => state.data?.user);
  const { data: appointments = [], isLoading: isAppointmentsLoading } =
    useGetAppointments();

  const { data: timeslots = [], isLoading: isTimeslotsLoading } =
    useGetTimeslots({
      doctor: user?._id,
      status: "all",
    });

  const { data: patients, isLoading: isPatientsLoading } =
    useGetPatientsQuery();

  return (
    <div>
      <MainNavigationBar />

      <CardContent className="mt-10 gap-20">
        <CardSurface className="p-[10px] grid grid-cols-3 gap-4">
          <CardSurface className="!bg-body_accent_secondary  !rounded-[20px]">
            <CardContent>
              <Text
                variant="body_3xl"
                as="h2"
                className="font-semibold text-body_accent_primary"
              >
                {!isPatientsLoading && patients?.data.length}
              </Text>

              <Text
                variant="body_lg"
                as="p"
                className="capitalize font-semibold"
              >
                Patients
              </Text>
            </CardContent>
          </CardSurface>

          <CardSurface className="!bg-body_accent_secondary !rounded-[20px]">
            <CardContent>
              <Text
                variant="body_3xl"
                as="h2"
                className="font-semibold text-body_accent_primary"
              >
                {!isAppointmentsLoading && appointments?.data.length}
              </Text>

              <Text
                variant="body_lg"
                as="p"
                className="capitalize font-semibold"
              >
                Appointments
              </Text>
            </CardContent>
          </CardSurface>

          <CardSurface className="!bg-body_accent_secondary !rounded-[20px]">
            <CardContent>
              <Text
                variant="body_3xl"
                as="h2"
                className="font-semibold text-body_accent_primary"
              >
                {!isTimeslotsLoading && timeslots?.data.length}
              </Text>

              <Text
                variant="body_lg"
                as="p"
                className="capitalize font-semibold"
              >
                Timeslots
              </Text>
            </CardContent>
          </CardSurface>
        </CardSurface>

        <AppointmentsSection
          appointments={appointments}
          isAppointmentsLoading={isAppointmentsLoading}
        />

        <PatientsSection
          patients={patients}
          isPatientsLoading={isPatientsLoading}
        />

        {user?.role === "doctor" && (
          <DoctorTimeslotSection
            user={user}
            isLoading={isTimeslotsLoading}
            timeslots={timeslots}
          />
        )}
      </CardContent>
    </div>
  );
}

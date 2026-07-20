import CardSurface from "../shared/card/CardSurface";
import CardContent from "../shared/card/CardContent";
import Text from "../shared/text/Text";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Button from "../shared/clickables/Button";
import type { TimeSlot } from "../../mocks/appointments";
import { useState } from "react";
import TimeSlotCard from "./TimeSlotCard";
import useAuth from "../../state/store";
import { useUpdateAppointmentStatusMutation } from "../../queries/mutations/useUpdateAppointmentStatusMutation";
import Swal from "sweetalert2";
import type { UserType } from "../../types/user.types";

export type Status =
  | "pending"
  | "approved"
  | "rejected"
  | "canceled"
  | "completed";

export type AppointmentCardProps = {
  doctor: {
    profilePicture?: string;
    full_name: string;
    sector: string;
  };
  specialty: {
    name: string;
  };
  timeslot: TimeSlot;
  orderNumber: string;
  status: Status;
  user: UserType;
  _id: string;
};

const statusStyles: Record<Status, string> = {
  pending: "bg-orange-400",
  approved: "bg-green-400",
  rejected: "bg-red-400",
  canceled: "bg-gray-400",
  completed: "bg-body_accent_primary",
};

export const Dropdown = ({
  id,
  status,
  user,
}: {
  id: string;
  status: string;
  user: UserType;
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { mutate: updateStatus, isPending } =
    useUpdateAppointmentStatusMutation();
  const handleToggleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUpdateAppointmentStatus = (
    updateTo: "approved" | "canceled" | "completed" | "rejected",
  ) => {
    if (status === updateTo) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        text: "Cann't update to the same status",
      });
      return;
    }

    updateStatus({ id, updateTo });
  };

  return (
    <>
      <div
        className={`${showDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition py-2 px-4 absolute top-[5px] border border-body_border_primary rounded-[15px] right-[5px] min-h-[100px] min-w-[200px] bg-body_accent_secondary z-10 shadow-xl`}
      >
        <Text variant="body_md">Manage</Text>
        {status === "canceled" || status === "rejected" ? (
          <Text
            variant="body_md"
            className="text-body_text_muted text-center mt-3"
          >
            No updates
          </Text>
        ) : user?.role === "user" ? (
          <Button
            className="w-full mt-1 bg-red-400"
            loading={isPending}
            onClick={() => {
              handleUpdateAppointmentStatus("canceled");
            }}
          >
            Cancel
          </Button>
        ) : user?.role === "doctor" ? (
          <>
            <Button
              className="w-full mt-1 bg-red-400"
              loading={isPending}
              onClick={() => {
                handleUpdateAppointmentStatus("rejected");
              }}
            >
              Reject
            </Button>
            <Button
              className="w-full mt-1 bg-green-400"
              loading={isPending}
              onClick={() => {
                handleUpdateAppointmentStatus("approved");
              }}
            >
              Approve
            </Button>
          </>
        ) : (
          ""
        )}
      </div>

      <Button
        variant="button_modern_secondary"
        className="!text-body_text_muted !bg-transparent !p-0 !absolute top-[15px] right-[20px] z-20"
        onClick={handleToggleShowDropdown}
      >
        <EllipsisHorizontalIcon className="size-6" />
      </Button>
    </>
  );
};

export default function AppointmentCard({
  user,
  doctor,
  orderNumber,
  status,
  timeslot,
  specialty,
  _id,
}: AppointmentCardProps) {
  const loggedInUser = useAuth((state) => state?.data?.user);

  return (
    <CardSurface className="!rounded-[20px] !bg-body_accent_secondary relative">
      <Dropdown id={_id} status={status} user={loggedInUser} />
      <CardContent variant="card_content_sm" className="!min-w-[500px] gap-4">
        {loggedInUser.role !== "admin" ? (
          <div className="flex items-center gap-4">
            <img
              src={doctor.profilePicture || "/img5.png"}
              alt={doctor.full_name}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />

            <div>
              <Text variant="body_lg" className="font-semibold">
                {loggedInUser?.role === "user"
                  ? doctor.full_name
                  : loggedInUser?.role === "doctor"
                    ? user?.full_name
                    : ""}
              </Text>
              <Text
                variant="body_sm"
                className="text-body_accent_primary capitalize"
              >
                {loggedInUser?.role === "user"
                  ? specialty.name
                  : loggedInUser?.role === "doctor"
                    ? "Patient"
                    : ""}
              </Text>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-stretch justify-between h-full ">
            <div className="flex flex-col gap-1">
              <Text variant="body_md" className="">
                Doctor
              </Text>
              <Text variant="body_lg" className="font-semibold">
                {doctor.full_name}
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text variant="body_md" className="">
                Patient
              </Text>
              <Text variant="body_lg" className="font-semibold">
                {user.full_name}
              </Text>
            </div>
          </div>
        )}

        <div className="w-full flex items-stretch justify-between h-full ">
          <div className="flex flex-col gap-1">
            <Text variant="body_md" className="">
              Time slot
            </Text>

            <TimeSlotCard {...timeslot} />
          </div>
          <div className="flex flex-col gap-0 min-h-full justify-between items-end">
            <Text variant="body_3xl" className="opacity-20 font-semibold">
              <span className="text-body_accent_primary">#</span> {orderNumber}
            </Text>

            <div className="flex flex-col gap-1 ">
              <Text variant="body_md" className="">
                Status
              </Text>
              <Text
                variant="body_lg"
                className={`capitalize font-semibold px-4 rounded-full ${statusStyles[status]} text-white`}
              >
                {status}
              </Text>
            </div>
          </div>
        </div>
      </CardContent>
    </CardSurface>
  );
}

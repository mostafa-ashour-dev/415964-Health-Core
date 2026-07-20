import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { api } from "../../axios/appointment.instance.axios";
import type { ErrorType } from "../../types/muations.types";


type TimeslotMutationProps =  {
  date: string;
  fromTime: string;
  toTime: string;
}

const apiCall = async ({ date, fromTime, toTime }: TimeslotMutationProps) => {
  const response = await api.post(`/timeslot/new`, {
    date,
    fromTime,
    toTime,
  });

  return response.data;
};

export function useTimeslotMutation() {
  return useMutation({
    mutationFn: (values: TimeslotMutationProps) => apiCall(values),
    mutationKey: ["create-appointment"],
    onSuccess: () => {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        text: "Timeslot created successfully",
      });

      window.location.pathname = "/dashboard";
    },
    onError: (error: ErrorType) => {
      const backendMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        text: backendMessage || "Something went wrong",
      });
    },
  });
}

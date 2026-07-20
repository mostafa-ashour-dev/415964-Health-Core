import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { api } from "../../axios/appointment.instance.axios";
import type { ErrorType } from "../../types/muations.types";



type AppointmentMutationProps =  {
  department: string;
  doctor: string;
  timeslot: string;
  patient: string;
};

const apiCall = async ({
  patient,
  department,
  doctor,
  timeslot,
}: AppointmentMutationProps) => {
  const response = await api.post(`/appointment/book`, {
    specialty: department,
    doctor,
    timeslot,
    patient,
  });

  return response.data;
};

export function useAppointmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: AppointmentMutationProps) => apiCall(values),
    mutationKey: ["create-appointment"],
    onSuccess: () => {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        text: "Appointment created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
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

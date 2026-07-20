import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { api } from "../../axios/appointment.instance.axios";
import type { ErrorType } from "../../types/muations.types";


type UpdateAppointmentStatusMuationProps = {
  id: string;
  updateTo: "approved" | "canceled" | "completed" | "rejected";
}

const apiCall = async ({ id, updateTo }: UpdateAppointmentStatusMuationProps) => {
  const response = await api.put(`/appointment/${id}`, {
    updateTo,
  });

  return response.data;
};

export function useUpdateAppointmentStatusMutation() {
    const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (values: UpdateAppointmentStatusMuationProps) => apiCall(values),
    mutationKey: ["create-appointment"],
    onSuccess: () => {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        text: "Appointment status updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
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
        text: backendMessage,
      });
    },
  });
}

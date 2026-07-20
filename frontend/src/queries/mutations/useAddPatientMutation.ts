import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { api } from "../../axios/backend.instance.axios";
import type { ErrorType } from "../../types/muations.types";



type AddPatientMutationProps = {
  email: string;
  full_name: string;
  allergies: string[];
  age: string;
}

const apiCall = async ({
  email,
  full_name,
  allergies,
  age,
}: AddPatientMutationProps) => {
  const response = await api.post(`/patient`, {
    email,
    full_name,
    allergies,
    age,
  });

  return response.data;
};

export function useAddPatientMutation() {
  return useMutation({
    mutationFn: (values: AddPatientMutationProps) => apiCall(values),
    onSuccess: () => {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        text: "Patient added successfully",
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
        text: backendMessage,
      });
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { login } from "../../state/actions/auth.actions";
import Swal from "sweetalert2";
import useAuth from "../../state/store";
import { api } from "../../axios/backend.instance.axios";
import type { ErrorType } from "../../types/muations.types";



type LoginMutaionProps = {email: string, password: string}

const apiCall = async ({ email, password }: LoginMutaionProps) => {
  const response = await api.post(`/auth/login`, {
    credential: email,
    password,
  });

  return response.data;
};

export function useLoginMutation() {
  const dispatch = useAuth((state) => state.dispatch);

  return useMutation({
    mutationFn: (values: LoginMutaionProps) => apiCall(values),
    onSuccess: (data) => {
      dispatch(login(data));

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        text: "Login successfull",
      });
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
import { useQuery } from "@tanstack/react-query";
import { api } from "../../axios/appointment.instance.axios";

const apiCall = async () => {
  const response = await api.get(
    `/appointment`,
  );
  return response.data;
};

export function useGetAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: () => apiCall(),
    staleTime: 0,});
}

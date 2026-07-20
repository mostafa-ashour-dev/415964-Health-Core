import { useQuery } from "@tanstack/react-query";
import { api } from "../../axios/appointment.instance.axios";

const apiCall = async ({doctor, status}: {doctor: string, status: string}) => {
  const response = await api.get(
    `/timeslot/${doctor}`,
    {
      params: {
        status
      },
    },
  );

  return response.data;
};

export function useGetTimeslots({doctor, status}: {doctor: string, status: string}) {
  const hasDoctor = Boolean(doctor && doctor.trim() !== "");

  return useQuery({
    queryKey: ["timeslots", doctor], 
    queryFn: () => apiCall({doctor, status}),
    enabled: hasDoctor,
    staleTime: 0,
    refetchOnMount: "always", 
  });
}
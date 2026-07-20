import { useQuery } from "@tanstack/react-query";
import { api } from "../../axios/backend.instance.axios";

const apiCall = async () => {
  const response = await api.get(`/patient`);

  return response.data;
};


export function useGetPatientsQuery() {
  return useQuery({
    queryFn: apiCall, 
    queryKey: ["patients"],
    staleTime: 15000,
  });
}

import { useQuery } from "@tanstack/react-query";
import { api } from "../../axios/backend.instance.axios";

const apiCall = async () => {
  const response = await api.get(`/specialty`);

  return response.data;
};


export function useGetDepartments() {
  return useQuery({
    queryFn: apiCall, 
    queryKey: ["departments"],
    staleTime: 15000,
  });
}

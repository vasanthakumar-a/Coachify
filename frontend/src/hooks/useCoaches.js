import { useQuery } from "@tanstack/react-query";
import { getCoaches, getCoachById } from "../api/coaches";

export function useCoaches() {
  return useQuery({ queryKey: ["coaches"], queryFn: getCoaches });
}

export function useCoach(id) {
  return useQuery({ queryKey: ["coach", id], queryFn: () => getCoachById(id) });
}
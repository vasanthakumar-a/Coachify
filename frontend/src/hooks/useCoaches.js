import { useQuery } from "@tanstack/react-query";
import { getCoaches, getCoachById } from "../api/coaches";

export function useCoaches(searchQuery) {
  return useQuery({ queryKey: ["coaches", searchQuery], queryFn: () => getCoaches(searchQuery), staleTime: 1000 * 60 * 5 });
}

export function useCoach(id) {
  return useQuery({ queryKey: ["coach", id], queryFn: () => getCoachById(id) });
}
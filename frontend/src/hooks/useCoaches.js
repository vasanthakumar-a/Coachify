import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCoaches, getCoachById } from "../api/coaches";

export function useCoaches(searchQuery) {
  return useInfiniteQuery({
    queryKey: ["coaches", searchQuery],
    queryFn: ({ pageParam }) => getCoaches({ pageParam, searchQuery }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useCoach(id) {
  return useQuery({ queryKey: ["coach", id], queryFn: () => getCoachById(id) });
}